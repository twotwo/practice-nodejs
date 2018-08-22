CREATE TABLE `t_project_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(100) DEFAULT NULL COMMENT '用户名称',
  `password` varchar(16) DEFAULT NULL COMMENT '用户密码 最长16位',
  `email` varchar(100) DEFAULT NULL COMMENT '用户邮箱',
  `signin_time` int(10) DEFAULT 0 COMMENT '用户最新签到时间',
  `score` int(5) DEFAULT 0 COMMENT '用户总积分',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`) ,
  UNIQUE KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `t_project_user` (username, password, email) VALUES ('张三','pass','张三@m.com'),('李四','pass','李四@m.com'),('王二','pass','王二@m.com'),('陈武','pass','陈武@m.com');
