import { Knex } from 'knex';
import { HttpError } from './http.error';
import { comparePassword, hashPassword } from './hash';
import { log } from 'console';

type UpdatedProfileDetails = {
  name: string;
  phone: string;
  gender: string;
  hkid?: string;
  drivingLicenseNo?: string;
  taxiDriverIdentityPlate?: string;
  vehicleLicense?: string;
  licensePlateNo?: string;
};

type DriverRegisterDetails = {
  name: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  hkid: string;
  drivingLicenseNo: string;
  taxiDriverIdentityPlate: string;
  vehicleLicense: string;
  licensePlateNo: string;
};

type AvatarDetails = {
  user_id: number;
  filename: string;
};

type UpdatedComment = {
  commentId: number;
  comment: string;
  score: number;
};

export class UserService {
  constructor(private knex: Knex) {}

  async login(input: { email: string; password: string }) {
    console.log('login input:', input);
    let user = await this.knex
      .select('id', 'password_hash')
      .from('user')
      .where('email', input.email)
      .first();
    console.log('login user:', user);
    if (!user) throw new HttpError(401, 'wrong email');

    let isPasswordMatched = await comparePassword({
      password: input.password,
      hash_password: user.password_hash,
    });
    if (!isPasswordMatched) {
      throw new HttpError(401, 'wrong email or password');
    }

    await this.knex('customer')
      .update({ last_login_time: new Date(Date.now()) })
      .where('id', user.id);

    let role = await this.getRole(user.id);

    return { id: user.id, role };
  }

  async getRole(user_id: number) {
    let admin = await this.knex
      .select('id')
      .from('admin')
      .where('id', user_id)
      .first();
    if (admin) return 'admin' as const;

    let driver = await this.knex
      .select('id')
      .from('driver')
      .where('id', user_id)
      .first();
    if (driver) return 'driver' as const;

    let passenger = await this.knex
      .select('id')
      .from('customer')
      .where('id', user_id)
      .first();
    if (passenger) return 'passenger' as const;

    throw new HttpError(500, 'unknown role, user_id: ' + user_id);
  }

  async driverRegister(user: DriverRegisterDetails) {
    console.log('Service driverRegister');
    const {
      name,
      email,
      gender,
      phone,
      password,
      hkid,
      drivingLicenseNo,
      taxiDriverIdentityPlate,
      vehicleLicense,
      licensePlateNo,
    } = user;
    try {
      return await this.knex.transaction(async (trx) => {
        let [{ id }] = await trx('user')
          .insert([
            {
              email: email,
              password_hash: await hashPassword(password),
            },
          ])
          .returning('id');

        await trx('customer').insert({
          id: id,
          gender: gender,
          phone: phone,
          name: name,
        });

        await trx('driver').insert({
          id: id,
          hkid: hkid,
          driving_license_no: drivingLicenseNo,
          taxi_driver_identity_plate: taxiDriverIdentityPlate,
          vehicle_license: vehicleLicense,
          license_plate_no: licensePlateNo,
          is_available: true,
        });
        console.log('newDriverRegisterid', id);
        return {};
      });
    } catch (error) {
      let message = String(error);
      if (message.includes('unique') && message.includes('email')) {
        throw new HttpError(409, 'duplicated email');
      }
      throw error;
    }
  }

  //with transaction
  async passengerRegister(user: {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
  }) {
    try {
      return await this.knex.transaction(async (trx) => {
        const [{ id }] = await trx('user')
          .insert({
            email: user.email,
            password_hash: await hashPassword(user.password),
          })
          .returning('id');

        await trx('customer').insert({
          id,
          gender: user.gender,
          phone: user.phone,
          name: user.name,
        });
        console.log('PassengerRegister', id);
        return {};
      });
    } catch (error) {
      let message = String(error);
      if (message.includes('unique') && message.includes('email')) {
        throw new HttpError(409, 'duplicated email');
      }
      throw error;
    }
  }

