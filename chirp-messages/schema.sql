-- Add support for UUID generation
CREATE EXTENSION "uuid-ossp";

CREATE TABLE messages (
    id uuid primary key default uuid_generate_v4(),
    body text not null,
    created_at timestamp default now()
);

-- Setup connection permissions for chirp_messages
ALTER ROLE chirp_messages WITH LOGIN;
GRANT CONNECT ON DATABASE chirp_messages TO chirp_messages;
GRANT SELECT, INSERT ON messages TO chirp_messages;
