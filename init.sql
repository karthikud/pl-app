-- Use this file to create the database structure
DELETE DATABASE IF EXISTS pocketlaw;
CREATE DATABASE pocketlaw;

CREATE TABLE contracts (id integer, name varchar(100), category varchar(100),sales_rep varchar(100),value varchar(100));
		