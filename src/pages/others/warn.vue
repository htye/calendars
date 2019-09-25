<template>
    <div class="warp_all_warp">
        <div class="header-warp">
            <div class="left-warp">
                <!-- <el-button>默认按钮</el-button> -->
                <div @click="showPopup()" class="add">
                    <img :src="add" >
                </div>
                <div class="phone">
                    <img :src="phone" >
                </div>
                <div class="today">今天</div>
            </div>
            <div class="center">
                <div @click="reduce()" class="date-left">
                    <img :src="left" >
                </div>
                <div class="date">{{year}}年{{month}}月</div>
                <div @click="addYear()" class="date-right">
                    <img :src="right" >
                </div>
            </div>

            <div class="right-warp">
                <div class="right-warp-left">
                    <div class="month" @click="go('/month')">月</div>
                    <div class="week" @click="go('/week')">周</div>
                    <div class="warn  active" @click="go('/warn')">提醒</div>
                </div>
                <div class="setBtn" @click="go('/set')">
                    <img :src="set" >
                </div>
            </div>
        </div>
        <div class="warn_warp">
            <div class="warn-box">
                <ul class="warn_top">
                        <li class="warn_time">提醒时间</li>
                        <li class="warn_content">内容</li>
                    </ul>
                    <ul class="warn_bd">
                        <li v-for="(item,index) in warnArr" :key="index" class="warn_item">
                            <div class="warn_time">{{item.time}}</div>
                            <div class="warn_content">{{item.content}}</div>
                        </li>
                    </ul>
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
var f = length => Array.from({length}).map((v, k) => k);
export default {
    data(){
        return{
            data:[],
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
            leapMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
            warnArr:[
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
                {time:'',content:''},
            ]
            
        }
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
        let arr= f(36)
        let num =arr.shift()
        this.data=arr
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

}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/week.styl';
@import '~@/assets/css/app.styl';
</style>


