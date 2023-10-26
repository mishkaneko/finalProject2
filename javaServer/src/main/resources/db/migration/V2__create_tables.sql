create table if not exists customer (
  id integer primary key references "user"(id)
, gender text not null
, phone text not null
, name text not null
, position text null
, position_update_time timestamp null
, last_login_time timestamp null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists driver (
  id integer primary key references "user"(id)
, hkid text not null
, driving_license_no text not null
, taxi_driver_identity_plate text not null
, vehicle_license text not null
, license_plate_no text not null
, is_available boolean not null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists location (
  id SERIAL primary key
, lat real not null
, lng real not null
, name text not null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists segment (
  id SERIAL primary key
, start_location_id integer not null references location(id)
, end_location_id integer not null references location(id)
, distance_in_meters real not null
, duration_in_seconds real not null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists match (
  id SERIAL primary key
, driver_id integer null references driver(id)
, segment_1_id integer not null references segment(id)
, segment_2_id integer not null references segment(id)
, segment_3_id integer not null references segment(id)
, total_distance_in_meters real not null
, estimated_duration_in_seconds real not null
, estimated_fare float not null
, match_time timestamp not null
, start_time timestamp null
, end_time timestamp null
, confirm_time timestamp null
, reject_time timestamp null
, cancel_time timestamp null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists rating (
  id SERIAL primary key
, match_id integer not null references match(id)
, from_user_id integer not null references customer(id)
, to_user_id integer not null references customer(id)
, score integer not null
, comment text null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);


create table if not exists transaction (
  id SERIAL primary key
, passenger_id integer not null references customer(id)
, amount float not null
, transaction_time timestamp null
, passenger_cancel_time timestamp null
, stripe_charge_id text null
, stripe_success_time timestamp null
, remark text null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists ride (
  id SERIAL primary key
, passenger_id integer not null references customer(id)
, match_id integer null references match(id)
, status text check(status in ('available','matched', 'matching', 'canceled', 'alone')) not null
, start_location_id integer not null references location(id)
, end_location_id integer not null references location(id)
, arrive_by_time timestamp not null
, transaction_id integer null references transaction(id)
, saved_fare float null
, distance integer null
, pickup_time timestamp null
, dropoff_time timestamp null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists additional_charge (
  id serial primary key
, ride_id integer not null references ride(id)
, transaction_id integer not null references transaction(id)
, name text not null check(name in ('package','animal','tunnel'))
, amount integer not null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists admin (
  id serial primary key references "user"(id)
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists driver_payout (
  id serial primary key
, driver_id integer not null references driver(id)
, transaction_id integer null references transaction(id)
, admin_id integer not null references admin(id)
, amount float not null
, payout_time timestamp not null
, remark text null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);

create table if not exists match_ride (
id serial primary key
, match_id integer not null references match(id)
, ride1_id integer not null references ride(id)
, ride2_id integer not null references ride(id)
, status text check(status in ('wait_both','wait_1','wait_2','confirmed','canceled')) not null
, created_at timestamp not null default CURRENT_TIMESTAMP
, updated_at timestamp null
);