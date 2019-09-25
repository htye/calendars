<template>
  <div id="app" @touchstart="touchstart">
   
    
    <keep-alive>
      <router-view class="router_view" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view class="router_view" v-if="!$route.meta.keepAlive"/>
    <div v-if="dilogShow==true" class="popup_warp">
        <div class="top">
          <p class="title">新建事件</p>
          <p @click="closeDilog()" class="delete_warp">
            <img :src="del1" >
          </p>
          <!-- <p class="del_warp">
            <img :src="del" >
          </p> -->
        </div>
        <div class="popup_content ">
          <div class="popup_item">
            <input type="text" placeholder="接下来，你有什么安排？" class="popup_input">
          </div>
          <div class="popup_item">
            <p class="popup_item">
              <em class="lable">开始：</em>
              <input type="text" placeholder="接下来，你有什么安排？" class="date_input popup_input ">
            </p>
          </div>
          <div class="popup_item">
            <p class="popup_item">
              <em class="lable">结束：</em>
              <input type="text" placeholder="接下来，你有什么安排？" class="date_input popup_input ">
            </p>
          </div>
          <div class="popup_item">
            <div class="popup_item">
              <em class="lable"></em>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <p class="lable_text">全天</p>
              </div>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <p class="lable_text">结束时间</p>
              </div>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <p class="lable_text">农历</p>
              </div>
            </div>
          </div>
          <div class="popup_item">
            <div class="popup_item">
              <em class="lable">重复：</em>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <p class="lable_text">设置重复事件</p>
              </div>
            </div>
          </div>
          <div class="popup_item">
            <div class="popup_item">
              <em class="lable">提醒：</em>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <select name="warnTime" id="warnTime">
                  <option value="1">不提醒</option>
                  <option value="2">前一天</option>
                  <option value="3">同一天</option>
                  <option value="4">指定时间</option>
                </select>
              </div>
            </div>
          </div>
          <div class="popup_item">
            <div class="popup_item">
              <em class="lable">重复：</em>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <p class="lable_text">设置重复事件</p>
              </div>
            </div>
          </div>
          <div class="popup_item">
            <p class="popup_item">
              <em class="lable">地址：</em>
              <input type="text"  class="address_input popup_input ">
            </p>
          </div>
          <div class="popup_item">
            <p class="popup_item">
              <em class="lable">备注：</em>
              <textarea type="text"  class="others_input popup_input "></textarea>
            </p>
          </div>
        </div>
        <div class="footer">
          <div class="redact">完整编辑...</div>
          <div>
            <p class="sure">确定</p>
            <p class="cancel">取消</p>
          </div>
        </div>
    </div>
    <div v-if="showAll==true" class="popup_warp">
        <div class="top">
          <p class="title">新建事件</p>
          <p @click="closeDilog()" class="delete_warp">
            <img :src="del1" >
          </p>
          <!-- <p class="del_warp">
            <img :src="del" >
          </p> -->
        </div>
        <div class="popup_content ">
          <div class="popup_item">
            <input type="text" placeholder="接下来，你有什么安排？" class="popup_input">
          </div>
          <div class="popup_item">
            <p class="popup_item">
              <em class="lable">事件：</em>
              <em>2019年9月10日 星期二</em>
            </p>
          </div>
          <div class="popup_item">
            <div class="popup_item">
              <em class="lable">提醒：</em>
              <div class="check-item">
                <p class="check-box">
                  <img class="gou" :src="gou">
                </p>
                <select name="warnTime" id="warnTime">
                  <option value="1">不提醒</option>
                  <option value="2">前一天</option>
                  <option value="3">同一天</option>
                  <option value="4">指定时间</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="redact">完整编辑...</div>
          <div>
            <p class="sure">确定</p>
            <p class="cancel">取消</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
