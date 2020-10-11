-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema structure
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema structure
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `structure` DEFAULT CHARACTER SET utf8 ;
USE `structure` ;

-- -----------------------------------------------------
-- Table `structure`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `structure`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NULL,
  `direccion` VARCHAR(45) NULL,
  `contrasenia` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `structure`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `structure`.`categorias` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `structure`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `structure`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  `id_categoria` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` INT NOT NULL,
  `descuento` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `id_categoria_idx` (`id_categoria` ASC),
  CONSTRAINT `id_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `structure`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `structure`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `structure`.`compras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_producto` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario_idx` (`id_usuario` ASC),
  INDEX `id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `structure`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `structure`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
