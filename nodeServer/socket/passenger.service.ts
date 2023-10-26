import { client } from '../admin/database';

export async function addRide(rideDetails: any) {
  try {
    let result = await client.query(
      /* sql */ `
    INSERT INTO ride (passenger_id, start_point, end_point, start_name, end_name, arrive_by_time) VALUES (
        $1, $2, $3, $4, $5, $6
    )
    `,
      [
        rideDetails.passenger_id,
        rideDetails.start_point,
        rideDetails.end_point,
        rideDetails.start_name,
        rideDetails.end_name,
        rideDetails.arrive_by_time,
      ]
    );
    return 'success';
  } catch (e) {
    console.error('Error adding ride details into db: ', e);
    return { error: String(e) };
  }
}
