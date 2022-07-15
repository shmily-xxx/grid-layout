const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    open: false,
    proxy: null,
    // proxy: { //Ŀ���ǽ�����������Ի�������Ҫ��������Ҫ���и�����
    //   '/api': { // ������ /api ��ͷ��url�ӿ�
    //     target: 'https://api.taobao.cn/', //Ŀ��ӿ�����
    //     changeOrigin: true, //�Ƿ����
    //     ws: true, //���Ҫ���� websockets�������������
    //     secure: false, // �����https�ӿڣ���Ҫ�����������
    //     pathRewrite: { // ��ʶ�滻
    //       '^/api': ''   //��д�ӿ� ��̨�ӿ�ָ��ͳһ  ����ָ������/
    //     }
    //   }
    // }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'src': '@',
        'assets': '@/assets',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
      }
    }
  }
});
