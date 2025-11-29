-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: planos
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Current Database: `planos`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `planos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `planos`;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,2,1,5,'2025-09-27 22:52:16'),(2,3,1,4,'2025-09-27 22:52:16'),(3,1,2,4,'2025-09-27 22:52:16'),(4,4,3,5,'2025-09-27 22:52:16'),(5,3,4,4,'2025-09-27 22:52:16'),(26,5,5,5,'2025-10-12 15:58:59'),(27,6,5,4,'2025-10-12 15:58:59'),(28,7,6,5,'2025-10-12 15:58:59'),(29,8,6,4,'2025-10-12 15:58:59'),(30,9,7,5,'2025-10-12 15:58:59'),(31,10,8,4,'2025-10-12 15:58:59'),(32,5,9,5,'2025-10-12 15:58:59'),(33,6,10,5,'2025-10-12 15:58:59'),(34,1,11,5,'2025-10-12 15:58:59'),(35,2,12,4,'2025-10-12 15:58:59'),(36,3,13,5,'2025-10-12 15:58:59'),(37,4,14,4,'2025-10-12 15:58:59'),(38,5,15,5,'2025-10-12 15:58:59'),(39,6,16,4,'2025-10-12 15:58:59'),(40,7,17,5,'2025-10-12 15:58:59'),(41,8,18,5,'2025-10-12 15:58:59'),(42,9,19,4,'2025-10-12 15:58:59'),(43,10,20,5,'2025-10-12 15:58:59'),(44,1,21,4,'2025-10-12 15:58:59'),(45,2,22,5,'2025-10-12 15:58:59'),(46,3,23,5,'2025-10-12 15:58:59'),(47,4,24,4,'2025-10-12 15:58:59'),(48,5,25,5,'2025-10-12 15:58:59'),(49,6,26,4,'2025-10-12 15:58:59'),(50,7,27,5,'2025-10-12 15:58:59'),(51,8,28,5,'2025-10-12 15:58:59'),(52,9,29,4,'2025-10-12 15:58:59'),(53,10,30,5,'2025-10-12 15:58:59');
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (1,2,1,'Plano excelente para começar do zero.','2025-09-27 22:52:10'),(2,3,1,'Achei que faltaram mais exercícios.','2025-09-27 22:52:10'),(3,1,2,'Gostei da explicação sobre async/await.','2025-09-27 22:52:10'),(4,4,3,'Muito completo para análise de dados.','2025-09-27 22:52:10'),(5,3,4,'Gostaria de mais exemplos práticos de IA.','2025-09-27 22:52:10'),(26,5,5,'Plano muito completo para quem quer se aprofundar em MERN!','2025-10-12 15:58:58'),(27,6,5,'Adorei a parte de React, muito bem explicada.','2025-10-12 15:58:58'),(28,7,6,'Perfeito para quem está começando em UI/UX.','2025-10-12 15:58:58'),(29,8,6,'Gostaria de mais exemplos de projetos práticos.','2025-10-12 15:58:58'),(30,9,7,'Conteúdo essencial para a área de cibersegurança.','2025-10-12 15:58:58'),(31,10,8,'Achei o passo a passo para o iOS muito claro e direto.','2025-10-12 15:58:58'),(32,5,9,'Ótimo guia para iniciantes em Django.','2025-10-12 15:58:58'),(33,6,10,'O plano sobre cloud é muito útil para entender os conceitos básicos.','2025-10-12 15:58:58'),(34,1,11,'O plano de Android com Kotlin é muito didático.','2025-10-12 15:58:58'),(35,2,12,'Adorei a seção de Spring Boot!','2025-10-12 15:58:58'),(36,3,13,'Muito bom para entender o básico de Unity.','2025-10-12 15:58:58'),(37,4,14,'A visualização de dados com Matplotlib é excelente.','2025-10-12 15:58:58'),(38,5,15,'Conteúdo de ML muito claro e direto.','2025-10-12 15:58:58'),(39,6,16,'Blockchain é um tema complexo, mas o plano simplifica bem.','2025-10-12 15:58:58'),(40,7,17,'Vue.js é muito mais fácil de aprender com esse guia.','2025-10-12 15:58:58'),(41,8,18,'A arquitetura de microserviços é o futuro!','2025-10-12 15:58:58'),(42,9,19,'Ótimo para quem quer começar em DevOps.','2025-10-12 15:58:58'),(43,10,20,'Conteúdo essencial para qualquer desenvolvedor.','2025-10-12 15:58:58'),(44,1,21,'Guia de Ruby on Rails perfeito para um projeto rápido.','2025-10-12 15:58:58'),(45,2,22,'As queries SQL estão muito bem explicadas.','2025-10-12 15:58:58'),(46,3,23,'Realidade Virtual é fascinante, e o plano é muito bom!','2025-10-12 15:58:58'),(47,4,24,'Adorei o plano de design para redes sociais.','2025-10-12 15:58:58'),(48,5,25,'UX writing é uma área em alta, adorei o conteúdo.','2025-10-12 15:58:58'),(49,6,26,'Ótimas dicas para otimizar o site!','2025-10-12 15:58:58'),(50,7,27,'A introdução a Big Data é muito completa.','2025-10-12 15:58:58'),(51,8,28,'A parte de criptografia foi muito útil para meu projeto.','2025-10-12 15:58:58'),(52,9,29,'Robótica e Python, uma combinação perfeita.','2025-10-12 15:58:58'),(53,10,30,'O plano sobre chatbots é super prático.','2025-10-12 15:58:58');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,1,'Introdução ao Python',1),(2,1,'Variáveis e Tipos de Dados',2),(3,1,'Controle de Fluxo',3),(4,1,'Funções e Módulos',4),(5,2,'Sintaxe Moderna (ES6+)',1),(6,2,'Funções e Promises',2),(7,2,'DOM e Eventos',3),(8,2,'APIs com Fetch e Axios',4),(9,3,'Introdução ao Numpy e Pandas',1),(10,3,'Limpeza de Dados',2),(11,3,'Visualização com Matplotlib',3),(12,3,'Introdução ao Scikit-learn',4),(13,4,'Conceitos de IA e Ética',1),(14,4,'Redes Neurais com TensorFlow',2),(15,4,'Redes Convolucionais',3),(16,4,'Implantação de Modelos',4);
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `plano_tags`
--

LOCK TABLES `plano_tags` WRITE;
/*!40000 ALTER TABLE `plano_tags` DISABLE KEYS */;
INSERT INTO `plano_tags` VALUES (1,1),(3,1),(4,1),(9,1),(14,1),(31,1),(2,2),(34,2),(3,3),(14,3),(24,3),(5,5),(6,5),(17,5),(28,5),(5,6),(9,6),(10,6),(12,6),(18,6),(21,6),(22,6),(23,6),(11,7),(11,8),(12,9),(12,10),(13,11),(13,12),(13,13),(14,15),(29,15),(32,16),(16,17),(17,19),(18,20),(18,22),(19,22),(20,23),(23,24),(23,25),(24,26),(25,27),(25,28),(26,29),(26,30),(27,31),(28,32),(29,33),(7,34),(16,34),(30,34),(31,35),(19,36),(31,36),(32,37),(33,38),(33,39),(34,40),(5,42),(5,43),(5,44),(21,44),(5,45),(6,46),(6,47),(7,48),(30,48),(8,50),(11,50),(33,50),(15,51),(10,106);
/*!40000 ALTER TABLE `plano_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `planos`
--

