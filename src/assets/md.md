##### 前置条件
· cloudeasy-agent已安装并正常运行  
· dd-agent插件已安装并正常运行
###### 1.为您的Mysql添加CloudEasyAgent访问用户：

```bash
mysql>CREATE USER 'cloudeasy'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```
> ###### 请使用自己的密码替换上述命令中的\<UNIQUEPASSWORD>
###### 针对Mysql 8.0及以上版本，通过native password方式添加用户：
```bash 
mysql> CREATE USER 'cloudeasy'@'localhost' IDENTIFIED WITH mysql_native_password by '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```
###### 2.验证用户是否添加成功（请使用自己的密码替换命令中的\<UNIQUEPASSWORD>）：
```bash 
mysql -u cloudeasy --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```bash 
mysql -u cloudeasy --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```
###### 3.为用户添加权限：
```bash 
mysql> GRANT REPLICATION CLIENT ON *.* TO 'cloudeasy'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```
```bash 
mysql> GRANT PROCESS ON *.* TO 'cloudeasy'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```
```bash 
mysql> GRANT SELECT ON performance_schema.* TO 'cloudeasy'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```
针对Mysql 8.0及以上版本，通过如下方式设置max_user_connections：
```bash
mysql> ALTER USER 'cloudeasy'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```
##### 配置并重启dd-agent

###### 1.修改dd-agent配置文件
```bash
vi /etc/datadog-agent/conf.d/mysql.d/conf.yaml
```
conf.yaml文件内容如下
```bash
init_config:

instances:
 \- server: 127.0.0.1
  user: cloudeasy
  pass: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
  port: "<YOUR_MYSQL_PORT>" # e.g. 3306
  options:
   replication: false
   galera_cluster: true
   extra_status_metrics: true
   extra_innodb_metrics: true
   extra_performance_metrics: true
   schema_size_metrics: false
   disable_innodb_metrics: false
  tags:
   \- resourceTagName:mymysql
```
> 其中：tags中的resourceTagName是mysql的名称，您可以自定义命名。
###### 2.重启dd-agent
  ．Centos/RedHat 7及以上版本：
```bash
  sudo systemctl restart datadog-agent
```
   ．Centos/RedHat 6：
```bash
  sudo initctl restart datadog-agent
```