const add = require("@/assets/images/add.png");
const phone = require("@/assets/images/phone.png");
const set = require("@/assets/images/set.png");
const right = require("@/assets/images/right.png");
const left = require("@/assets/images/left.png");
const del = require("@/assets/images/del-icon1.png");
const del1 = require("@/assets/images/del-icon2.png");
const gou = require("@/assets/images/gou_ico.png");
export default {
  name: "App",
  data() {
    return {
    popupVisible:true, 
    set:set,
    add:add,
    phone:phone,
    left:left,
    right:right,
    del:del,
    del1:del1,
    gou:gou,
    monthDay:'',
    month:'',
    year:'',
    dilogShow:false,
    showAll:false,
    monthTime:'',
    monthArr:[31,29,31,30,31,30,31,31,30,31,30,31],
    leapMonth:[31,28,31,30,31,30,31,31,30,31,30,31]
    };
  },
  created(){
    let time= new Date()
      this.monthTime=time.format("yyyy年M月")
      // time=time.format("yyyy-MM-dd E hh:mm:ss")
      // time=time.format("yyyy年M月dd日 E HH:mm:ss")
      let time1=time.format("yyyy-M-dd E")
      let year = time1.split('-')[0]
      this.year=time1.split('-')[0]
      this.month=time1.split('-')[1]
  　　if(year%4==0&&year%100!=0||year%400==0){
        this.monthArr=[31,29,31,30,31,30,31,31,30,31,30,31]
        
  　　}else{
  　　   this.monthArr=[31,28,31,30,31,30,31,31,30,31,30,31]
  　　}

  },
  methods: {
    changeTime(time){
      var d = new Date(time); 
      var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return datetime
    },
    getMonthArr(month,arr){
      arr.map((item,index)=>{
        if(month==index+1){
          this.monthDay=item
        }
      })
    },
    touchstart(e) {
        console.log('touchstart')
    },
    showPopup: function(){
     this.dilogShow=true
    },
    closeDilog(){
      this.dilogShow=false
    },
    go(url) {      
      this.$router.push({
        path: url
      });
    },
    reduce(){
      this.month=parseInt(this.month)
      this.year=parseInt(this.year)
      console.log(this.month)
      if(this.month!=1){
        this.month=this.month-1
      }else{
        this.month=12;
        this.year=this.year-1
      }
   
    },
    addYear(){
      this.month=parseInt(this.month)
      this.year=parseInt(this.year)
      if(this.month!=12){
        this.month=this.month+1
      }else{
        this.month=1;
        this.year=this.year+1
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './assets/css/toRem.styl'
#app {
  display: flex;
  flex-direction: column;

  .router_view {
    padding toRem(20) 
    flex: 1;
    overflow: auto;
  }
  .header-warp{
    padding toRem(20)
    display flex;
    align-items center;
    justify-content space-between;

  }
  img{
    width toRem(20);
    height toRem(20);
  }
  .left-warp,.center,.right-warp{
    font-size:toRem(20);
    display flex;
   
  }
  .left-warp>div{
    display flex;
    justify-content center;
    align-items center;
    width toRem(60)
    height toRem(36)
    border-radius: toRem(10);
    border: toRem(1) solid #888888;
  }
  .left-warp>div:not(:last-child){
    margin-right toRem(14);
  }
  .center>div{
    display flex;
    justify-content center;
    align-items center;
  }
  .add{
    background-color #288FCF
  }
  .popup_warp{
    background-color #ffffff
    position absolute;
    top 50%;
    left 50%;
    border: toRem(1) solid #888888;
    transform translate(-50%,-50%)
    width:toRem(500);
    height toRem(460);
    border-radius: toRem(10);
  }
  .right-warp-left{
    box-sizing border-box;
    border-radius: toRem(10);
    margin-right toRem(14);
    display flex
  }
  .setBtn{
    border: toRem(1) solid #888888;
    border-radius: toRem(10);
    display flex;
    justify-content center;
    align-items center;
    padding toRem(4) toRem(18)
  }
  .right-warp-left>div{
    display flex;
    justify-content center;
    align-items center;
    border-right  toRem(1) solid #888888;
    border-top: toRem(1) solid #888888;
    border-bottom: toRem(1) solid #888888;
    width toRem(80)
    height toRem(36)
  }
  .month{
    border-radius: toRem(10) 0  0 toRem(10);
    border-left  toRem(1) solid #888888;
  }
  .warn{
    border-radius: 0 toRem(10)  toRem(10) 0;
  }

  .active{
    color #ffffff
    background-color #656565
  }
  .date{
    margin 0 toRem(14);
    font-size toRem(26)
  }
  .right-warp>div{
   
  }
  .title{
    font-size toRem(16)
    line-height  toRem(30)
    
  }
  .popup{
    
  }
  .top{
    border-radius:toRem(10) toRem(10)  0 0 ;
    padding 0 toRem(20)
    background-color #EAEAEA
    display flex;
    align-items center
    justify-content space-between;
  }
  .footer{
    border-radius: 0 0 toRem(10) toRem(10);
    box-sizing border-box;
    width 100%
    padding toRem(5) toRem(20)
    background-color #EAEAEA
    display flex;
    justify-content space-between;
    position absolute
    left :0;
    bottom 0

  }
  .footer>div:nth-child(2){
    display flex;
  }
  .sure,.cancel,.redact{
    font-size toRem(10)
    border-radius: toRem(4)
    border: toRem(1) solid #888888;
    padding  toRem(2) toRem(10)
    display flex;
    justify-content center;
    align-items center;
  }
  .sure{
    background-color #368ECD
    color #ffffff
    margin-right toRem(8)
  }
  .cancel{
    background-color #FOFOFO
  }
  .delete_warp{
    background-color #cccccc
    display flex;
    justify-content center;
    align-items center;
    box-sizing border-box;
     border-radius: toRem(4)
    width:toRem(20)
    height:toRem(20)
  }
  .del_warp{
    display flex;
    align-items center;
    justify-content center;
  }
  .popup_input{
    width 80%;
    height toRem(30)
    text-indent toRem(6)
  }
  .popup_content{
    
    padding toRem(20)
  }
  .popup_content>div{
    margin-bottom toRem(10)
  }
  .del_warp>img{
    width:toRem(16)
    height:toRem(16)
  }
  .date_input{
    width 50%;
  }
  .lable{
    display inline-block
    width 10%
    color #b2b2b2
    font-size toRem(10)
  }
  .popup_item{
    width:100%;
    display flex;
    justify-content left;
    align-items center;
  }
  .mint-popup{
    padding:0;
  }
  .check-box{
    background-color #e1e1e1
    box-sizing border-box
    display flex;
    justify-content center;
    align-items center;
    border: toRem(1) solid #888888;
    width toRem(14)
    height toRem(14)
    border-radius toRem(2)
    margin-right toRem(8)

  }
  .address_input,{
    width 70%;
  }
  .others_input{
    width 70%;
    height toRem(50)
  }
  .check-item{
    display flex
    margin-left toRem(10)
  }
  .gou{
    width toRem(12)
    height toRem(12)
  }
  .lable_text{
    font-size toRem(12)
  }
  .redact{
  }
}

</style>
