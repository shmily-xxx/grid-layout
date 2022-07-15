// let locale = localStorage.getItem("language") || "zh-CN";
// let tempLanguage = require(`./language/${locale}.js`).default;
import Vue from 'vue'
import VueI18n from "vue-i18n";

let langFiles = require.context("./language", false, /.js$/);
let langExp = /\.\/([^./]+)\.([^.]+)$/;

let messages = {};
langFiles.keys().forEach(key => {
  let prop = langExp.exec(key)[1]; //正则匹配en|zh这样的值
  messages[prop] = langFiles(key).default
});
Vue.use(VueI18n);

let locale = localStorage.getItem("language") || "zh-CN";

const i18n = new VueI18n({
  locale,
  messages,
});
export default i18n;
