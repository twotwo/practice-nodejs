CREATE TABLE `t_project_user_signin_log` (
  `username` varchar(100) DEFAULT NULL COMMENT '用户名称',
  `signin_time` int(10) DEFAULT 0 COMMENT '签到的时间',
  `score` int(5) DEFAULT 0 COMMENT '获取的积分',
  PRIMARY KEY (`username`, `signin_time`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;