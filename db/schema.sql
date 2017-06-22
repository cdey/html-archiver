DROP DATABASE IF EXISTS archive;

CREATE DATABASE archive;

USE archive;

CREATE TABLE jobs (
  id int NOT NULL AUTO_INCREMENT,
  filepath VARCHAR(100),
  url VARCHAR(100) NOT NULL UNIQUE,
  archived boolean DEFAULT false,
  PRIMARY KEY (ID)
);

/*  Run in the command line to create database and table:
 *    mysql -u root < db/schema.sql
 *    mysql -u root -p */

