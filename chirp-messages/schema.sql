-- Add support for UUID generation
CREATE EXTENSION "uuid-ossp";

CREATE TABLE messages (
    id uuid primary key default uuid_generate_v4(),
    body text not null,
    created_at timestamp default now()
);

GRANT SELECT, INSERT ON messages TO chirp;
