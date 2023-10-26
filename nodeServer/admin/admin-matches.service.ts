import { client } from './database';

export async function getMatchesList() {
  try {
    let matchList = await client.query(
      /* sql */
      `SELECT * FROM match
      ORDER BY match.id`
    );

    // Create an array to store the results with ride IDs
    let resultArray = [];

    // Iterate through each match object and fetch corresponding ride IDs
    for (const match of matchList.rows) {
      let rideIdsQuery = await client.query(
        /* sql */
        `SELECT id FROM ride WHERE match_id = $1`,
        [match.id]
      );

      // Extract ride IDs and add them to the match object
      const rideIds = rideIdsQuery.rows.map((row) => row.id);
      match.rideIds = rideIds;

      // Add the match object to the result array
      resultArray.push(match);
    }
    console.log(resultArray);

    return resultArray;
  } catch (e) {
    console.error('Error getting info from db: ', e);
    return { error: String(e) };
  }
}

export async function getMatchDetails(id: number) {
  try {
    let match = await client.query(
      /* sql */
      `SELECT * from match
      WHERE id = $1
      LIMIT 1`,
      [id]
    );
    let rideIdsQuery = await client.query(
      /* sql */
      `SELECT ride.id FROM ride
        JOIN match ON match.id = ride.match_id
        WHERE match_id = $1
        ORDER BY ride.id`,
      [id]
    );
    // Extract ride IDs and add them to the match object
    const rideIds = rideIdsQuery.rows.map((row) => row.id);
    let result = match.rows[0];
    result.rideIds = rideIds;
    // return result;
    // Fetch passenger_id for each ride
    const passengerIdsQuery = await client.query(
      /* sql */
      `SELECT passenger_id FROM ride
      WHERE id = ANY($1::integer[])`,
      [rideIds]
    );
    const passengerIds = passengerIdsQuery.rows.map((row) => row.passenger_id);

    // Add passengerIds to the result object
    result.passengerIds = passengerIds;

    let locationNames = await client.query(
      /* sql */ `
        SELECT
        l1.name AS segment_1_start_location_name,
        l2.name AS segment_2_start_location_name,
        l3.name AS segment_3_start_location_name,
        l3a.name AS segment_3_end_location_name,
         (s1.distance_in_meters + s2.distance_in_meters + s3.distance_in_meters) AS total_distance_meters
    FROM match m
    LEFT JOIN segment s1 ON m.segment_1_id = s1.id
    LEFT JOIN segment s2 ON m.segment_2_id = s2.id
    LEFT JOIN segment s3 ON m.segment_3_id = s3.id
    LEFT JOIN location l1 ON s1.start_location_id = l1.id
    LEFT JOIN location l1a ON s1.end_location_id = l1a.id
    LEFT JOIN location l2 ON s2.start_location_id = l2.id
    LEFT JOIN location l2a ON s2.end_location_id = l2a.id
    LEFT JOIN location l3 ON s3.start_location_id = l3.id
    LEFT JOIN location l3a ON s3.end_location_id = l3a.id
    WHERE m.id = $1`,
      [id]
    );
    const locationNamesResult = locationNames.rows;
    return { result, locationNamesResult };
  } catch (e) {
    console.error('Error getting info from db: ', e);
    return { error: String(e) };
  }
}

export async function updateMatchDetails(id: number) {
  try {
    let update = await client.query(
      /* sql */
      ` UPDATE match
      SET cancel_time = NOW()
      WHERE id = $1
    `,
      [id]
    );
  } catch (e) {
    console.error('Error updating info to db: ', e);
    return { error: String(e) };
  }
}
