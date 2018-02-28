-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 21, 2016 at 12:07 PM
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `uuid` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `resetPasswordToken` varchar(128) NOT NULL,
  `resetPasswordExpires` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`uuid`, `name`, `email`, `salt`, `hash`, `resetPasswordToken`, `resetPasswordExpires`) VALUES
('f8e77ae7-6724-4ca8-bb24-9256c009a38f', 'Rohit Markam', 'mrmarkam@gmail.com', '4e4a7ef8f428cdba9d5813d987034098', 'b7defac477125f3a498380b523c0433283636e2b6f05e6098bc30842d1f8182db5d70965e5c9c765282295428b0d8a3087c2151a7592f576b4b3e4d26be32c54', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD UNIQUE KEY `uuid` (`uuid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
