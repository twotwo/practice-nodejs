CREATE TABLE `t_project_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(100) DEFAULT NULL COMMENT '用户名称',
  `password` varchar(16) DEFAULT NULL COMMENT '用户密码 最长16位',
  `email` varchar(100) DEFAULT NULL COMMENT '用户邮箱',
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`) ,
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;