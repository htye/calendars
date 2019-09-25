<template>
        <div class="week_all_warp">
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
                        <div class="month " @click="go('/month')">月</div>
                        <div class="week active" @click="go('/week')">周</div>
                        <div class="warn" @click="go('/warn')">提醒</div>
                    </div>
                    <div class="setBtn" @click="go('/set')">
                        <img :src="set" >
                    </div>
                </div>
            </div>
            <div class="week-warp">
                <table class="week_top" border='1' cellspacing="0" bordercolor="EBEBEB">
                    <tr>
                        <td width="35">&emsp;</td>
                        <td >星期天</td>
                        <td>星期一</td>
                        <td>星期二</td>
                        <td>星期三</td>
                        <td>星期四</td>
                        <td>星期五</td>
                        <td>星期六</td>
                    </tr>
                    <tr v-for="(item,index) in weekArr" :key="index">
                        <td>{{item.time}}</td>
                        <td>{{item.Week0 ==0?'':item.Week0}}</td>
                        <td>{{item.Week1 ==0?'':item.Week1}}</td>
                        <td>{{item.Week2 ==0?'':item.Week2}}</td>
                        <td>{{item.Week3 ==0?'':item.Week3}}</td>
                        <td>{{item.Week4 ==0?'':item.Week4}}</td>
                        <td>{{item.Week5 ==0?'':item.Week5}}</td>
                        <td>{{item.Week6 ==0?'':item.Week6}}</td>
                    </tr>
                    
                </table>
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
                weekArr:[
                   {time:'01:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'02:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'03:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'04:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'05:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'06:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'07:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'08:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'09:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'10:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'11:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'12:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'13:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'14:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'15:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'16:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'17:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'18:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'19:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'20:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'21:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'22:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'23:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
                   {time:'24:00',Week0:0,Week1:0,Week2:0,Week3:0,Week4:0,Week5:0,Week6:0},
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


