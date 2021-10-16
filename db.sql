create database game;
use game;

create user 'donoriukp'@'localhost' identified by 'securepass';
grant all privileges on game.* to 'donoriukp'@'localhost';

create table if not exists users (
	id int not null auto_increment,
	fullname varchar(30) not null,
	username varchar(30) not null unique,
	email varchar(30) not null unique,
	password varchar(30) not null,
	primary key(id)
);