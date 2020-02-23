-- CREATE SCHEMA siauliai_sportas;
-- Create new schema
-- SET search_path
-- TO siauliai_sportas, public;
-- set search path of our schema to public

-- ALTER TABLE finance
-- SET SCHEMA siauliai_sportas;
--Move table to different schema

CREATE TABLE finance
(
    id SERIAL PRIMARY KEY,
    year SMALLINT,
    project_executor VARCHAR(255),
    event_name VARCHAR(255),
    funds NUMERIC
);

CREATE TABLE disabled_finance
(
    id SERIAL PRIMARY KEY,
    project_executor VARCHAR(255),
    personal_code INTEGER,
    event_name VARCHAR(255),
    year SMALLINT,
    point_average MONEY,
    requested_sum MONEY,
    funds MONEY
);

CREATE TABLE sport_funds
(
    id SERIAL PRIMARY KEY,
    year SMALLINT,
    project_executor VARCHAR(255),
    project_name VARCHAR(255),
    funds MONEY
);



SELECT *
FROM finance;
SELECT *
FROM disabled_finance;
SELECT *
FROM sport_funds;