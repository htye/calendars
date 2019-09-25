<template>
    <div class="month_all_warp">
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
                    <div class="month active" @click="go('/month')">月</div>
                    <div class="week" @click="go('/week')">周</div>
                    <div class="warn" @click="go('/warn')">提醒</div>
                </div>
                <div class="setBtn" @click="go('/set')">
                    <img :src="set" >
                </div>
            </div>
        </div>
        <div class="month-warp">
            <ul class="month_top">
                <li>星期天</li>
                <li>星期一</li>
                <li>星期二</li>
                <li>星期三</li>
                <li>星期四</li>
                <li>星期五</li>
                <li>星期六</li>
            </ul>
            <ul class="day_warp">
                <li v-for="(item,i) in data" @mousemove="addNew(item)" @mousedown="leave(item)"  :key="i">
                    <div class="date_content">
                        <p>{{item}}</p>
                        <p class="nongLi" v-if="item!=undefined">{{toLunar(year, month, item)}}</p>
                    </div>
                    <p v-if="acIndex==item&&item!=undefined" @click="toDetail(item)" class="newActive">新建事件...</p>
                </li>
            </ul>
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
                    <input type="text" :value="value2" placeholder="接下来，你有什么安排？" class="popup_input">
                </div>
                <div class="popup_item">
                    <p class="popup_item">
                    <em class="lable">时间：</em>
                    <em class="add_time">2019年9月10日 星期二</em>
                    </p>
                </div>
                <div class="popup_item">
                    <div class="popup_item">
                    <em class="lable">提醒：</em>
                    <div class="check-item">
                        <p @click="check2()" class="check-box">
                        <img  class="gou" :src="gou">
                        </p>
                        <select name="warnTime" id="warnTime">
                        <option v-for="(item,index) in warnTime" :key="index" :value="item.vlaue">{{item.content}}</option>
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
    /* ---------------------------开始------------------------------ */
    


    /* ---------------------------结束------------------------------ */
    export default {
        data(){
            return{
                value2:'',
                check:false,
                warnTime:[
                    { value:1,content:'不提醒'},
                    { value:2,content:'前一天'},
                    { value:3,content:'同一天'},
                    { value:4,content:'指定时间'},
                ],
                acIndex:'',
                today:'',
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
                week:'',
                dilogShow:false,
                showAll:false,
                monthTime:'',
                monthArr:[31,29,31,30,31,30,31,31,30,31,30,31],
                // leapMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
                MIN_YEAR : 1891,
                MAX_YEAR : 2100,
                lunarInfo: [
                    [0,2,9, 21936], [6,1,30, 9656], [0,2,17, 9584], [0,2,6, 21168], [5,1,26,43344], [0,2,13,59728],
                    [0,2,2, 27296], [3,1,22,44368], [0,2,10,43856], [8,1,30,19304], [0,2,19,19168], [0,2,8, 42352],
                    [5,1,29,21096], [0,2,16,53856], [0,2,4, 55632], [4,1,25,27304], [0,2,13,22176], [0,2,2, 39632],
                    [2,1,22,19176], [0,2,10,19168], [6,1,30,42200], [0,2,18,42192], [0,2,6, 53840], [5,1,26,54568],
                    [0,2,14,46400], [0,2,3, 54944], [2,1,23,38608], [0,2,11,38320], [7,2,1, 18872], [0,2,20,18800],
                    [0,2,8, 42160], [5,1,28,45656], [0,2,16,27216], [0,2,5, 27968], [4,1,24,44456], [0,2,13,11104],
                    [0,2,2, 38256], [2,1,23,18808], [0,2,10,18800], [6,1,30,25776], [0,2,17,54432], [0,2,6, 59984],
                    [5,1,26,27976], [0,2,14,23248], [0,2,4, 11104], [3,1,24,37744], [0,2,11,37600], [7,1,31,51560],
                    [0,2,19,51536], [0,2,8, 54432], [6,1,27,55888], [0,2,15,46416], [0,2,5, 22176], [4,1,25,43736],
                    [0,2,13, 9680], [0,2,2, 37584], [2,1,22,51544], [0,2,10,43344], [7,1,29,46248], [0,2,17,27808],
                    [0,2,6, 46416], [5,1,27,21928], [0,2,14,19872], [0,2,3, 42416], [3,1,24,21176], [0,2,12,21168],
                    [8,1,31,43344], [0,2,18,59728], [0,2,8, 27296], [6,1,28,44368], [0,2,15,43856], [0,2,5, 19296],
                    [4,1,25,42352], [0,2,13,42352], [0,2,2, 21088], [3,1,21,59696], [0,2,9, 55632], [7,1,30,23208],
                    [0,2,17,22176], [0,2,6, 38608], [5,1,27,19176], [0,2,15,19152], [0,2,3, 42192], [4,1,23,53864],
                    [0,2,11,53840], [8,1,31,54568], [0,2,18,46400], [0,2,7, 46752], [6,1,28,38608], [0,2,16,38320],
                    [0,2,5, 18864], [4,1,25,42168], [0,2,13,42160], [10,2,2,45656], [0,2,20,27216], [0,2,9, 27968],
                    [6,1,29,44448], [0,2,17,43872], [0,2,6, 38256], [5,1,27,18808], [0,2,15,18800], [0,2,4, 25776],
                    [3,1,23,27216], [0,2,10,59984], [8,1,31,27432], [0,2,19,23232], [0,2,7, 43872], [5,1,28,37736],
                    [0,2,16,37600], [0,2,5, 51552], [4,1,24,54440], [0,2,12,54432], [0,2,1, 55888], [2,1,22,23208],
                    [0,2,9, 22176], [7,1,29,43736], [0,2,18, 9680], [0,2,7, 37584], [5,1,26,51544], [0,2,14,43344],
                    [0,2,3, 46240], [4,1,23,46416], [0,2,10,44368], [9,1,31,21928], [0,2,19,19360], [0,2,8, 42416],
                    [6,1,28,21176], [0,2,16,21168], [0,2,5, 43312], [4,1,25,29864], [0,2,12,27296], [0,2,1, 44368],
                    [2,1,22,19880], [0,2,10,19296], [6,1,29,42352], [0,2,17,42208], [0,2,6, 53856], [5,1,26,59696],
                    [0,2,13,54576], [0,2,3, 23200], [3,1,23,27472], [0,2,11,38608], [11,1,31,19176],[0,2,19,19152],
                    [0,2,8, 42192], [6,1,28,53848], [0,2,15,53840], [0,2,4, 54560], [5,1,24,55968], [0,2,12,46496],
                    [0,2,1, 22224], [2,1,22,19160], [0,2,10,18864], [7,1,30,42168], [0,2,17,42160], [0,2,6, 43600],
                    [5,1,26,46376], [0,2,14,27936], [0,2,2, 44448], [3,1,23,21936], [0,2,11,37744], [8,2,1, 18808],
                    [0,2,19,18800], [0,2,8, 25776], [6,1,28,27216], [0,2,15,59984], [0,2,4, 27424], [4,1,24,43872],
                    [0,2,12,43744], [0,2,2, 37600], [3,1,21,51568], [0,2,9, 51552], [7,1,29,54440], [0,2,17,54432],
                    [0,2,5, 55888], [5,1,26,23208], [0,2,14,22176], [0,2,3, 42704], [4,1,23,21224], [0,2,11,21200],
                    [8,1,31,43352], [0,2,19,43344], [0,2,7, 46240], [6,1,27,46416], [0,2,15,44368], [0,2,5, 21920],
                    [4,1,24,42448], [0,2,12,42416], [0,2,2, 21168], [3,1,22,43320], [0,2,9, 26928], [7,1,29,29336],
                    [0,2,17,27296], [0,2,6, 44368], [5,1,26,19880], [0,2,14,19296], [0,2,3, 42352], [4,1,24,21104],
                    [0,2,10,53856], [8,1,30,59696], [0,2,18,54560], [0,2,7, 55968], [6,1,27,27472], [0,2,15,22224],
                    [0,2,5, 19168], [4,1,25,42216], [0,2,12,42192], [0,2,1, 53584], [2,1,21,55592], [0,2,9, 54560]
                ],
                
            }
        },
        created(){
            let time= new Date()
            this.monthTime=time.format("yyyy年M月")
            this.today=time.format("yyyy-MM-dd")
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
            this.getMonthArr(this.year,this.month)
            console.log(this.toLunar(this.year,this.month,25));
            
        },
        methods: {
            sure(){
                Toast({
                    message: '添加成功',
                    position: 'center',
                    duration: 5000
                });
            },
            check2(){
                this.check=true
            },
        changeTime(time){
            var d = new Date(time); 
            var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            return datetime
        },
        test(val){
            var NewArray = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六")
            // var obj = document.getElementById(id);
            // KingVal = obj.value;
            var DateYear = parseInt(val.split("-")[0]);
            var DateMonth = parseInt(val.split("-")[1]);
            var DateDay = parseInt(val.split("-")[2]);
            var NewDate = new Date(DateYear,DateMonth-1,DateDay);
            var NewWeek = NewDate.getDay();
            // alert(NewWeek)
           return NewWeek;
        },
        getLastMonth(year,month,week){
            if(month==1){
                month=12
                year=year-1
                if(year%4==0&&year%100!=0||year%400==0){
                    let arr =[31,29,31,30,31,30,31,31,30,31,30,31]
                    arr.map((item,index)=>{
                        if(month==index+1){
                            let data= f(item+1)
                            let num =arr.shift()
                            this.data=data
                        this.monthDay=f(item+1).shift
                        
                        }
                    })
            　　}else{
            　　   let arr1 =[31,28,31,30,31,30,31,31,30,31,30,31]
                    arr1.map((item,index)=>{
                        if(month==index+1){
                        this.monthDay=item
                    
                        }
                    })
            　　}
            }else if(month==12){
                month=1
                year=year+1
                if(year%4==0&&year%100!=0||year%400==0){
                    let arr =[31,29,31,30,31,30,31,31,30,31,30,31]
                    arr.map((item,index)=>{
                        if(month==index+1){
                            let data= f(item+1)
                            let num =arr.shift()
                            this.data=data
                        this.monthDay=f(item+1).shift
                    
                        }
                    })
            　　}else{
            　　   let arr1 =[31,28,31,30,31,30,31,31,30,31,30,31]
                    arr1.map((item,index)=>{
                        if(month==index+1){
                        this.monthDay=item
                    
                        }
                    })
            　　} 
            }else{
                month=month-1
                if(year%4==0&&year%100!=0||year%400==0){
                    let arr =[31,29,31,30,31,30,31,31,30,31,30,31]
                    arr.map((item,index)=>{
                        if(month==index+1){
                            let data= f(item+1)
                            let num =arr.shift()
                            this.data=data
                        this.monthDay=f(item+1).shift
                    
                        }
                    })
            　　}else{
            　　   let arr1 =[31,28,31,30,31,30,31,31,30,31,30,31]
                    arr1.map((item,index)=>{
                        if(month==index+1){
                        this.monthDay=item
                    
                        }
                    })
            　　}
            }
        },
        getMonthArr(year,month){
            let a = year+'-'+month+'-'+1
            
            let arr3=f(this.test(a)-1)
            arr3=arr3.map(item=>{
                item=' '
               console.log(item);
               
            })
            console.log(arr3)
            if(year%4==0&&year%100!=0||year%400==0){
                let arr =[31,29,31,30,31,30,31,31,30,31,30,31]
                arr.map((item,index)=>{
                    if(month==index+1){
                        let data= f(item+1)
                        let num =data.shift()
                        let number=35-arr3.length-data.length
                        let lastArr=f(number)
                        lastArr=lastArr.map(item1=>{
                            item1=' '
                        })
                        this.data=arr3.concat(data,lastArr)
                    // this.monthDay=f(item+1).shift
                    }
                })
        　　}else{
        　　   let arr1 =[31,28,31,30,31,30,31,31,30,31,30,31]
                arr1.map((item,index)=>{
                    if(month==index+1){
                        let data1= f(item+1)
                        let num1 =data1.shift()
                        let number1=35-arr3.length-data1.length
                        console.log(number1);
                        
                        let lastArr1=f(number1)
                        lastArr1=lastArr1.map(item1=>{
                            item1=' '
                        })
                        this.data=arr3.concat(data1,lastArr1)
                        console.log(this.data);
                        
                    }
                })
        　　}
            
        },
        toDetail(item){
            this.acIndex=item
        },
        leave(item){
            this.acIndex=''
        },
        addNew(item){
            this.acIndex=item
        },
        touchstart(e) {
            console.log('touchstart')
        },
        showPopup: function(){
            this.showAll=true
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
                this.getMonthArr(this.year,this.month)
            }else{
                this.month=12;
                this.year=this.year-1
                this.getMonthArr(this.year,this.month)
            }
    
        },
        redact(){
            this.showAll=false
            this.dilogShow=true
        },
        addYear(){
            this.month=parseInt(this.month)
            this.year=parseInt(this.year)
            if(this.month!=12){
                this.month=this.month+1
                this.getMonthArr(this.year,this.month)
            }else{
                this.month=1;
                this.year=this.year+1
                this.getMonthArr(this.year,this.month)
            }
        },
        
        //是否闰年
        isLeapYear(year) {
            return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
        },
        //天干地支年
        lunarYear(year) {
            var gan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
                zhi = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
                str = year.toString().split("");
            return gan[str[3]] + zhi[year % 12];
        },
        //生肖年
        zodiacYear(year) {
            var zodiac = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
            return zodiac[year % 12];
        },
        //公历月份天数
        //@param year 阳历-年
        //@param month 阳历-月
        solarMonthDays(year, month) {
            var FebDays = this.isLeapYear(year) ? 29 : 28;
            var monthHash = ['', 31, FebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return monthHash[month];
        },
        //农历月份天数
        lunarMonthDays(year, month) {
            var monthData = this.lunarMonths(year);
            return monthData[month - 1];
        },
        //农历月份天数数组
        lunarMonths(year) {
            var yearData = this.lunarInfo[year - this.MIN_YEAR];
            var leapMonth = yearData[0];
            var bit = (+yearData[3]).toString(2);
            var months = [];
            for (var i = 0; i < bit.length; i++) {
                months[i] = bit.substr(i, 1);
            }
        
            for (var k = 0, len = 16 - months.length; k < len; k++) {
                months.unshift('0');
            }
        
            months = months.slice(0, (leapMonth == 0 ? 12 : 13));
            for (var i = 0; i < months.length; i++) {
                months[i] = +months[i] + 29;
            }
            return months;
        },
        //农历每年的天数
        //@param year 农历年份
        lunarYearDays(year) {
            var monthArray = this.lunarYearMonths(year);
            var len = monthArray.length;
            return (monthArray[len-1] == 0 ? monthArray[len-2] : monthArray[len-1]);
        },
        //
        lunarYearMonths(year) {
            var monthData = this.lunarMonths(year);
            var res = [];
            var temp = 0;
            var yearData = this.lunarInfo[year - this.MIN_YEAR];
            var len = (yearData[0] == 0 ? 12 : 13);
            for (var i = 0; i < len; i++) {
                temp = 0;
                for (var j = 0; j <= i; j++) {
                    temp += monthData[j];
                }
                res.push(temp);
            }
            return res;
        },
        //获取闰月
        //@param year 农历年份
        leapMonth(year){
            var yearData = this.lunarInfo[year - this.MIN_YEAR];
            return yearData[0];
        },
        //计算农历日期与正月初一相隔的天数
        betweenLunarDays(year, month, day) {
            var yearMonth = this.lunarMonths(year);
            var res = 0;
            for (var i = 1; i < month; i++) {
                res += yearMonth[i-1];
            }
            res += day - 1;
            return res;
        },
        //计算2个阳历日期之间的天数
        //@param year 阳历年
        //@param month
        //@param day
        //@param l_month 阴历正月对应的阳历月份
        //@param l_day   阴历初一对应的阳历天
        betweenSolarDays(year, month, day, l_month, l_day) {
            var time1 = new Date(year +"-"+  month  +"-"+ day).getTime(),
                time2 = new Date(year +"-"+ l_month +"-"+ l_day).getTime();
            return Math.ceil((time1-time2)/24/3600/1000);
        },
        //根据距离正月初一的天数计算阴历日期
        //@param year 阳历年
        //@param between 天数
        lunarByBetween(year, between) {
            var lunarArray = [], yearMonth = [], t = 0, e = 0, leapMonth = 0, m = '';
            if (between == 0) {
                t = 1;
                e = 1;
                m = '正月';
            } else {
                year = between > 0 ? year : (year - 1);
                yearMonth = this.lunarYearMonths(year);
                leapMonth = this.leapMonth(year);
                between   = between > 0 ? between : (this.lunarYearDays(year) + between);
                for (var i = 0; i < 13; i++) {
                    if (between == yearMonth[i]) {
                        t = i + 2;
                        e = 1;
                        break;
                    } else if (between < yearMonth[i]) {
                        t = i + 1;
                        e = between - ((yearMonth[i-1]) ? yearMonth[i-1] : 0) + 1;
                        break;
                    }
                }
                
                m = (leapMonth != 0 && t == leapMonth + 1)
                ? ('闰'. this.chineseMonth(t-1))
                : this.chineseMonth(((leapMonth != 0 && leapMonth + 1 < t) ? (t - 1) : t));
            }
            lunarArray.push(year, t, e); //年 月 日
            lunarArray.push(this.lunarYear(year),
                            this.zodiacYear(year),
                            m,
                            this.chineseNumber(e)); //天干地支年 生肖年 月份 日
            lunarArray.push(leapMonth); //闰几月
            return lunarArray;
        },
        //中文月份
        chineseMonth(month) {
            var monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
            return monthHash[month];
        },
        //中文日期
        chineseNumber(num) {
            var res = ''
            var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            if (num <= 10) {
                res = '初'+ dateHash[num];
            } else if (num > 10 && num < 20) {
                res = '十'+ dateHash[num-10];
            } else if (num == 20) {
                res = "二十";
            } else if (num > 20 && num < 30) {
                res = "廿"+ dateHash[num-20];
            } else if (num == 30) {
                res = "三十";
            }
            return res;
        },
        //转换农历
        toLunar(year, month, day) {
            var yearData = this.lunarInfo[year - this.MIN_YEAR];
            if (year == this.MIN_YEAR && month <= 2 && day <= 9) {
                return [1891, 1, 1, '辛卯', '兔', '正月', '初一'];
            }
            let arr= this.lunarByBetween(year, this.betweenSolarDays(year, month, day, yearData[1], yearData[2]));
            return arr[5]+arr[6]
        },
        //转换公历
        //@param year  阴历-年
        //@param month 阴历-月，闰月处理：例如如果当年闰五月，那么第二个五月就传六月，相当于阴历有13个月
        //@param date  阴历-日
        toSolar(year, month, day) {
            var yearData = this.lunarInfo[year - this.MIN_YEAR];
            var between  = this.betweenLunarDays(year, month, day);
            var ms = new Date(year +"-" + yearData[1] +"-"+ yearData[2]).getTime();
            var s = ms + between * 24 * 60 * 60 * 1000;
            var d = new Date();
            d.setTime(s);
            year  = d.getFullYear();
            month = d.getMonth() + 1;
            day   = d.getDate();
            return [year, month, day];
        }
    
    }




    }
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/month.styl';
@import '~@/assets/css/app.styl';
</style>


