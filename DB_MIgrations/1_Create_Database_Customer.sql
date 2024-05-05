USE [master]
GO

/****** Object:  Database [customer]    Script Date: 6/05/2024 12:44:58 AM ******/
DROP DATABASE [customer]
GO

CREATE DATABASE [customer]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'customer', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\customer.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'customer_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\customer_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO