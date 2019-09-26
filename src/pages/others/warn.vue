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
                        <li v-for="(item,index) in warnArr" :key="index"  :class="['warn_item',index==0?'bgclass':'']">
                            <div class="warn_time">{{item.time}}</div>
                            <div class="warn_content">{{item.content}}</div>
                        </li>
                    </ul>
            </div>
        </div>
        <div v-if="dilogShow==true" class="popup_warp">
            <div class="top">
                <p class="title">新建事件</p>
                <p @click="closeDilog(1)" class="delete_warp">
                    <img :src="del1" >
                </p>
                <!-- <p class="del_warp">
                    <img :src="del" >
                </p> -->
            </div>
            <div class="popup_content ">
                <div class="popup_item">
                    <el-input v-model="input1" placeholder="请输入内容"></el-input>
                </div>
                <div class="popup_item">
                    <p class="popup_item">
                    <em class="lable">开始：</em>
                    <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                    <el-time-select
                    v-if="allTimeShow"
                    class="startTime"
                    v-model="startTime"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                    }"
                    placeholder="选择时间">
                    </el-time-select>
                    </p>
                </div>
                <div v-if="endTimeShow" class="popup_item">
                    <p class="popup_item">
                    <em class="lable">结束：</em>
                    <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                    <el-time-select
                    v-if="allTimeShow"
                    class="endTime"
                    v-model="endTime"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                    }"
                    placeholder="选择时间">
                    </el-time-select>
                    </p>
                </div>
                <div class="popup_item">
                    <div class="popup_item">
                    <em class="lable"></em>
                    <div class="check-item">
                        <p @click="allTimeShowBtn()" class="check-box">
                        <img v-if="allTimeShow" class="gou" :src="gou">
                        </p>
                        <p  class="lable_text">全天</p>
                    </div>
                    <div class="check-item">
                        <p @click="endTimeShowBtn()"  class="check-box">
                            <img v-if="endTimeShow" class="gou" :src="gou">
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
                    <em class="lable">事务类型：</em>
                    <div class="check-item">
                        <p class="check-box">
                        <img class="gou" :src="gou">
                        </p>
                        <el-radio v-model="radio" label="1">个人</el-radio>
                        <el-radio v-model="radio" label="2">工作</el-radio>
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
                <div style="visibility:hidden" class="redact"></div>
                <div>
                    <p @click="sure()" class="sure">确定</p>
                    <p class="cancel">取消</p>
                </div>
            </div>
        </div>
        <div v-if="showAll==true" class="popup_warp_all">
            <div class="top">
                <p class="title">新建事件</p>
                <p @click="closeDilog(2)" class="delete_warp">
                    <img :src="del1" >
                </p>
                <!-- <p class="del_warp">
                    <img :src="del" >
                </p> -->
            </div>
            <div class="popup_content ">
                <div class="popup_item">
                    <input type="text" v-model="value2" placeholder="接下来，你有什么安排？" class="popup_input">
                </div>
                <div class="popup_item">
                    <p class="popup_item">
                    <em class="lable">时间：</em>
                    <em class="add_time">{{addEventTime}}</em>
                    </p>
                </div>
                <div class="popup_item">
                    <div class="popup_item">
                    <em class="lable">提醒：</em>
                    <div class="check-item">
                        <p @click="check2()" class="check-box">
                            <img v-if="check" class="gou" :src="gou">
                        </p>
                        <select v-model="myVal2" name="warnTime" id="warnTime">
                            <option v-for="(item,index) in warnTime" :key="index" :value="item.value">{{item.content}}</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
            <div class="footer">
                <div @click="redact()" class="redact">完整编辑...</div>
                <div>
                    <p @click="sure()" class="sure">确定</p>
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
var f = length => Array.from({length}).map((v, k) => k);
export default {
    data(){
        return{
            value2:'',
            myVal2:1,
            check:false,
            warnTime:[
                    { value:1,content:'不提醒'},
                    { value:2,content:'前一天'},
                    { value:3,content:'同一天'},
                    { value:4,content:'指定时间'},
                ],
            input1:'',//事件描述
            startDate:'',
            allTimeShow:false,
            endTimeShow:false,
            radio:'1',

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
                {time:'2019年9月25日 星期三',content:'2'},
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
         redact(){
                this.showAll=false
                this.dilogShow=true
            },
            sure(){
                console.log(this.myVal2,this.value2,this.check)
                this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                });
            },
        check2(){
                this.check=!this.check
            },
         allTimeShowBtn(){
                this.allTimeShow=!this.allTimeShow
            },
            endTimeShowBtn(){
                this.endTimeShow=!this.endTimeShow
            },
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
            let date =new Date()
                this.showAll=true
                this.addEventTime=date.format("yyyy年M月dd日 E ")
        },
        closeDilog(a){
                if(a==1){
                    this.dilogShow=false
                }else{
                    this.showAll=false
                }
                
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
.bgclass{
    background:#5eb2e6;
    color:#fff!important;
}
</style>