  async getProfile(user_id: number) {
    let userType = await this.knex
      .select('driver.id')
      .from('driver')
      .join('customer', 'customer.id', 'driver.id')
      .where('customer.id', user_id)
      .first();

    if (!userType) {
      let passengerResult = await this.knex
        .select('email', 'gender', 'phone', 'name')
        .from('user')
        .join('customer', 'user.id', 'customer.id')
        .where('user.id', user_id)
        .first();
      console.log({ getPassengerProfileData: passengerResult });
      if (!passengerResult) throw new HttpError(401, 'cannot find profile');
      return passengerResult;
    }
    let driverResult = await this.knex
      .select(
        'email',
        'gender',
        'phone',
        'name',
        'hkid',
        'driving_license_no',
        'taxi_driver_identity_plate',
        'vehicle_license',
        'license_plate_no',
        'is_available'
      )
      .from('user')
      .join('customer', 'customer.id', 'user.id')
      .join('driver', 'driver.id', 'user.id')
      .where('user.id', user_id)
      .first();
    console.log({ getDriverProfileData: driverResult });
    if (!driverResult) throw new HttpError(401, 'cannot find profile');
    return driverResult;
  }

  async passwordUpdatefromProfile(user: { user_id: number; password: string }) {
    console.log('servicepasswordUpdatefromProfile');
    try {
      let result = await this.knex('user')
        .update({
          password_hash: await hashPassword(user.password),
        })
        .where('id', user.user_id);
      return {};
    } catch (error) {
      throw error;
    }
  }

  async getRating(user_id: number) {
    try {
      const results = await this.knex.raw(
        `
          SELECT 
            rating.id, 
            from_user_id, 
            from_user.name as from_name,  
            to_user_id,
            to_user.name as to_name,  
            score,
            comment
          FROM rating 
          JOIN customer as from_user ON from_user.id = rating.from_user_id 
          JOIN customer as to_user ON to_user.id = rating.to_user_id
          WHERE to_user_id = ?
        `,
        [user_id]
      );

      const avgScoreResult = await this.knex('rating')
        .select('to_user_id')
        .select(this.knex.raw('ROUND(AVG(score), 1) AS average_score'))
        .where('to_user_id', user_id)
        .groupBy('to_user_id')
        .first();
      console.log(results.rows, avgScoreResult);
      return { individual_comment: results.rows, overallAvg: avgScoreResult };
    } catch (error) {
      throw error;
    }
  }

  async passengerRideHistory(user_id: number) {
    const result = await this.knex
      .select(
        'r.id as ride_id',
        'r.status',
        'start_loc.name as start_location_name',
        'end_loc.name as end_location_name',
        'r.arrive_by_time',
        'r.pickup_time',
        'r.dropoff_time',
        't.amount as transaction_amount',
        this.knex.raw(
          'coalesce(ac.total_amount, 0) as additional_charge_amount'
        )
      )
      .from('ride as r')
      .join('transaction as t', 'r.transaction_id', 't.id')
      .join('location as start_loc', 'r.start_location_id', 'start_loc.id')
      .join('location as end_loc', 'r.end_location_id', 'end_loc.id')
      .leftJoin(
        this.knex
          .select('ride_id', this.knex.raw('sum(amount) as total_amount'))
          .from('additional_charge')
          .groupBy('ride_id')
          .as('ac'),
        'r.id',
        'ac.ride_id'
      )
      .where('r.passenger_id', user_id)
      .orderBy('r.arrive_by_time', 'desc');
    console.log('service PassengerRideHistory', result);
    return result;
  }

