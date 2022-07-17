-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: testdoan
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `outstock` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `supplier_id` int NOT NULL,
  `amount` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Me xung Thien Huong 2','Me xung Thien Huong, nguon goc tu Hue',1,'https://firebasestorage.googleapis.com/v0/b/webbanhangspring-91802.appspot.com/o/Đặc-sản-Huế-Mè-xửng-Thiên-Hương-Túi-màu-500gr-1.jpg?alt=media&token=a2887e1d-c631-4e97-841b-d9f1b13f2292',1,'0','25000','food'),(4,'Nuoc suoi Aqua 4','giai khat tuyet voi',0,'https://drive.google.com/uc?export=view&id=13zTf25760ti73c4cpsOubjSvy0ciXDvC',3,'135','10000','drink'),(5,'Mè xửng Thiên Hương','Nguồn gốc từ Huế, thơm ngon',1,'https://firebasestorage.googleapis.com/v0/b/webbanhangspring-91802.appspot.com/o/Đặc-sản-Huế-Mè-xửng-Thiên-Hương-Túi-màu-500gr-1.jpg?alt=media&token=a2887e1d-c631-4e97-841b-d9f1b13f2292',1,'0','20000','food'),(6,'Coca Cola lon','Nước ngọt có ga giải khát',0,'/product_image/cocalon.jpg',3,'2','10000','drink'),(15,'Nuoc suoi Aqua 3','123323',1,'',2,'0','80000','drink'),(17,'Nuoc suoi Aqua ','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',0,'',3,'0','80000','drink'),(19,'Coca Cola lon 1','nước uống có ga, giải khát',1,'',2,'15','70000','drink'),(20,'Nuoc suoi Aqua 34','Nước suối giải khát',0,'',15,'13','80000','drink'),(21,'Coca Cola lon32','232',0,'',2,'45','80000','drink'),(23,'Coca Cola lon44444','2323',1,'',2,'0','80000','drink'),(24,'Nuoc suoi Aqua 367','123',0,'',2,'35','900','drink'),(25,'Nuoc suoi Aqua 5','sds',0,'',2,'12','150000','drink'),(26,'Mè xửng 2','Quà lưu niệm khi đến Đà Nẵng',0,'',1,'36','15000','food'),(27,'Nước uống 1','Nước uống đóng chai',1,'',15,'0','20000','drink'),(28,'Nước khoáng 1','Nước khoáng',0,'',15,'15','10000','drink'),(29,'Thuốc lá ngựa trắng','Thuốc lá vỉ nhỏ, hiệu ngựa trắng',0,'',14,'10','10000','cigarette');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `sale_managements` json NOT NULL,
  `price` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','2022-05-30 10:46:13','2022-05-30 10:46:13'),(3,'user','2022-05-30 10:46:43','2022-05-30 10:46:43');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sell_management`
--

