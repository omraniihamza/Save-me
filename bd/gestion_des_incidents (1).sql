-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 01 mars 2023 à 17:21
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_des_incidents`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nom` varchar(40) NOT NULL,
  `prénom` varchar(40) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `date_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prénom`, `email`, `password`, `tel`, `date_login`) VALUES
(4, 'saif', 'mhamdi', 'mhamdisaif035@gmail.com', 'saifsaif', '27236337', '2023-02-28 13:57:59');

-- --------------------------------------------------------

--
-- Structure de la table `android_push_token`
--

CREATE TABLE `android_push_token` (
  `id` int(11) NOT NULL,
  `push_token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `android_push_token`
--

INSERT INTO `android_push_token` (`id`, `push_token`) VALUES
(1, 'hi there !!');

-- --------------------------------------------------------

--
-- Structure de la table `discussion`
--

CREATE TABLE `discussion` (
  `id` varchar(20) NOT NULL,
  `id_technicien` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `date_discussion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `discussion`
--

INSERT INTO `discussion` (`id`, `id_technicien`, `id_admin`, `date_discussion`) VALUES
('3', 1, 4, '2023-02-07');

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

CREATE TABLE `favoris` (
  `id` int(20) NOT NULL,
  `id_technicien` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `id_technicien` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` blob DEFAULT NULL,
  `signature` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `incidents`
--

CREATE TABLE `incidents` (
  `id` int(11) NOT NULL,
  `id_operateur` int(11) NOT NULL,
  `date_insertion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nom` varchar(30) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `code_postal` varchar(15) NOT NULL,
  `fiche_technique` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `details` text NOT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `incidents`
--

INSERT INTO `incidents` (`id`, `id_operateur`, `date_insertion`, `nom`, `adresse`, `code_postal`, `fiche_technique`, `telephone`, `details`, `titre`) VALUES
(10, 24, '2023-03-01 15:34:19', 'Telecom', 'cité 25 juillet', '2078', 'mission à faire', '27236337', 'panne', 'Cablage');

-- --------------------------------------------------------

--
-- Structure de la table `ios_push_token`
--

CREATE TABLE `ios_push_token` (
  `id` int(11) NOT NULL,
  `push_token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ios_push_token`
--

INSERT INTO `ios_push_token` (`id`, `push_token`) VALUES
(1, 'hi there !!'),
(17, 'hi there !!'),
(7846, 'hi there !!'),
(84653, 'hi there !!'),
(84654, 'azerty123'),
(84655, 'azerty123'),
(84656, 'azerty123'),
(84657, 'azerty123');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `id_technicien` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_discussion` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `date_envoie` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id`, `id_technicien`, `id_admin`, `id_discussion`, `content`, `date_envoie`) VALUES
(1, 1, 4, '3', 'salem aalaykom', '2023-02-24 16:01:42'),
(6, 2, 4, '3', 'si hamza ahla bik', '2023-02-21 18:20:27');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `id_technicien` int(11) NOT NULL,
  `date_notification` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `titre` varchar(30) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`id`, `id_technicien`, `date_notification`, `titre`, `message`) VALUES
(2860, 23, '2023-03-01 14:00:12', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2861, 1, '2023-03-01 14:00:35', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2862, 2, '2023-03-01 14:00:35', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2863, 5, '2023-03-01 14:00:35', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2864, 19, '2023-03-01 14:00:35', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2865, 23, '2023-03-01 14:00:35', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2866, 1, '2023-03-01 14:01:00', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2867, 2, '2023-03-01 14:01:00', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2868, 19, '2023-03-01 14:01:01', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2869, 1, '2023-03-01 14:20:19', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2870, 2, '2023-03-01 14:20:19', 'Mission jeed weeldik', 'jed weeldik marra okhraa'),
(2871, 19, '2023-03-01 14:20:19', 'Mission jeed weeldik', 'jed weeldik marra okhraa');

-- --------------------------------------------------------

--
-- Structure de la table `operateur`
--

CREATE TABLE `operateur` (
  `id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `operateur`
--

INSERT INTO `operateur` (`id`, `Name`, `email`, `telephone`, `password`) VALUES
(24, 'Ooredoo', 'test@ooredoo.tn', '+21627236337', '$2a$10$BDF7t.W.1zTqPkIgwKvnF.pivXapbyIOb');

-- --------------------------------------------------------

--
-- Structure de la table `reclamation`
--

CREATE TABLE `reclamation` (
  `id` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_operateur` int(11) NOT NULL,
  `reclamation` varchar(255) NOT NULL,
  `date_reclamation` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reclamation`
--

INSERT INTO `reclamation` (`id`, `id_admin`, `id_operateur`, `reclamation`, `date_reclamation`) VALUES
(1, 4, 24, 'vous êtes en retard', '2023-03-01 16:13:36'),
(2, 4, 24, 'vous êtes en retard', '2023-03-01 16:15:00');

-- --------------------------------------------------------

--
-- Structure de la table `techniciens`
--

CREATE TABLE `techniciens` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(40) NOT NULL,
  `code_postal` varchar(20) NOT NULL,
  `disponibilité` tinyint(1) NOT NULL DEFAULT 0,
  `telephone` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `date_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `device_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `techniciens`
--

INSERT INTO `techniciens` (`id`, `nom`, `prenom`, `code_postal`, `disponibilité`, `telephone`, `password`, `email`, `date_login`, `device_type`) VALUES
(1, 'Hamza', 'omrani', '3000', 1, '2147483647', 'hamzahalamadrid', 'omranih11@gmail.com', '2023-03-01 13:36:27', 'android'),
(2, 'hamza', 'omrani ', '2049a', 1, '27236337', '$2a$10$9a.atHjZ2EAtTm/F6xSJHusbhvyDocWwZX0EI7yTQeH', 'hamza@gmail.com', '2023-03-01 13:36:33', 'android'),
(5, 'marwen', 'omrani ', '7094', 0, '54496521', '$2a$10$LMwWkf2gfx3EyfBf42cPC.v2rUx266LPmXmWPXbbf.A', 'marwen@gmail.com', '2023-03-01 14:00:49', 'android'),
(19, 'saif', 'mhamdi', '2094', 1, '+216588498', 'saiftarajidawla', 'omranih11@gmail.com', '2023-03-01 13:36:44', 'ios'),
(23, 'saif', 'mhamdi', '2456', 0, '27236337', 'sqjdlqskdjqslkdkl', 'mhamdisaif035@gmail.com', '2023-03-01 14:00:54', 'ios');

-- --------------------------------------------------------

--
-- Structure de la table `technicien_incident`
--

CREATE TABLE `technicien_incident` (
  `id` int(11) NOT NULL,
  `id_technicien` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `date_assignation` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `acceptation` tinyint(1) NOT NULL DEFAULT 0,
  `id_feedback` int(11) DEFAULT NULL,
  `statu` varchar(255) NOT NULL DEFAULT 'EN ATTENTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `android_push_token`
--
ALTER TABLE `android_push_token`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `discussion`
--
ALTER TABLE `discussion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disc_admin` (`id_admin`),
  ADD KEY `disc_technicien` (`id_technicien`);

--
-- Index pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_technicien` (`id_technicien`,`id_incident`),
  ADD KEY `fav_inc` (`id_incident`);

--
-- Index pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feed_tech` (`id_technicien`),
  ADD KEY `feedback_incident` (`id_incident`);

--
-- Index pour la table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incident_operateur` (`id_operateur`);

--
-- Index pour la table `ios_push_token`
--
ALTER TABLE `ios_push_token`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disc_mess` (`id_discussion`),
  ADD KEY `fk_mess_tech` (`id_technicien`),
  ADD KEY `admin_mess` (`id_admin`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notif_tech` (`id_technicien`);

--
-- Index pour la table `operateur`
--
ALTER TABLE `operateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rec_admin` (`id_admin`),
  ADD KEY `rec_operateur` (`id_operateur`);

--
-- Index pour la table `techniciens`
--
ALTER TABLE `techniciens`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `technicien_incident`
--
ALTER TABLE `technicien_incident`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tech_feedback` (`id_feedback`),
  ADD KEY `technicien_fk` (`id_technicien`),
  ADD KEY `tech_incidents` (`id_incident`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `android_push_token`
--
ALTER TABLE `android_push_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163567;

--
-- AUTO_INCREMENT pour la table `favoris`
--
ALTER TABLE `favoris`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78973;

--
-- AUTO_INCREMENT pour la table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9509;

--
-- AUTO_INCREMENT pour la table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `ios_push_token`
--
ALTER TABLE `ios_push_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84658;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2872;

--
-- AUTO_INCREMENT pour la table `operateur`
--
ALTER TABLE `operateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `techniciens`
--
ALTER TABLE `techniciens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `technicien_incident`
--
ALTER TABLE `technicien_incident`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `discussion`
--
ALTER TABLE `discussion`
  ADD CONSTRAINT `disc_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `disc_technicien` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `fav_inc` FOREIGN KEY (`id_incident`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoris_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);

--
-- Contraintes pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feed_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`),
  ADD CONSTRAINT `feedback_incident` FOREIGN KEY (`id_incident`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incident_operateur` FOREIGN KEY (`id_operateur`) REFERENCES `operateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `admin_mess` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `disc_mess` FOREIGN KEY (`id_discussion`) REFERENCES `discussion` (`id`),
  ADD CONSTRAINT `fk_mess_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notif_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);

--
-- Contraintes pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD CONSTRAINT `rec_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rec_operateur` FOREIGN KEY (`id_operateur`) REFERENCES `operateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `technicien_incident`
--
ALTER TABLE `technicien_incident`
  ADD CONSTRAINT `tech_feedback` FOREIGN KEY (`id_feedback`) REFERENCES `feedback` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tech_incidents` FOREIGN KEY (`id_incident`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `technicien_fk` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
