const Env = 'test' // test : 测试环境;  prod : 生产环境;
let url = '';
if (Env == 'test') {
  // url = 'http://ydttkh.cn';
} else {
  url = '';
}

const Api = {


}

module.exports = {
  Api: Api,
  Url: url
};
