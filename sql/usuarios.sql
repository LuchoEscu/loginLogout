DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `clave` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
COMMIT;

-- insert

INSERT INTO `usuarios` (`id`, `usuario`, `clave`) VALUES (NULL, 'Admin', MD5('1234'));