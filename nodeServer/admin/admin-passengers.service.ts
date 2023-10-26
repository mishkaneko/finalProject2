import { client } from './database';

export async function getPassengersList() {
  try {
    let passengersList = await client.query(
      /* sql */
      `SELECT
        c.id AS passenger_id,
        c.name,
        c.gender,
        c.phone,
        u.email,
        c.last_login_time
        FROM customer c
        JOIN "user" u ON u.id = c.id
        LEFT JOIN driver d ON u.id = d.id
        WHERE d.id IS NULL
        ORDER BY c.id ASC`
    );
    console.log(passengersList.rows);

    return passengersList.rows;
  } catch (e) {
    console.error('Error getting info from db: ', e);
    return { error: String(e) };
  }
}

export async function getPassengerPersonalInfo(id: number) {
  try {
    let passenger = await client.query(
      /* sql */
      `SELECT
        c.id AS passenger_id,
        c.name,
        c.gender,
        c.phone,
        u.email,
        c.last_login_time
        FROM customer c
        JOIN "user" u ON u.id = c.id
        WHERE c.id = $1
        ORDER BY c.id ASC`,
      [id]
    );

    return passenger.rows;
  } catch (e) {
    console.error('Error getting info from db: ', e);
    return { error: String(e) };
  }
}

export async function updatePassengerPersonalInfo(newInfo: any) {
  try {
    let updateUser = await client.query(
      /* sql */
      `UPDATE "user"
        SET email = $1
        WHERE id = $2;
    `,
      [newInfo.email, newInfo.passenger_id]
    );
    let updateCustomer = await client.query(
      /* sql */
      `UPDATE customer
        SET name = $1,
        gender = $2,
        phone = $3 
        WHERE id = $4;
    `,
      [newInfo.name, newInfo.gender, newInfo.phone, newInfo.passenger_id]
    );

    let passenger = await client.query(
      /* sql */
      `SELECT
        c.id AS passenger_id,
        c.name,
        c.gender,
        c.phone,
        u.email,
        c.last_login_time
        FROM customer c
        JOIN "user" u ON u.id = c.id
        WHERE c.id = $1
        ORDER BY c.id ASC`,
      [newInfo.passenger_id]
    );
    return passenger.rows;
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function getRideHistory(id: number) {
  try {
    const data = await client.query(
      /* sql */
      `SELECT ride.*, transaction.transaction_time, transaction.passenger_cancel_time FROM ride 
        JOIN transaction ON ride.transaction_id = transaction.id
        WHERE transaction.passenger_id = $1`,
      [id]
    );

    return data.rows;
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function getRideDetails(passengerId: number, rideId: number) {
  try {
    let rideDetails = await client.query(
      /* sql */
      `SELECT r.*,
    s.name AS start_location_name,
    e.name AS end_location_name
    FROM
    ride AS r
    JOIN location AS s ON r.start_location_id = s.id
    JOIN location AS e ON r.end_location_id = e.id
    WHERE
    r.id = $1
    `,
      [rideId]
    );
    let refundList = await client.query(
      /* sql */
      `SELECT * FROM transaction
        WHERE passenger_id = $1
        ORDER BY transaction.id
    `,
      [passengerId]
    );
    const ride = rideDetails.rows;
    const refunds = refundList.rows;
    console.log(refunds);
    return { ride, refunds };
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function updateRideDetails(newInfo: any) {
  try {
    let update = await client.query(
      /* sql */
      `UPDATE ride
      SET status = $1
      WHERE id = $2
    `,
      [newInfo.status, newInfo.id]
    );
    return 'updated';
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}

export async function addRefundRecord(newRecord: any) {
  console.log('0418:', newRecord);

  try {
    await client.query(
      /* sql */
      `INSERT INTO transaction (passenger_id, amount, transaction_time, remark)
        VALUES ($1, $2, NOW(), $3)`,
      [newRecord.passenger_id, newRecord.amount, newRecord.remark]
    );
    return 'success';
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}
