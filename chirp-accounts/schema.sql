-- Add support for UUID generation
CREATE EXTENSION "uuid-ossp";

CREATE TABLE accounts (
    id uuid primary key default uuid_generate_v4(),
    username varchar(32) not null unique,
    password text not null,
    created_at timestamp default now()
);

GRANT SELECT, INSERT ON accounts TO chirp;
