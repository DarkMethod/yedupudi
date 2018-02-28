-- MySQL dump 10.13  Distrib 5.5.46, for Linux (x86_64)
--
-- Host: localhost    Database: yedupudi
-- ------------------------------------------------------
-- Server version	5.5.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `uuid` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `resetPasswordToken` varchar(128) NOT NULL,
  `resetPasswordExpires` varchar(64) NOT NULL,
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('f8e77ae7-6724-4ca8-bb24-9256c009a38f','Yedupudi Admin','admin@yedupudi.com','4e4a7ef8f428cdba9d5813d987034098','b7defac477125f3a498380b523c0433283636e2b6f05e6098bc30842d1f8182db5d70965e5c9c765282295428b0d8a3087c2151a7592f576b4b3e4d26be32c54','','');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alias`
--

DROP TABLE IF EXISTS `alias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alias` (
  `uuid` varchar(64) NOT NULL,
  `provider` varchar(10) NOT NULL,
  `providerId` varchar(128) NOT NULL,
  `providerEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Social identities of users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alias`
--

LOCK TABLES `alias` WRITE;
/*!40000 ALTER TABLE `alias` DISABLE KEYS */;
INSERT INTO `alias` VALUES ('99e236db-7a70-442a-bfb7-4b1f2a0834b9','google','113010662282084936978','mrmarkam@gmail.com');
/*!40000 ALTER TABLE `alias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quote` (
  `uuid` varchar(64) NOT NULL,
  `service` varchar(100) NOT NULL,
  `items` varchar(300) NOT NULL,
  `message` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `dateOfRequest` varchar(60) NOT NULL,
  `start` varchar(60) NOT NULL,
  `end` varchar(60) NOT NULL,
  `paymentStatus` varchar(10) NOT NULL DEFAULT 'No',
  `price` varchar(60) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote`
--

LOCK TABLES `quote` WRITE;
/*!40000 ALTER TABLE `quote` DISABLE KEYS */;
INSERT INTO `quote` VALUES ('585112c2-551d-4e09-80f4-29e0256a1ec3','document','Birth / Death certificates,Marriage Certificate,PAN Card Application,Other Documents Procurement','You can try to diagnose the problem by taking the following steps: \nGo to Start > Control Panel > Network and Internet > Network and Sharing Center > Troubleshoot Problems (at the bottom) > Internet Connections.','mrmarkam@gmail.com','Rohit Markam','9893140190','26/05/2016','26-May-2016','28-May-2016','No','30000','Could Not Proceed'),('5ad38890-d8d5-4749-b9e0-de803ccc5acf','property','Buying/Selling Assistance,Property Maintenance,Utility Bill Payments,Statutory Payments,Rental Collection,Tenant Management/Inspections','','mrmarkam@gmail.com','Rohit Markam','9893140190','27/05/2016','28-May-2016','03-June-2016','No','12000','Received Request'),('0b3e206f-058b-45a5-85ec-4dfe4ba0cad7','travel','Airport Pick Up/Drop Off,Religious Travel Arrangements,Hotel Accomodation,Ticket Booking,Vehicle Arrangement During India Trip','Enjoy higher benefits with Tikona’s New Plans !!! \n\nMigrate to our new Plans & enjoy more with almost the same monthly payout','mrmarkam@gmail.com','Rohit Markam','9893140190','27/05/2016','28-May-2016','03-June-2016','No','15,000','Received Request'),('d7ef97b1-1979-4fba-99b2-bef01f724cf8','medical','Home Health Care,Medicine Delivery,Laboratory Tests At Home','','mrmarkam@gmail.com','Rohit Markam','9893140190','27/05/2016','','','No','Quote',''),('ccce2606-80dc-4276-a5cc-91f63ea8aa17','property','Buying/Selling Assistance,Property Maintenance,Tenant Management/Inspections,Encumbrance/Patta & Other Legal Certificates','Dff','mrmarkam@gmail.com','Rohit Markam','8766','27/05/2016','','','No','Quote',''),('db9b613b-9f9c-484e-84e0-0f2f82cb7e3c','property','Buying/Selling Assistance,Statutory Payments,Rental Collection,Tenant Management/Inspections,Electrical, Plumbing & Painting','','mrmarkam@gmail.com','Rohit Markam','9893140190','27/05/2016','','','No','Quote',''),('94e01f3d-81c0-4b3d-ab85-4050f7344ae9','property','Property Maintenance,Utility Bill Payments,Statutory Payments','','mrmarkam@gmail.com','Rohit Markam','9893140190','28/05/2016','','','No','Quote',''),('3a50138d-4390-42f3-8c32-3383297a5052','medical','Home Health Care,Medicine Delivery,Laboratory Tests At Home,Geriatric care,Emergency care','','mrmarkam@gmail.com','Rohit Markam','9893140190','30/05/2016','07-June-2016','23-June-2016','No','5000','Received Request'),('0299b302-1bdc-4cef-b8ed-0712466c4744','','','Hola!','mrmarkam@gmail.com','Rohit Markam','123456','04/06/2016','','','No','Quote',''),('a72fa27b-69fe-45e7-b9eb-6b3da496941e','event','Product Launch,Corporate Anniversary Parties,Meetings & Conferences,Road Shows','','mrmarkam@gmail.com','Rohit Markam','9043408425','05/06/2016','','','No','Quote','');
/*!40000 ALTER TABLE `quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `email` (`email`),
  KEY `email_2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0b9b8c28-2b7e-4f35-9e39-4137972248c2','Rohit Markam','mrmarkam@gmail.com','','e582932a571b388f2cf9129c81d8dd26','1463510265484','a5ab3c84a6896c0f0ca48c3638ea463c','1465206397694',0,'6a5fda4927b580561d8ef46066ba3ed2','19bcc9dfa15d604b7453503800fb0fa55ac416c17787bc87aa7ac469559495c85115674a959bef8b886d3f5fa6f241926484655bf3c6d21d57fde4e561517a41',1,'2016-06-06 08:46:37'),('8a16965b-02fb-4460-b887-49425a8a12f3','gautam mayilvaganan','gautham3131@gmail.com','','ccb3435e81249e0cbf693906b6f6b0e6','1464345911851','','',0,'dff542e5411919427f206fb515a0271d','038a902e45fc1656c45a181023007a179922cb7f856783d23af46d7c078396eaabe9eb3de0a4d55b8df8a03033eec1573824d3706f38c28e64b049a32f14bd79',1,'2016-05-27 09:46:10');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-06  8:55:26
