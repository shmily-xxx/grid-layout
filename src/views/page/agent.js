
/* **********************************************************监控Agent菜单数据********************** */
// 监控Agent列表页列表数据
export const agentList = [
  {
    logo: require('assets/monitor/centOs.png'),
    desc: 'centOS',
    dialogTem: 'centOS'
  },
  {
    logo: require('assets/monitor/redhat.png'),
    desc: 'redhat',
    dialogTem: 'redhat'
  }
];
/* **********************************************************监控插件菜单数据********************** */
// 监控插件列表页数据
export const pluginList = [
  {
    logo: require('assets/monitor/huawei.png'), // logo图片
    desc: '华为云', // 列表页卡片底部展示的文字
    dialogTem: 'huawei', // 弹框模板名字
    dialogTitle: '华为云监控数据采集插件', // 弹框标题
    type: 'publicCloud' // 类型
  },
  {
    logo: require('assets/monitor/ali.png'), // logo图片
    desc: '阿里云', // 列表页卡片底部展示的文字
    dialogTem: 'ali', // 弹框模板名字
    dialogTitle: '阿里云监控数据采集插件', // 弹框标题
    type: 'publicCloud' // 类型
  },
  {
    logo: require('assets/monitor/tenxun.png'), // logo图片
    desc: '腾讯云', // 列表页卡片底部展示的文字
    dialogTem: 'tenxun', // 弹框模板名字
    dialogTitle: '腾讯云监控数据采集插件', // 弹框标题
    type: 'publicCloud' // 类型
  },
  {
    // logo: require('assets/monitor/fusionsphere.png'),
    logo: require('assets/monitor/fusionsphere.png'),
    desc: 'HCS 8.0',
    dialogTem: 'fusionSphere',
    dialogTitle: 'HCS 8.0监控数据采集插件',
    resourceTypeCode: 'SWR-MWS-fusionSphere-Agent',
    type: 'privateCloud'
  },
  {
    logo: require('assets/monitor/vmware-plugin.png'),
    desc: 'VMware',
    dialogTem: 'VMware',
    dialogTitle: 'VMware监控数据采集插件',
    resourceTypeCode: 'SWR-MWS-VMware-Agent',
    type: 'privateCloud'
  },
  {
    logo: require('assets/monitor/mysql-plugin.png'),
    desc: 'MySQL',
    dialogTem: 'mysql',
    dialogTitle: 'MySQL插件',
    resourceTypeCode: 'SWR-DB-MYSQL',
    type: 'database'
  },
  {
    logo: require('assets/monitor/redis-plugin.png'),
    desc: 'redis',
    dialogTem: 'redis',
    dialogTitle: 'redis插件',
    resourceTypeCode: 'SWR-DB-REDIS',
    type: 'database'
  },
  {
    logo: require('assets/monitor/memcached-plugin.png'),
    desc: 'Memcached',
    dialogTem: 'memcached',
    dialogTitle: 'Memcached插件',
    resourceTypeCode: 'SWR-DB-MEMCACHED',
    type: 'database'
  },
  {
    logo: require('assets/monitor/mongodb-plugin.png'),
    desc: 'mongoDB',
    dialogTem: 'mongodb',
    dialogTitle: 'mongoDB插件',
    resourceTypeCode: 'SWR-DB-MONGODB',
    type: 'database'
  },
  {
    logo: require('assets/monitor/oracle-plugin.png'),
    desc: 'ORACLE',
    dialogTem: 'oracle',
    dialogTitle: 'ORACLE插件',
    resourceTypeCode: 'SWR-DB-ORACLE',
    type: 'database'
  },
  {
    logo: require('assets/monitor/PostgreSQL.png'),
    desc: 'PostgreSQL',
    dialogTem: 'postgres',
    dialogTitle: 'PostgreSQL插件',
    resourceTypeCode: 'SWR-DB-POSTGRESQL',
    type: 'database'
  },
  {
    logo: require('assets/monitor/Elasticsearch.png'),
    desc: 'ElasticSearch',
    dialogTem: 'elasticSearch',
    dialogTitle: 'ElasticSearch插件',
    resourceTypeCode: 'SWR-MD-ELASTICSEARCH',
    type: 'middleware'
  },
  {
    logo: require('assets/monitor/nginx-plugin.png'),
    desc: 'NGINX',
    dialogTem: 'nginx',
    dialogTitle: 'NGINX插件',
    resourceTypeCode: 'SWR-MD-NGINX',
    type: 'middleware'
  },

  {
    logo: require('assets/monitor/Haproxy.png'),
    desc: 'HAProxy',
    dialogTem: 'haproxy',
    dialogTitle: 'HAProxy插件',
    resourceTypeCode: 'SWR-MD-HAPROXY',
    type: 'middleware'
  },
  {
    logo: require('assets/monitor/tomcat-plugin.png'),
    desc: 'TOMCAT',
    dialogTem: 'tomcat',
    dialogTitle: 'TOMCAT插件',
    resourceTypeCode: 'SWR-MD-TOMCAT',
    type: 'middleware'
  },
  {
    logo: require('assets/monitor/kafka-plugin.png'),
    desc: 'kafka',
    dialogTem: 'kafka',
    dialogTitle: 'kafka插件',
    resourceTypeCode: 'SWR-MD-KAFKA',
    type: 'middleware'
  },
  {
    logo: require('assets/monitor/RabbitMQ-plugin.png'),
    desc: 'RabbitMQ',
    dialogTem: 'rabbitmq',
    dialogTitle: 'RabbitMQ插件',
    resourceTypeCode: 'SWR-MD-RABBITMQ',
    type: 'middleware'
  },
  {
    logo: require('assets/monitor/http.png'),
    desc: 'HTTP接口',
    dialogTem: 'httpcheck',
    dialogTitle: 'HTTP接口插件',
    resourceTypeCode: 'SWR-APP-HTTP',
    type: 'thirdPartyPlatform'
  },
  {
    logo: require('assets/monitor/tcp.png'),
    desc: 'TCP端口',
    dialogTem: 'tcpcheck',
    dialogTitle: 'TCP端口插件',
    resourceTypeCode: 'SWR-APP-TCP',
    type: 'thirdPartyPlatform'
  },
  {
    logo: require('assets/monitor/eSight.png'),
    desc: 'eSight',
    dialogTem: 'eSight',
    dialogTitle: 'eSight监控数据采集插件',
    resourceTypeCode: 'SWR-MWS-eSight-Agent',
    type: 'thirdPartyPlatform'
  }

];
// export const metricColumns = [
//   {
//     prop: 'alias',
//     label: i18n.tc('monitor.targetName'),
//     'min-width': 1
//   },
//   {
//     prop: 'unit',
//     label: i18n.tc('monitor.unit'),
//     'min-width': 1
//   },
//   {
//     prop: 'descEn',
//     label: i18n.tc('monitor.description'),
//     cusColumn: true,
//     'min-width': 3
//   }
// ];
// export const pluginTypes = [
//   {
//     label: i18n.tc('monitor.allPlugins'),
//     value: ''
//   },
//   {
//     label: i18n.tc('monitor.middleware'),
//     value: 'middleware'
//   },
//   {
//     label: i18n.tc('monitor.database'),
//     value: 'database'
//   },
//   {
//     label: i18n.tc('monitor.publicCloud'),
//     value: 'publicCloud'
//   },
//   {
//     label: i18n.tc('monitor.privateCloud'),
//     value: 'privateCloud'
//   },
//   {
//     label: i18n.tc('monitor.thirdPartyPlatform'),
//     value: 'thirdPartyPlatform'
//   }
// ];

