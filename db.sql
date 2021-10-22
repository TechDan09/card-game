create database game;
use game;

create user 'donoriukp'@'localhost' identified by 'securepass';
grant all privileges on game.* to 'donoriukp'@'localhost';

create table if not exists users (
	id int not null auto_increment,
	fullname varchar(30) not null,
	username varchar(30) not null unique,
	email varchar(30) not null unique,
	password varchar(255) not null,
	primary key(id)
);

create table if not exists heroes (
	id int not null auto_increment,
	heroname varchar(30) not null unique,
	attack int not null,
	defense int not null,
	cost int not null,
	image varchar(255) not null,
	primary key(id)
);

insert into heroes(heroname, attack, defense, cost, image)
values
	('Thor', 9, 3, 8 'thor.jpg'),
	('Black Panther', 6, 7, 7, 'blackpanther.jpg'),
	('Black Widow', 3, 2, 2, 'blackwidow.jpeg'),
	('Falcon', 8, 5, 6, 'falcon.jpg'),
	('Hank', 7, 3, 6, 'hank.jpg'),
	('Invisible', 5, 7, 8, 'invisiblewoman.jpg'),
	('Iron Man', 7, 5, 8, 'ironman.jpg'),
	('Justice', 7, 6, 8, 'justice.jpg'),
	('StinGray', 3, 5, 4, 'stingray.jpg'),
	('vision', 9, 2, 8, 'vision.jpg'),
	('Sersi', 9, 9, 9, 'sersi.jpg'),
	('spiderman', 5, 8, 9, 'spiderman.jpg'),
	('crystal', 6, 5, 8, 'crystal.jpg'),
	('silverclaw', 5, 8, 8, 'silverclaw.jpg'),
	('lukecage', 5, 5, 6, 'lukecage.jpg'),
	('sentry', 4, 6, 7, 'sentry.jpg'),
	('echo', 5, 4, 6, 'echo.jpg'),
	('Jocasta', 3, 5, 8, 'jocasta.jpg'),
	('spiderwoman', 5, 6, 8, 'spiderwoman.jpg'),
	('doctorstrange', 7, 9, 9, 'drstrange.jpg'),
	('hyperion', 5, 6, 6, 'hyperion.jpg');