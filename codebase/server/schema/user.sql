-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 21, 2016 at 12:08 PM
-- Server version: 5.6.30
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yedupudi`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `verifyEmailToken` varchar(128) NOT NULL,
  `verifyEmailExpires` varchar(64) NOT NULL,
  `resetPasswordToken` varchar(128) NOT NULL,
  `resetPasswordExpires` varchar(64) CHARACTER SET ucs2 NOT NULL,
  `agrmntStatus` int(1) NOT NULL DEFAULT '0',
  `salt` varchar(32) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uuid`, `name`, `email`, `phone`, `verifyEmailToken`, `verifyEmailExpires`, `resetPasswordToken`, `resetPasswordExpires`, `agrmntStatus`, `salt`, `hash`, `active`, `updated`) VALUES
('0b9b8c28-2b7e-4f35-9e39-4137972248c2', 'Rohit Markam', 'mrmarkam@gmail.com', '', 'e582932a571b388f2cf9129c81d8dd26', '1463510265484', '', '', 0, '6a5fda4927b580561d8ef46066ba3ed2', '19bcc9dfa15d604b7453503800fb0fa55ac416c17787bc87aa7ac469559495c85115674a959bef8b886d3f5fa6f241926484655bf3c6d21d57fde4e561517a41', 1, '2016-05-17 17:45:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `email_2` (`email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
