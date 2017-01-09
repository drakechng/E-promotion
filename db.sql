-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 09, 2017 at 08:06 AM
-- Server version: 10.1.20-MariaDB
-- PHP Version: 7.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aaa`
--

-- --------------------------------------------------------

--
-- Table structure for table `consumers`
--

CREATE TABLE `consumers` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `contact` int(11) NOT NULL,
  `industry` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_NRIC` varchar(100) NOT NULL,
  `customer_user` text NOT NULL,
  `customer_pw` text NOT NULL,
  `customer_name` text NOT NULL,
  `customer_contact` text NOT NULL,
  `customer_email` text NOT NULL,
  `create_time` datetime NOT NULL,
  `customer_birthday` date NOT NULL,
  `customer_gender` enum('male','female','','') NOT NULL,
  `customer_age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `estamps`
--

CREATE TABLE `estamps` (
  `estamps_id` int(11) NOT NULL,
  `estamps_from` date NOT NULL,
  `estamps_to` date NOT NULL,
  `estamps_des` text NOT NULL,
  `consumer_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `estamps_trans`
--

CREATE TABLE `estamps_trans` (
  `estamps_trans_id` int(11) NOT NULL,
  `estamps_id` int(11) NOT NULL,
  `membership_id` int(11) NOT NULL,
  `hidden` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

CREATE TABLE `membership` (
  `membership_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `consumer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `points_trans`
--

CREATE TABLE `points_trans` (
  `points_trans_id` int(11) NOT NULL,
  `points_trans_value` int(11) NOT NULL,
  `membership_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `points_trans_from` date NOT NULL,
  `points_trasn_to` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tier`
--

CREATE TABLE `tier` (
  `tier_id` int(11) NOT NULL,
  `tier_level` varchar(255) NOT NULL DEFAULT '""',
  `tier_point` varchar(255) NOT NULL DEFAULT '""',
  `tier_url` varchar(255) NOT NULL DEFAULT '""',
  `consumer_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `voucher_id` int(11) NOT NULL,
  `type` enum('discount_cash','discount_percentage','discount_product','') NOT NULL,
  `consumer_id` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  `voucher_from` date NOT NULL,
  `voucher_to` date NOT NULL,
  `voucher_value` text NOT NULL,
  `voucher_max` int(11) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vouchers_trans`
--

CREATE TABLE `vouchers_trans` (
  `vouchers_trans_id` int(11) NOT NULL,
  `vouchers_id` int(11) NOT NULL,
  `hidden` tinyint(1) NOT NULL,
  `membership_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consumers`
--
ALTER TABLE `consumers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_NRIC` (`customer_NRIC`),
  ADD UNIQUE KEY `a` (`customer_NRIC`);

--
-- Indexes for table `estamps`
--
ALTER TABLE `estamps`
  ADD PRIMARY KEY (`estamps_id`),
  ADD KEY `consumer_id` (`consumer_id`);

--
-- Indexes for table `estamps_trans`
--
ALTER TABLE `estamps_trans`
  ADD PRIMARY KEY (`estamps_trans_id`),
  ADD KEY `membership_id` (`membership_id`),
  ADD KEY `estamps_id` (`estamps_id`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`membership_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `consumer_id` (`consumer_id`);

--
-- Indexes for table `points_trans`
--
ALTER TABLE `points_trans`
  ADD PRIMARY KEY (`points_trans_id`),
  ADD KEY `membership_id` (`membership_id`),
  ADD KEY `membership_id_2` (`membership_id`);

--
-- Indexes for table `tier`
--
ALTER TABLE `tier`
  ADD PRIMARY KEY (`tier_id`),
  ADD KEY `consumer_id` (`consumer_id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucher_id`),
  ADD KEY `foreign` (`consumer_id`);

--
-- Indexes for table `vouchers_trans`
--
ALTER TABLE `vouchers_trans`
  ADD PRIMARY KEY (`vouchers_trans_id`),
  ADD KEY `membership_id` (`membership_id`),
  ADD KEY `vouchers_id` (`vouchers_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consumers`
--
ALTER TABLE `consumers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estamps`
--
ALTER TABLE `estamps`
  MODIFY `estamps_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estamps_trans`
--
ALTER TABLE `estamps_trans`
  MODIFY `estamps_trans_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `membership`
--
ALTER TABLE `membership`
  MODIFY `membership_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `points_trans`
--
ALTER TABLE `points_trans`
  MODIFY `points_trans_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tier`
--
ALTER TABLE `tier`
  MODIFY `tier_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucher_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vouchers_trans`
--
ALTER TABLE `vouchers_trans`
  MODIFY `vouchers_trans_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `estamps`
--
ALTER TABLE `estamps`
  ADD CONSTRAINT `estamps_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `estamps_trans`
--
ALTER TABLE `estamps_trans`
  ADD CONSTRAINT `estamps_trans_ibfk_1` FOREIGN KEY (`membership_id`) REFERENCES `membership` (`membership_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estamps_trans_ibfk_2` FOREIGN KEY (`estamps_id`) REFERENCES `estamps` (`estamps_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `membership`
--
ALTER TABLE `membership`
  ADD CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `membership_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `points_trans`
--
ALTER TABLE `points_trans`
  ADD CONSTRAINT `points_trans_ibfk_1` FOREIGN KEY (`membership_id`) REFERENCES `membership` (`membership_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tier`
--
ALTER TABLE `tier`
  ADD CONSTRAINT `tier_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`consumer_id`) REFERENCES `consumers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vouchers_trans`
--
ALTER TABLE `vouchers_trans`
  ADD CONSTRAINT `vouchers_trans_ibfk_1` FOREIGN KEY (`membership_id`) REFERENCES `membership` (`membership_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vouchers_trans_ibfk_2` FOREIGN KEY (`vouchers_id`) REFERENCES `vouchers` (`voucher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
