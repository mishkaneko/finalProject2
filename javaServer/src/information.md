## Created superuser

create user ridelinker with password '???????' superuser;

## Database name

create database ridelinker;

## Grant superuser privileges

grant all privileges on database ridelinker to ridelinker;

## Enter db with super user

psql -U ridelinker -W -h localhost ridelinker;

## to gen the table automatically by system
1. cd to db.migration
2. you need to create a file named erd.txt first
3. npx -p quick-erd erd-to-sqlite < erd.txt > V1__create_users.sql



## Generate 20 random number
openssl rand -hex 20
