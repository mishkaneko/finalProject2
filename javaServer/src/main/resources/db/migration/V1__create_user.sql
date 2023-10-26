CREATE TABLE "user"(
  id SERIAL PRIMARY KEY,
  email text not null unique,
  password_hash char(60) not null,
  reset_token text null,
  image text null,
  created_at DATE not null default NOW(),
  updated_at DATE null
);