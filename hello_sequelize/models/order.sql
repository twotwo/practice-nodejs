CREATE TABLE `t_project_order` (
  `t_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `t_uid` varchar(64) NOT NULL COMMENT '买家id',
  `t_goodid_fk` bigint(12) NOT NULL COMMENT '货物id',
  `t_status` smallint(2) NOT NULL COMMENT '订单状态', 
  `t_createtime` datetime NOT NULL COMMENT '订单创建时间',
  `t_paytime` datetime DEFAULT NULL COMMENT '订单付款时间',
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='订单表'