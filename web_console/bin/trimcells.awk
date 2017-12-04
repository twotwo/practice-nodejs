BEGIN{FS="\\\\x02";OFS="\\x02"}
{
if(Col=="all") print $46, $1, $6, $3, $4, $5, $8, $9, $10, $7, $14, $17, $18, $19, $15, $16, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,  $31, $32, $33, $34, $47, $36
else
	if(Col=="c17") print $46, $1, $3, $4, $5, $8, $9, $10, $7, $14, $20, $28, $31, $32, $33, $34, $47
	else
		if(Col=="c10") print $46, $1, $3, $4, $8, $20, $28, $33, $34, $47
		# default c17
		else print $46, $1, $3, $4, $5, $8, $9, $10, $7, $14, $20, $28, $31, $32, $33, $34, $47
}

############### colunms all
# u'EventID'46 ,u'ReceiveTime'1, u'logtime'6, u'AppID'3, u'UID'4, u'SDK Ver'5, u'ChannelID'8, u'Game Ver'9, u'OS'10, 
# u'IPAddr'7, u'MacAddr'14, u'DTN'17, u'BrandName'18, u'Serial'19, u'IMEI'15, u'IMSI'16,  u'DevID'20, 
# u'IDFA', u'IDFV', 'Screen', u'Lang', u'GPS', u'Net', 'Machine', 21~27
# u'AccountID'28, u'AccountName'29, u'AccountType'30, u'ServerID'31, u'RoleLevel'32, u'RoleID'33, u'RoleName'34,
# u'IMEI'15, u'IDFA'21, u'EventValue'47,  Test36, DataSource37~40, Reserved41~45, //, $37 $38 $39 $40, $41 $42 $43 $44 $45

############### colunms 17
# u'EventID'46 ,u'ReceiveTime'1, u'AppID'3, u'UID'4, u'SDK Ver'5, u'ChannelID'8, u'Game Ver'9, u'OS'10, 
# u'IPAddr'7, u'MacAddr'14, u'DevID'20, u'AccountID'28, u'ServerID'31, u'RoleLevel'32, u'RoleID'33, u'RoleName'34,
# u'IMEI'15, u'IDFA'21, u'EventValue'47
# 47 event value
#{"type":"CNY","vcAmount":"6","cAmount":"6","payChannel":"","iapId":"204","orderId":"115d8f15-1207-49cf-9368-cd65027edbf8","vcType":"元宝"}

############### colunms 10
# u'EventID'46 ,u'ReceiveTime'1, u'AppID'3, u'UID'4, u'ChannelID'8, u'DevID'20, u'AccountID'28, u'RoleID'33, u'RoleName'34,
# u'EventValue'47

# tail -n100 ~/app/python/web/web.py/2016-07-27.log |awk -v Col="all" -f trimcells.awk