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
-- Table structure for table `quote`
--

CREATE TABLE `quote` (
  `uuid` varchar(64) NOT NULL,
  `service` varchar(100) NOT NULL,
  `items` varchar(300) NOT NULL,
  `message` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `dateOfRequest` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quote`
--

INSERT INTO `quote` (`uuid`, `service`, `items`, `message`, `email`, `name`, `phone`, `dateOfRequest`) VALUES
('6d2cfd09-246f-4a3d-8e71-e1a78826f206', 'property', 'Buying/Selling Assistance,Property Maintenance,Utility Bill Payments', 'Hola', 'mrmarkam@gmail.com', 'Rohit Markam', '9043408425', '16/05/2016'),
('65540ce9-b61c-4a44-a579-caa169a05edf', 'property', 'Statutory Payments,Rental Collection', 'Na', 'roman@gmail.com', 'Roman Powoloski', 'roman123', '18/05/2016'),
('264f33e3-2bfc-4006-9ffe-cd718dbc743b', 'education', 'Monitoring Student (Academic and Personal),Admissions To Schools/Colleges', 'Glad!!', 'roman@gmail.com', 'Roman Powoloski', '12345678', '20/05/2016'),
('86bd386c-f328-4e35-ba0b-5b0f9930510b', 'Property Management', '', '[edit]\nWe Bare Bears follows three adoptive bear brothers: Grizzly, Panda and Ice Bear. The bears attempt to integrate with human society, such as by purchasing food, making human companions or trying to become famous on the Internet, although these attempts see the bears struggle to do so due to the civilized nature of humans and their own animal instincts', 'carl@gmail.com', 'Carl Carlson', '9893140190', '21/05/2016'),
('ca07e81d-2a76-4646-951a-4f7e04677d8e', 'Medical Services', '', '[edit]\nWe Bare Bears follows three adoptive bear brothers: Grizzly, Panda and Ice Bear. The bears attempt to integrate with human society, such as by purchasing food, making human companions or trying to become famous on the Internet, although these attempts see the bears struggle to do so due to the civilized nature of humans and their own animal instincts', 'jacob@gmail.com', 'Jacob', '9893140190', '21/05/2016'),
('bffce30d-eb77-49d6-b08b-853d41ba4a9a', 'Legal Advice', '', '[edit]\nWe Bare Bears follows three adoptive bear brothers: Grizzly, Panda and Ice Bear. The bears attempt to integrate with human society, such as by purchasing food, making human companions or trying to become famous on the Internet, although these attempts see the bears struggle to do so due to the civilized nature of humans and their own animal instincts', 'khush@gmail.com', 'Khush Singh', '9893140190', '21/05/2016'),
('2ee2b264-3018-4d28-ba17-530082681f00', 'education', 'Monitoring Student (Academic and Personal),Setup And Monitor Coaching Classes, Tuition And Hostel,Admissions To Schools/Colleges,Fee payments', '[edit]\nWe Bare Bears follows three adoptive bear brothers: Grizzly, Panda and Ice Bear. The bears attempt to integrate with human society, such as by purchasing food, making human companions or trying to become famous on the Internet, although these attempts see the bears struggle to do so due to the civilized nature of humans and their own animal instincts', 'mrmarkam@gmail.com', 'Rohit Markam', '9893140190', '21/05/2016'),
('b1d76e16-c3fd-44be-ab23-db39414eb183', 'property', 'Buying/Selling Assistance,Property Maintenance,Utility Bill Payments', '[edit]\nWe Bare Bears follows three adoptive bear brothers: Grizzly, Panda and Ice Bear. The bears attempt to integrate with human society, such as by purchasing food, making human companions or trying to become famous on the Internet, although these attempts see the bears struggle to do so due to the civilized nature of humans and their own animal instincts', 'mrmarkam@gmail.com', 'Rohit Markam', '9893140190', '21/05/2016'),
('0b1766ff-3552-4ee3-8e90-8e8456f82242', 'travel', '', 'In league with other contemporary British sirens like Amy Winehouse, Adele, Duffy and Nicole Willis,[24] her main musical influences are Mary J. Blige and Ella Fitzgerald. In an interview, Estelle remarked: "Every three years they are talking about the \'British (musical) invasion.\' It\'s been ongoing. It\'s been an invasion for the last 10 years. We are here! We crossed over. I\'m like one of the first black British artists to come over here and win a Grammy. We are here!"[3]', 'pando@gmail.com', 'Pando Panda', '9893140190', '21/05/2016'),
('b79125b1-ff91-4a6d-a517-12a29174bfe5', '', '', '', '', '', '', '21/05/2016'),
('06e4dd6a-fa41-4301-8f94-f1ca7b873158', '', '', '', '', '', '', '21/05/2016');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