LOCK TABLES `planos` WRITE;
/*!40000 ALTER TABLE `planos` DISABLE KEYS */;
INSERT INTO `planos` VALUES (1,'Python para Iniciantes','Aprenda os fundamentos da linguagem Python.','imagens/plano_1.webp','2025-09-27 22:51:35',1),(2,'JavaScript Moderno','Domine ES6+, funções assíncronas e mais.','imagens/plano_2.webp','2025-09-27 22:51:35',2),(3,'Data Science com Python','Análise de dados, visualização e ML com Python.','imagens/plano_3.webp','2025-09-27 22:51:35',3),(4,'Inteligência Artificial com Python','Criação de modelos inteligentes com bibliotecas modernas.','imagens/plano_4.webp','2025-09-27 22:51:35',4),(5,'Web Development Completo (MERN Stack)','Aprenda a construir aplicações web completas, do frontend ao backend, usando as tecnologias MongoDB, Express, React e Node.js.','imagens/plano_5.webp','2025-10-12 15:15:49',5),(6,'Design de UI/UX para Iniciantes','Um guia prático para criar interfaces de usuário intuitivas e experiências incríveis, com foco em princípios de design e ferramentas como Figma.','imagens/plano_6.webp','2025-10-12 15:15:49',6),(7,'Introdução a Cibersegurança','Entenda os conceitos fundamentais de segurança digital, proteção de dados e as principais ameaças cibernéticas.','imagens/plano_7.webp','2025-10-12 15:15:49',7),(8,'Desenvolvimento iOS com Swift','Crie seus primeiros aplicativos para iPhone e iPad, dominando a linguagem de programação Swift e o framework UIKit.','imagens/plano_8.webp','2025-10-12 15:15:49',8),(9,'Backend com Python e Django','Construa APIs robustas e escaláveis usando o framework Django e a linguagem Python.','imagens/plano_9.webp','2025-10-12 15:15:49',9),(10,'Introdução ao Cloud Computing','Conceitos básicos de computação em nuvem e os serviços mais utilizados nas principais plataformas como AWS, Azure e GCP.','imagens/plano_10.webp','2025-10-12 15:15:49',10),(11,'Desenvolvimento Android com Kotlin','Crie aplicativos nativos para Android com a linguagem Kotlin, focando em boas práticas e a arquitetura do ecossistema.','imagens/plano_11.webp','2025-10-12 15:15:49',5),(12,'Aprenda a Programar em Java para Web','Guia completo para o ecossistema Java, do básico ao avançado, com foco em frameworks como Spring Boot e Java EE.','imagens/plano_12.webp','2025-10-12 15:15:49',6),(13,'Desenvolvimento de Jogos com Unity e C#','Crie jogos 2D e 3D do zero, aprendendo sobre física, animação e scripts com o motor de jogo Unity e a linguagem C#.','imagens/plano_13.webp','2025-10-12 15:15:49',7),(14,'Data Science: Análise e Visualização de Dados','Mergulhe na ciência de dados com Python, usando bibliotecas como Pandas, NumPy e Matplotlib para analisar e visualizar grandes conjuntos de dados.','imagens/plano_14.webp','2025-10-12 15:15:49',8),(15,'Introdução a Machine Learning','Aprenda os conceitos e algoritmos essenciais de aprendizado de máquina, como redes neurais, regressão e classificação.','imagens/plano_15.webp','2025-10-12 15:15:49',9),(16,'Blockchain e Criptomoedas','Entenda como funcionam as tecnologias de blockchain, smart contracts e as bases das criptomoedas como Bitcoin e Ethereum.','imagens/plano_16.webp','2025-10-12 15:15:49',10),(17,'Desenvolvimento Frontend com Vue.js','Construa interfaces de usuário modernas e reativas usando o framework Vue.js, focando em componentização e gerenciamento de estado.','imagens/plano_17.webp','2025-10-12 15:15:49',5),(18,'Arquitetura de Microserviços','Aprenda a projetar e implementar sistemas escaláveis e resilientes usando a arquitetura de microserviços com Docker e Kubernetes.','imagens/plano_18.webp','2025-10-12 15:15:49',6),(19,'DevOps e Automação de Infraestrutura','Introdução às práticas de DevOps, ferramentas como Jenkins e Ansible, e a automação de pipelines de CI/CD.','imagens/plano_19.webp','2025-10-12 15:15:49',7),(20,'Algoritmos e Estruturas de Dados','Um guia essencial para desenvolvedores. Domine os principais algoritmos e estruturas de dados para resolver problemas complexos.','imagens/plano_20.webp','2025-10-12 15:15:49',8),(21,'Backend com Node.js e Express','Crie APIs RESTful e aplicações web escaláveis usando Node.js e o framework Express.','imagens/plano_21.webp','2025-10-12 15:15:49',9),(22,'Introdução a Redes de Computadores','Entenda os fundamentos das redes de computadores, protocolos (TCP/IP), e como a internet funciona.','imagens/plano_22.webp','2025-10-12 15:15:49',10),(23,'Desenvolvimento com Ruby on Rails','Construa aplicações web de forma rápida e eficiente usando o framework Ruby on Rails.','imagens/plano_23.webp','2025-10-12 15:15:49',5),(24,'Análise de Dados com SQL','Aprenda a extrair, manipular e analisar dados em bancos de dados relacionais usando a linguagem SQL.','imagens/plano_24.webp','2025-10-12 15:15:49',6),(25,'Introdução à Realidade Virtual e Aumentada','Explore as tecnologias de VR/AR e crie experiências imersivas usando motores como Unreal Engine ou Unity.','imagens/plano_25.webp','2025-10-12 15:15:49',7),(26,'Design Gráfico para Redes Sociais','Crie artes visuais atraentes para redes sociais, dominando ferramentas como Photoshop e Illustrator e os princípios de design.','imagens/plano_26.webp','2025-10-12 15:15:49',8),(27,'UX Writing: A Arte de Escrever para Interfaces','Guia prático para redatores e designers. Aprenda a escrever textos claros, úteis e que guiam o usuário em produtos digitais.','imagens/plano_27.webp','2025-10-12 15:15:49',9),(28,'Otimização de Performance Web','Técnicas e ferramentas para tornar seu site ou aplicação web mais rápido e eficiente.','imagens/plano_28.webp','2025-10-12 15:15:49',10),(29,'Introdução ao Big Data e Hadoop','Entenda os conceitos de Big Data e como processar grandes volumes de dados usando o ecossistema Hadoop.','imagens/plano_29.webp','2025-10-12 15:15:49',5),(30,'Criptografia e Segurança de Dados','Mergulhe nos fundamentos da criptografia e aprenda a proteger informações sensíveis em aplicações e sistemas.','imagens/plano_30.webp','2025-10-12 15:15:49',6),(31,'Robótica e Automação com Python','Aprenda a programar robôs e sistemas de automação usando a linguagem Python e bibliotecas especializadas.','imagens/plano_31.webp','2025-10-12 15:15:49',7),(32,'Introdução a Chatbots e NLP','Crie seu primeiro chatbot e entenda os conceitos de Processamento de Linguagem Natural (NLP).','imagens/plano_32.webp','2025-10-12 15:15:49',8),(33,'Desenvolvimento Mobile Híbrido com Flutter','Construa aplicativos para iOS e Android com uma única base de código usando o framework Flutter e a linguagem Dart.','imagens/plano_33.webp','2025-10-12 15:15:49',9),(34,'Programação Funcional com JavaScript','Entenda os princípios da programação funcional e aplique-os para escrever código mais limpo e previsível em JavaScript.','imagens/plano_34.webp','2025-10-12 15:15:49',10);
/*!40000 ALTER TABLE `planos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `planos_andamento`
--

LOCK TABLES `planos_andamento` WRITE;
/*!40000 ALTER TABLE `planos_andamento` DISABLE KEYS */;
INSERT INTO `planos_andamento` VALUES (1,1,3,25,'2025-09-27 22:52:37'),(2,1,4,60,'2025-09-27 22:52:37'),(3,2,2,80,'2025-09-27 22:52:37'),(4,2,4,50,'2025-09-27 22:52:37'),(5,1,12,25,'2025-10-12 15:15:49'),(6,2,13,50,'2025-10-12 15:15:49'),(7,3,14,75,'2025-10-12 15:15:49'),(8,4,15,20,'2025-10-12 15:15:49'),(9,5,16,40,'2025-10-12 15:15:49'),(10,6,17,60,'2025-10-12 15:15:49'),(11,7,18,80,'2025-10-12 15:15:49'),(12,8,19,15,'2025-10-12 15:15:49'),(13,9,20,35,'2025-10-12 15:15:49'),(14,10,21,55,'2025-10-12 15:15:49'),(15,1,22,70,'2025-10-12 15:15:49'),(16,2,23,90,'2025-10-12 15:15:49'),(17,3,24,10,'2025-10-12 15:15:49'),(18,4,25,30,'2025-10-12 15:15:49'),(19,5,26,50,'2025-10-12 15:15:49'),(20,6,27,70,'2025-10-12 15:15:49'),(21,7,28,90,'2025-10-12 15:15:49'),(22,8,29,20,'2025-10-12 15:15:49'),(23,9,30,40,'2025-10-12 15:15:49');
/*!40000 ALTER TABLE `planos_andamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `planos_criados`
--

LOCK TABLES `planos_criados` WRITE;
/*!40000 ALTER TABLE `planos_criados` DISABLE KEYS */;
INSERT INTO `planos_criados` VALUES (1,1,'Plano de Estudos Front-end','Estudar HTML, CSS, JS e React nos próximos 30 dias.','2025-09-27 22:52:43'),(2,1,'Backend Intensivo','Foco em Python, Flask e MySQL em 4 semanas.','2025-09-27 22:52:43'),(3,2,'Plano de Revisão para Certificação','Revisar todos os tópicos de segurança da informação.','2025-09-27 22:52:43'),(4,2,'Estudos para vaga de Desenvolvedor Júnior','Praticar lógica, algoritmos e projetos práticos.','2025-09-27 22:52:43'),(5,1,'Introdução ao Vue.js','Plano para aprender Vue.js, do básico ao avançado.','2025-10-12 15:21:01'),(6,2,'Guia de Testes Automatizados','Como criar testes unitários e de integração.','2025-10-12 15:21:01'),(7,3,'Fundamentos de C#','Guia completo para começar a programar em C#.','2025-10-12 15:21:01'),(8,4,'Otimização de Bancos de Dados','Técnicas para melhorar a performance de queries SQL.','2025-10-12 15:21:01'),(9,5,'Guia de Python para Finanças','Análise de dados financeiros com Python.','2025-10-12 15:21:01'),(10,6,'Introdução ao Flutter','Plano para criar apps mobile com Flutter.','2025-10-12 15:21:01'),(11,7,'DevOps com AWS','Como usar a AWS para CI/CD.','2025-10-12 15:21:01'),(12,8,'Kubernetes para Iniciantes','Guia para entender e usar Kubernetes.','2025-10-12 15:21:01'),(13,9,'Web Scrapping com Python','Como extrair dados de sites com Python.','2025-10-12 15:21:01'),(14,10,'Introdução à Inteligência Artificial','Conceitos e aplicações de IA.','2025-10-12 15:21:01');
/*!40000 ALTER TABLE `planos_criados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `planos_salvos`
--

LOCK TABLES `planos_salvos` WRITE;
/*!40000 ALTER TABLE `planos_salvos` DISABLE KEYS */;
INSERT INTO `planos_salvos` VALUES (1,1,1,'2025-09-27 22:52:30'),(2,1,2,'2025-09-27 22:52:30'),(3,2,1,'2025-09-27 22:52:30'),(4,2,3,'2025-09-27 22:52:30'),(5,1,11,'2025-10-12 15:15:49'),(6,2,12,'2025-10-12 15:15:49'),(7,3,13,'2025-10-12 15:15:49'),(8,4,14,'2025-10-12 15:15:49'),(9,5,15,'2025-10-12 15:15:49'),(10,6,16,'2025-10-12 15:15:49'),(11,7,17,'2025-10-12 15:15:49'),(12,8,18,'2025-10-12 15:15:49'),(13,9,19,'2025-10-12 15:15:49'),(14,10,20,'2025-10-12 15:15:49'),(15,1,21,'2025-10-12 15:15:49'),(16,2,22,'2025-10-12 15:15:49'),(17,3,23,'2025-10-12 15:15:49'),(18,4,24,'2025-10-12 15:15:49'),(19,5,25,'2025-10-12 15:15:49'),(20,6,26,'2025-10-12 15:15:49'),(21,7,27,'2025-10-12 15:15:49'),(22,8,28,'2025-10-12 15:15:49'),(23,9,29,'2025-10-12 15:15:49'),(24,10,30,'2025-10-12 15:15:49');
/*!40000 ALTER TABLE `planos_salvos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Python'),(2,'JavaScript'),(3,'Data Science'),(5,'Frontend'),(6,'Backend'),(7,'Android'),(8,'Kotlin'),(9,'Java'),(10,'Spring Boot'),(11,'Desenvolvimento de Jogos'),(12,'Unity'),(13,'C#'),(15,'Big Data'),(16,'NLP'),(17,'Blockchain'),(19,'Vue.js'),(20,'Docker'),(22,'DevOps'),(23,'Algoritmos'),(24,'Ruby'),(25,'Rails'),(26,'SQL'),(27,'Realidade Virtual'),(28,'Realidade Aumentada'),(29,'Photoshop'),(30,'Ilustrator'),(31,'UX Writing'),(32,'Performance'),(33,'Hadoop'),(34,'Criptografia'),(35,'Robótica'),(36,'Automação'),(37,'Chatbots'),(38,'Flutter'),(39,'Dart'),(40,'Programação Funcional'),(42,'MERN'),(43,'React'),(44,'Node.js'),(45,'MongoDB'),(46,'UI/UX'),(47,'Figma'),(48,'Segurança da Informação'),(50,'Mobile'),(51,'IA'),(106,'Cloud Computing');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Tech_Guru','techguru@example.com','https://example.com/avatars/techguru.png','2025-09-27 22:51:20'),(2,'JSNinja','jsninja@example.com','https://example.com/avatars/jsninja.png','2025-09-27 22:51:20'),(3,'DataLover','data@example.com','https://example.com/avatars/datalover.png','2025-09-27 22:51:20'),(4,'AI_Master','ai@example.com','https://example.com/avatars/aimaster.png','2025-09-27 22:51:20'),(5,'Tech_Explorer','techexplorer@example.com','https://example.com/avatars/explorer.png','2025-10-12 15:15:48'),(6,'Code_Wizard','codewizard@example.com','https://example.com/avatars/wizard.png','2025-10-12 15:15:48'),(7,'Mobile_Architect','mobilearch@example.com','https://example.com/avatars/mobilearch.png','2025-10-12 15:15:48'),(8,'Game_Dev_Enthusiast','gamedev@example.com','https://example.com/avatars/gamedev.png','2025-10-12 15:15:48'),(9,'Data_Scientist_Pro','datascientist@example.com','https://example.com/avatars/datasci.png','2025-10-12 15:15:48'),(10,'Cloud_Architect_Pro','cloudpro@example.com','https://example.com/avatars/cloudpro.png','2025-10-12 15:15:48'),(11,'Frontend_Architect','frontendarch@example.com','https://example.com/avatars/frontendarch.png','2025-10-12 15:15:48'),(12,'Cyber_Analyst','cyberanalyst@example.com','https://example.com/avatars/cyberanalyst.png','2025-10-12 15:15:48'),(13,'IoT_Innovator','iotinnovator@example.com','https://example.com/avatars/iot.png','2025-10-12 15:15:48'),(14,'AI_Engineer','aiengineer@example.com','https://example.com/avatars/ai.png','2025-10-12 15:15:48'),(15,'ML_Expert','mlexpert@example.com','https://example.com/avatars/ml.png','2025-10-12 15:15:48'),(16,'Blockchain_Developer','blockchaindev@example.com','https://example.com/avatars/blockchain.png','2025-10-12 15:15:48'),(17,'DevOps_Specialist','devopsspec@example.com','https://example.com/avatars/devops.png','2025-10-12 15:15:48'),(18,'Fullstack_Master','fullstackmaster@example.com','https://example.com/avatars/fullstackmaster.png','2025-10-12 15:15:48'),(19,'Cientista_de_Dados','cientistadedados@example.com','https://example.com/avatars/cd.png','2025-10-12 15:15:48'),(20,'Engenheiro_de_Software','engenheirosoftware@example.com','https://example.com/avatars/es.png','2025-10-12 15:15:48'),(21,'Arquiteto_de_Sistemas','arquitetosistemas@example.com','https://example.com/avatars/as.png','2025-10-12 15:15:48'),(22,'Especialista_em_Nuvem','especialistanuvem@example.com','https://example.com/avatars/en.png','2025-10-12 15:15:48');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-30 23:10:07