DROP TABLE IF EXISTS `sell_management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sell_management` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `sell_amount` varchar(255) NOT NULL,
  `total_price` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sell_management`
--

LOCK TABLES `sell_management` WRITE;
/*!40000 ALTER TABLE `sell_management` DISABLE KEYS */;
INSERT INTO `sell_management` VALUES (1,'Mè xửng Thiên Hương','4','80000','2022-06-02 03:02:00'),(2,'Nuoc suoi Aqua 3','44','3520000','2022-06-05 11:04:00'),(3,'Me xung Thien Huong 2','12','300000','2022-06-02 03:25:00'),(4,'Coca Cola lon','3','30000','2022-06-01 03:15:00'),(5,'Nuoc suoi Aqua 4','12','120000','2001-03-06 03:23:00'),(6,'Nuoc suoi Aqua 4','12','120000','2022-05-31 03:23:00'),(7,'Mè xửng Thiên Hương','12','240000','2022-06-08 05:45:00'),(8,'Coca Cola lon','2','20000','2022-06-01 02:13:00'),(9,'Nuoc suoi Aqua 3','2','160000','2022-06-01 16:00:00'),(11,'Nuoc suoi Aqua 3','2','160000','2022-06-01 14:32:00'),(12,'Nuoc suoi Aqua 4','2','20000','2022-05-31 15:23:00'),(13,'Nuoc suoi Aqua 4','3','30000','2022-06-09 15:30:00'),(14,'Nuoc suoi Aqua 4','2','20000','2022-06-02 17:34:00'),(15,'Nuoc suoi Aqua 4','14','140000','2022-06-09 15:00:00'),(16,'Nuoc suoi Aqua 4','14','140000','2022-06-02 15:00:00'),(17,'Coca Cola lon','10','100000','2022-07-03 15:15:00'),(18,'Nuoc suoi Aqua 4','1','10000','2021-12-02 15:00:00'),(19,'Nước uống 1','2','40000','2022-07-08 15:00:00'),(20,'Mè xửng 2','2','30000','2022-07-08 15:00:00'),(21,'Mè xửng 2','12','180000','2022-07-08 15:00:00'),(22,'Coca Cola lon44444','12','960000','2022-07-15 15:00:00');
/*!40000 ALTER TABLE `sell_management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(255) NOT NULL,
  `supplier_description` varchar(255) NOT NULL,
  `supplier_phone` varchar(255) DEFAULT NULL,
  `supplier_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'CÔNG TY TNHH THIÊN HƯƠNG','Công ty chuyên sản xuất và buôn bán kẹo mè xửng','02343522040','20 Chi Lăng, Thành phố Huế'),(2,'Công Ty TNHH Nam Giang','Đại lý bia larue tại Đà Nẵng đã có được vị thế riêng của mình, có lượng đông đảo khách hàng và đối tác ủng hộ để kinh doanh lâu dài.','02363842567','374 Nguyễn Lương Bằng, P. Hòa Khánh Bắc, Q. Liên Chiểu, Tp. Đà Nẵng'),(3,'Công Ty TNHH Minh Lý','Công Ty TNHH Minh Lý thành lập năm 2002 chuyên cung cấp, phân phối kinh doanh các sản phẩm giải khát như bia, coca, nước khoáng, nước uống, nước ngọt,.. với giá thành tốt nhất cho khách hàng.','0400413717','35B Nguyễn Chí Thanh, P. Thạch Thang, Q. Hải Châu, Tp. Đà Nẵng'),(4,'Công ty 123','Công ty chuyên cung cấp thuốc lá','091432112','12 Cao Bá Quát'),(8,'3331323123`123','3331231231','3333123123','333123123'),(11,'Car1','Bán đồ ăn vặt','0917029775','12 Lý Thái Tổ'),(13,'Công ty 12345','1234','0917029775','12 Cao Bá Quát'),(14,'Công ty TNHH Thuốc lá Đà Nẵng','Cung cấp thuốc lá','02363846466','1 Đỗ Thúc Tịnh, Khuê Trung, Cẩm Lệ, Đà Nẵng'),(15,'Nhà cung cấp A','Nhà cung cấp nước uống đóng chai hiệu nước uống 1','0917029775','12 Cao Bá Quát');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `users_roles_ibfk_1` (`roleId`),
  CONSTRAINT `users_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (3,1,'2022-05-30 10:48:06','2022-07-05 09:04:51'),(1,2,'2022-05-31 02:56:01','2022-05-31 02:56:01'),(3,7,'2022-05-31 13:55:51','2022-05-31 13:55:51'),(3,8,'2022-07-06 05:45:09','2022-07-06 05:45:09');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'haibang','haibang123@gmail.com','$2a$08$2DJBMjeq7OKjAP6fJerW5.BmGTTb5.4hnwJIui/7BXGLxzoOmUnl2','2022-05-30 03:31:54','2022-07-05 08:58:59',1),(2,'haibang123','haibang12345@gmail.com','$2a$08$nH132H4YmOmcOgPAYmfwluElWW8ztGKWkNZfiDx74kgxzkhhtpLZ2','2022-05-31 02:56:01','2022-05-31 02:56:01',1),(7,'haibang123456','phanquanghaibang12345@gmail.com','$2a$08$ZXVV8VHhPVbsG4yKEgmkk.Uq6y2gh7GELK6Rjpo/4a9H6UieglR8C','2022-05-31 13:55:51','2022-07-03 19:19:52',0),(8,'haibang1610','bangcute123@gmail.com','$2a$08$kcB2xqt/KUPU0dkjC.m.tev2.8ZyyJycDU1GB9pByK3zPtKUQtXRG','2022-07-06 05:45:08','2022-07-06 05:45:08',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-17 13:36:45
