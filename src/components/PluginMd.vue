<template>
  <div class="plugin-md">
    <div class="context" v-highlightjs v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { marked } from 'marked';
import CodeCopy from './CodeCopy';
export default {
  name: 'PluginMd',
  props: {
    msg: String,
    content: {
      type: String,
    },
  },
  // components: { page },
  data() {
    return {
      value: '',
      // content,
      context:
        '##### 前置条件\n' +
        '· cloudeasy-agent已安装并正常运行  \n' +
        '· dd-agent插件已安装并正常运行\n' +
        '###### 1.为您的Mysql添加CloudEasyAgent访问用户：\n' +
        '```bash\n' +
        "mysql>CREATE USER 'cloudeasy'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';\n" +
        'Query OK, 0 rows affected (0.00 sec)\n' +
        '```\n' +
        '> ###### 请使用自己的密码替换上述命令中的\\<UNIQUEPASSWORD>\n' +
        '###### 针对Mysql 8.0及以上版本，通过native password方式添加用户：\n' +
        '```bash \n' +
        "mysql> CREATE USER 'cloudeasy'@'localhost' IDENTIFIED WITH mysql_native_password by '<UNIQUEPASSWORD>';\n" +
        'Query OK, 0 rows affected (0.00 sec)\n' +
        '```\n' +
        '###### 2.验证用户是否添加成功（请使用自己的密码替换命令中的\\<UNIQUEPASSWORD>）：\n' +
        '```bash \n' +
        'mysql -u cloudeasy --password=<UNIQUEPASSWORD> -e "show status" | \\ \n' +
        'grep Uptime && echo -e "\\033[0;32mMySQL user - OK\\033[0m" || \\ \n' +
        'echo -e "\\033[0;31mCannot connect to MySQL\\033[0m"\n' +
        '```\n' +
        '```bash \n' +
        'mysql -u cloudeasy --password=<UNIQUEPASSWORD> -e "show slave status" && \\\n' +
        'echo -e "\\033[0;32mMySQL grant - OK\\033[0m" || \\\n' +
        'echo -e "\\033[0;31mMissing REPLICATION CLIENT grant\\033[0m"\n' +
        '```\n' +
        '###### 3.为用户添加权限：\n' +
        '```bash \n' +
        "mysql> GRANT REPLICATION CLIENT ON *.* TO 'cloudeasy'@'localhost' WITH MAX_USER_CONNECTIONS 5;\n" +
        'Query OK, 0 rows affected, 1 warning (0.00 sec)\n' +
        '```\n' +
        '```bash \n' +
        "mysql> GRANT PROCESS ON *.* TO 'cloudeasy'@'localhost';\n" +
        'Query OK, 0 rows affected (0.00 sec)\n' +
        '```\n' +
        '```bash\n' +
        "mysql> GRANT SELECT ON performance_schema.* TO 'cloudeasy'@'localhost';\n" +
        'Query OK, 0 rows affected (0.00 sec)\n' +
        '```\n' +
        '针对Mysql 8.0及以上版本，通过如下方式设置max_user_connections：\n' +
        '```bash\n' +
        "mysql> ALTER USER 'cloudeasy'@'localhost' WITH MAX_USER_CONNECTIONS 5;\n" +
        'Query OK, 0 rows affected (0.00 sec)\n' +
        '```\n' +
        '##### 配置并重启dd-agent\n' +
        '\n' +
        '###### 1.修改dd-agent配置文件\n' +
        '```bash\n' +
        'vi /etc/datadog-agent/conf.d/mysql.d/conf.yaml\n' +
        '```\n' +
        'conf.yaml文件内容如下\n' +
        '```bash\n' +
        'init_config:\n' +
        '\n' +
        'instances:\n' +
        ' \\- server: 127.0.0.1\n' +
        '  user: cloudeasy\n' +
        '  pass: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier\n' +
        '  port: "<YOUR_MYSQL_PORT>" # e.g. 3306\n' +
        '  options:\n' +
        '   replication: false\n' +
        '   galera_cluster: true\n' +
        '   extra_status_metrics: true\n' +
        '   extra_innodb_metrics: true\n' +
        '   extra_performance_metrics: true\n' +
        '   schema_size_metrics: false\n' +
        '   disable_innodb_metrics: false\n' +
        '  tags:\n' +
        '   \\- resourceTagName:mymysql\n' +
        '```\n' +
        '> 其中：tags中的resourceTagName是mysql的名称，您可以自定义命名。\n' +
        '###### 2.重启dd-agent\n' +
        '  ．Centos/RedHat 7及以上版本：\n' +
        '```bash\n' +
        '  sudo systemctl restart datadog-agent\n' +
        '```\n' +
        '   ．Centos/RedHat 6：\n' +
        '```bash\n' +
        '  sudo initctl restart datadog-agent\n' +
        '```',
      // context:
      //   "##### 前置条件\n · cloudeasy-agent已安装并正常运行</br> · dd-agent插件已安装并正常运行\n##### 配置Mysql\n###### 1.为您的Mysql添加CloudEasyAgent访问用户：\n```bash\nmysql> CREATE USER 'cloudeasy'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';\nQuery OK, 0 rows affected (0.00 sec)\n```\n 请使用自己的密码替换上述命令中的<UNIQUEPASSWORD>\n 针对Mysql 8.0及以上版本，通过native password方式添加用户：",
    };
  },
  computed: {
    compiledMarkdown() {
      return marked.parse(this.context);
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      setTimeout(() => {
        document.querySelectorAll('pre').forEach((el) => {
          if (el.classList.contains('code-copy-added')) return;
          let ComponentClass = Vue.extend(CodeCopy);
          let instance = new ComponentClass();
          instance.code = el.innerText;
          instance.parent = el;
          /* 手动挂载 */
          instance.$mount();
          el.classList.add('code-copy-added');
          el.appendChild(instance.$el);
        });
      }, 100);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.plugin-md h5 {
  margin-top: 19px;
  margin-bottom: 19px;
}
.plugin-md h6 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.plugin-md p {
  display: block;
  margin-top: 14px;
  margin-bottom: 14px;
}
.plugin-md .hljs {
  background-color: #f4f7fc;
  font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
  font-style: normal;
  color: #6d7383;
  line-height: 16px;
  font-size: 12px;
  padding: 12px;
}
/* .plugin-md .hljs-string,
.hljs-built_in,
.hljs-symbol,
.hljs-literal {
  color: #6d7383 !important;
}
.plugin-md .hljs-comment {
  font-style: normal;
}
.plugin-md h6 {
  margin: 10px 0;
}
.plugin-md h5 {
  margin: 10px 0;
}
.plugin-md p {
  font-size: 12px;
  line-height: 18px;
}
/* .plugin-md pre{
  margin-left: 10px;
} */
.plugin-md blockquote {
  margin: 0 0 16px 10px;
  padding-left: 10px;
  border-left: 0.24em solid #6d7383;
}
.code-copy-added {
  color: white;
  margin: 10px 0;
  text-align: left;
  border-radius: 3px;
  position: relative;
}
.code-copy-added:hover .copy-btn {
  opacity: 1;
}

/* .plugin-md .markdown-body .highlight pre,
.markdown-body pre {
  background-color: #f6f8fa;
}
.plugin-md .markdown-body a {
  display: none;
} */
</style>
