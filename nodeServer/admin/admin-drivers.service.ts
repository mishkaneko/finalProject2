import { client } from './database';

export async function getDriversList() {
  try {
    let driversList = await client.query(
      /* sql */
      `SELECT
        driver.id AS driver_id,
        customer.name,
        customer.phone,
        driver.license_plate_no,
        CASE
        WHEN driver.is_available = true THEN 'Available'
        ELSE 'Unavailable'
        END AS availability,
        customer.last_login_time
        FROM driver
        JOIN customer ON driver.id = customer.id
        ORDER BY driver.id asc`
    );
    console.log(driversList.rows);

    return driversList.rows;
  } catch (e) {
    console.error('Error getting info from db: ', e);
    return { error: String(e) };
  }
}

export async function getDriverPersonalInfo(id: number) {
  try {
    let driver = await client.query(
      /* sql */
      `
      SELECT 
    driver.id AS driver_id,
    customer.name,
    customer.gender,
    driver.hkid,
    "user".email,
    customer.phone,
    driver.license_plate_no,
    driver.driving_license_no,
    driver.taxi_driver_identity_plate,
    driver.vehicle_license,
    driver.is_available,
    customer.last_login_time 
FROM driver
JOIN customer ON driver.id = customer.id
JOIN "user" ON driver.id = "user".id
WHERE driver.id = $1;
        `,
      [id]
    );
    return driver.rows;
  } catch (e) {
    console.error('Error getting info from db: ', e);
    return { error: String(e) };
  }
}

export async function updateDriverPersonalInfo(newInfo: any) {
  try {
    let updateUser = await client.query(
      /* sql */
      `UPDATE "user"
        SET email = $1
        WHERE id = $2;
    `,
      [newInfo.email, newInfo.driver_id]
    );

    let updateCustomer = await client.query(
      /* sql */
      `UPDATE customer
        SET name = $1,
        gender = $2,
        phone = $3 
        WHERE id = $4;
    `,
      [newInfo.name, newInfo.gender, newInfo.phone, newInfo.driver_id]
    );
    let updateDriver = await client.query(
      /* sql */
      `UPDATE driver
        SET hkid = $1,
        driving_license_no = $2,
        taxi_driver_identity_plate = $3,
        vehicle_license = $4,
        license_plate_no = $5
        WHERE id = $6;
    `,
      [
        newInfo.hkid,
        newInfo.driving_license_no,
        newInfo.taxi_driver_identity_plate,
        newInfo.vehicle_license,
        newInfo.license_plate_no,
        newInfo.driver_id,
      ]
    );
    let driver = await client.query(
      /* sql */
      `SELECT 
        driver.id AS driver_id,
        customer.name,
        customer.gender,
        driver.hkid,
        "user".email,
        customer.phone,
        driver.license_plate_no,
        driver.driving_license_no,
        driver.taxi_driver_identity_plate,
        driver.vehicle_license,
        driver.is_available,
        customer.last_login_time FROM driver
        JOIN customer ON driver.id = customer.id
        JOIN "user" ON customer.id = "user".id
        WHERE driver.id = $1;`,
      [newInfo.driver_id]
    );
    return driver.rows;
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function getTransactionsList(id: number) {
  try {
    // First, find all match_ids with the given driver_id in the match table
    const matchIdsQuery = await client.query(
      /* sql */
      `SELECT id FROM match WHERE driver_id = $1`,
      [id]
    );

    // // Extract match_ids from the result
    const matchIds = matchIdsQuery.rows.map((row) => row.id);
    console.log('matchIds: ', matchIds);

    // // Next, find all matching records in the ride table with the same match_id and a transaction_id
    const rideQuery = await client.query(
      /* sql */
      `SELECT ride.*, match.id AS match_id
        FROM ride
        JOIN match ON ride.match_id = match.id
        WHERE ride.match_id = ANY($1) AND ride.transaction_id IS NOT NULL`,
      [matchIds]
    );

    // // Extract transaction_ids from the result
    const transactionIds = rideQuery.rows.map((row) => row.transaction_id);

    // // Finally, retrieve the corresponding transaction records from the transaction table
    const transactionList = await client.query(
      /* sql */
      `SELECT transaction.*, ride.match_id AS match_id
        FROM transaction
        JOIN ride ON transaction.id = ride.transaction_id
        WHERE transaction.id = ANY($1)`,
      [transactionIds]
    );

    // Now, for each object in transactionList.rows, add the 'payout' key
    for (const transaction of transactionList.rows) {
      // Check if the transaction_id is found in the driver_payout table
      const payoutQuery = await client.query(
        /* sql */
        `SELECT id FROM driver_payout WHERE transaction_id = $1`,
        [transaction.id]
      );

      // If a matching record is found, set 'payout' to true; otherwise, set it to false
      transaction.payout = payoutQuery.rows.length > 0 ? 'Paid' : 'Not Paid';
    }

    return transactionList.rows;
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function getTransactionDetails(driverId: number, transactionId: number) {
  try {
    let transactionDetails = await client.query(
      /* sql */
      `SELECT t.*, r.match_id
        FROM transaction t
        LEFT JOIN ride r ON t.id = r.transaction_id
        WHERE t.id = $1
    `,
      [transactionId]
    );
    let payoutList = await client.query(
      /* sql */
      `SELECT *
        FROM driver_payout dp
        WHERE dp.transaction_id = $1
    `,
      [transactionId]
    );
    const transaction = transactionDetails.rows.map((row) => ({
      transaction_id: row.id, // Renaming 'id' to 'transaction_id'
      passenger_id: row.passenger_id,
      amount: row.amount,
      transaction_time: row.transaction_time,
      passenger_cancel_time: row.passenger_cancel_time,
      stripe_charge_id: row.stripe_charge_id,
      stripe_success_time: row.stripe_success_time,
      remark: row.remark,
      match_id: row.match_id,
    }));
    const payout = payoutList.rows;
    return { transaction, payout };
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function updateTransactionDetails(newInfo: any) {
  try {
    let update = await client.query(
      /* sql */
      `UPDATE transaction
      SET remark = $1
      WHERE id = $2
    `,
      [newInfo.remark, newInfo.id]
    );
    return 'updated';
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function addPayoutRecord(newRecord: any) {
  try {
    await client.query(
      /* sql */
      `INSERT INTO driver_payout (amount, driver_id, transaction_id, admin_id, remark, payout_time)
   VALUES ($1, $2, $3, $4, $5, NOW())`,
      [newRecord.amount, newRecord.driver_id, newRecord.transaction_id, newRecord.admin_id, newRecord.remark]
    );
    return 'success';
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}
