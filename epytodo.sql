DROP DATABASE IF EXISTS `epytodo`;
CREATE DATABASE `epytodo`;
USE `epytodo`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` 
(
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `todo`;
CREATE TABLE IF NOT EXISTS `todo` 
(
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `due_time` DATETIME NOT NULL,
  `status` ENUM('not started','todo','in progress','done') NOT NULL DEFAULT 'not started',
  `user_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`id`)
);