  async driverRideHistory(user_id: number) {
    let result = await this.knex
      .select(
        'match.id',
        // 'match_ride.id as match_ride_id',
        'segment1.id as segment1_id',
        'location1.name as segment1_start_location',
        'location2.name as segment1_end_location',

        'segment2.id as segment2_id',
        'location3.name as segment2_start_location',
        'location4.name as segment2_end_location',

        'segment3.id as segment3_id',
        'location5.name as segment3_start_location',
        'location6.name as segment3_end_location',

        'match.start_time',
        'match.end_time',
        'match_ride.status'
      )

      .from('match')

      .join('segment as segment1', 'match.segment_1_id', 'segment1.id')
      .join(
        'location as location1',
        'segment1.start_location_id',
        'location1.id'
      )
      .join('location as location2', 'segment1.end_location_id', 'location2.id')

      .join('segment as segment2', 'match.segment_2_id', 'segment2.id')
      .join(
        'location as location3',
        'segment2.start_location_id',
        'location3.id'
      )
      .join('location as location4', 'segment2.end_location_id', 'location4.id')

      .join('segment as segment3', 'match.segment_3_id', 'segment3.id')
      .join(
        'location as location5',
        'segment3.start_location_id',
        'location5.id'
      )
      .join('location as location6', 'segment3.end_location_id', 'location6.id')
      .fullOuterJoin('match_ride', 'match.id', 'match_ride.id')
      .where('match.driver_id', user_id)
      .orderBy('match.start_time', 'desc');
    console.log(result);
    return result;
  }

  async profileUpdate(
    user_id: number,
    profileUpdatedDetails: UpdatedProfileDetails,
    role: string
  ) {
    let {
      name,
      phone,
      gender,
      hkid,
      drivingLicenseNo,
      taxiDriverIdentityPlate,
      vehicleLicense,
      licensePlateNo,
    } = profileUpdatedDetails;
    try {
      if (role === 'passenger') {
        console.log('passenger');
        await this.knex('customer')
          .update({ name: name, phone: phone, gender: gender })
          .where('id', user_id);
        console.log('userService ProfileUpdate');
        return {};
      }
      if (role === 'driver') {
        console.log('driver');
        await this.knex('customer')
          .update({ name: name, phone: phone, gender: gender })
          .where('id', user_id);

        await this.knex('driver')
          .update({
            hkid: hkid,
            driving_license_no: drivingLicenseNo,
            taxi_driver_identity_plate: taxiDriverIdentityPlate,
            vehicle_license: vehicleLicense,
            license_plate_no: licensePlateNo,
          })
          .where('id', user_id);

        console.log('userService ProfileUpdate');
        return {};
      }
    } catch (error) {
      throw error;
    }
  }

  async driverStatus(user_id: number, availability: boolean) {
    console.log('service driverStaus');
    try {
      if (availability == true) {
        await this.knex('driver')
          .where('id', user_id)
          .update('is_available', true);
        console.log('service driverStatus change availability to true');
        return {};
      }
      if (availability == false) {
        await this.knex('driver')
          .where('id', user_id)
          .update('is_available', false);
        console.log('service driverStatus change availability to false');
        return {};
      }
    } catch (error) {
      throw error;
    }
  }
  async uploadAvatar(avatar: AvatarDetails) {
    try {
      const { user_id, filename } = avatar;
      let result = await this.knex('user')
        .update('image', filename)
        .where('id', user_id);

      console.log('Service UploadAvatar', result);
      return {};
    } catch (error) {
      throw error;
    }
  }

  async getAvatar(user_id: number) {
    try {
      let result = await this.knex('user')
        .select('image')
        .where('id', user_id)
        .first();
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCommentPublished(user_id: number) {
    try {
      let result = await this.knex('rating')
        .select(
          'rating.id',
          'rating.score',
          'rating.comment',
          'from_user.name as from_name',
          'to_user.name as to_name'
        )
        .leftJoin(
          'customer as from_user',
          'rating.from_user_id',
          'from_user.id'
        )
        .leftJoin('customer as to_user', 'rating.to_user_id', 'to_user.id')
        .where('rating.from_user_id', user_id);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getEachCommentPublished(commentId: number) {
    console.log('Service getEachComment', commentId);
    try {
      let result = await this.knex('rating')
        .join('customer', 'customer.id', 'rating.to_user_id')
        .select('score', 'comment', 'to_user_id', 'name')
        .where('rating.id', commentId)
        .first();
      console.log('Service getEachComment', result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async postUpdatedComment(input: UpdatedComment) {
    console.log('service postUpdatedComment');
    try {
      const { commentId, comment, score } = input;
      console.log(commentId, comment, score);

      console.log('Service postUpdatedComment');
      await this.knex('rating')
        .update({ comment: comment, score: score })
        .where({ id: commentId });
      return {};
    } catch (error) {
      throw error;
    }
  }
}
