// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import { Api as AA, Url } from '@/assets/js/api.js';
import Axios from 'axios';
import './assets/css/common.styl';

// 引入公共组件
import { Switch, MessageBox, Popup, Button, Radio, Toast } from 'mint-ui';
let Api = AA;
// 注册公共组件
Vue.component(Switch.name, Switch);
Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.component(Radio.name, Radio);
Vue.component(Toast.name, Toast);

Vue.config.productionTip = false;

//paraName 等找参数的名称
function GetUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  }
  else {
    return "";
  }
}


// html根节点，基础字体自适应
(() => {
  var docEl = document.documentElement;
  var resizeEvt = 'orientationchange' in window
    ? 'orientationchange'
    : 'resize';
  var recalc = function recalc() {
    var clientWidth = docEl.clientWidth
    if (clientWidth > 750) {
      docEl.style.fontSize = 40 + 'px';
      return;
    };
    
    if (clientWidth < 375) {
      docEl.style.fontSize = 10 + 'px';
      return;
    };
    docEl.style.fontSize = 10* clientWidth / 375 + 'px';
  };

  recalc();
  window.addEventListener(resizeEvt, recalc, false);
})()
Date.prototype.format=function(fmt) {         
  var o = {         
  "M+" : this.getMonth()+1, //月份         
  "d+" : this.getDate(), //日         
  "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
  "H+" : this.getHours(), //小时         
  "m+" : this.getMinutes(), //分         
  "s+" : this.getSeconds(), //秒         
  "q+" : Math.floor((this.getMonth()+3)/3), //季度         
  "S" : this.getMilliseconds() //毫秒         
  };         
  var week = {         
  "0" : "星期日",         
  "1" : "星期一",         
  "2" : "星期二",         
  "3" : "星期三",         
  "4" : "星期四",         
  "5" : "星期五",         
  "6" : "星期六"       
  };         
  if(/(y+)/.test(fmt)){         
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
  }         
  if(/(E+)/.test(fmt)){         
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
  }         
  for(var k in o){         
      if(new RegExp("("+ k +")").test(fmt)){         
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
      }         
  }         
  return fmt;         
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
