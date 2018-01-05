-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2017 at 07:44 PM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(121, 'bob marle', 'https://cdn.inquisitr.com/wp-content/uploads/2014/12/fineartamerica.jpg', '[{\"url\":\".\\/songs\\/bob\\/1.mp3\",\"name\":\"song 1\"},{\"url\":\".\\/songs\\/bob\\/2.mp3\",\"name\":\"song 2\"},{\"url\":\".\\/songs\\/bob\\/3.mp3\",\"name\":\"song 3\"}]'),
(122, 'frank sinatra', 'http://www.sinatra.com/sites/default/files/styles/news-thumbnail/public/Frank%20Sinatra%202.25.15%20site%20post.jpg?itok=bH18he2V', '[{\"url\":\".\\/songs\\/frank\\/song1.mp3\",\"name\":\"song 1\"},{\"url\":\".\\/songs\\/frank\\/song2.mp3\",\"name\":\"song 2\"},{\"url\":\".\\/songs\\/frank\\/song3.mp3\",\"name\":\"song 3\"},{\"url\":\".\\/songs\\/frank\\/song4.mp3\",\"name\":\"song 4\"},{\"url\":\".\\/songs\\/frank\\/song5.mp3\",\"name\":\"song 5\"}]'),
(125, 'elvis presley', 'http://e-cdn-images.deezer.com/images/artist/935d35a45e061e7640a0becfa42cef6e/500x500.jpg', '[{\"url\":\".\\/songs\\/elvis\\/song1.mp3\",\"name\":\"song 1\"},{\"url\":\".\\/songs\\/elvis\\/Elvis Presley - My Way (HD).mp3\",\"name\":\"my way\"},{\"url\":\".\\/songs\\/elvis\\/Elvis Presley - My Boy.mp3\",\"name\":\"my boy\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
