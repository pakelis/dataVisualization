-- CREATE SCHEMA siauliai_sportas;
-- Create new schema
-- SET search_path
-- TO siauliai_sportas, public;
-- set search path of our schema to public

CREATE TABLE renginiu_finansavimas
(
    id SERIAL PRIMARY KEY,
    year SMALLINT,
    project_executor VARCHAR(255),
    event_name VARCHAR(255),
    funds NUMERIC
);

CREATE TABLE neigaliuju_lesu_paskristimas
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

CREATE TABLE sporto_lesu_paskirstimas
(
    id SERIAL PRIMARY KEY,
    year SMALLINT,
    project_executor VARCHAR(255),
    project_name VARCHAR(255),
    funds MONEY
);

SELECT *
FROM renginiu_finansavimas;
SELECT *
FROM neigaliuju_lesu_paskristimas;
SELECT *
FROM sporto_lesu_paskirstimas;
