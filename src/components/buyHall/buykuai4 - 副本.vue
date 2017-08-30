<template>
    <div class="buykuai3">
        <div class="H50">
            <header >
                <p class="back" @click="back">
                   <span class="icon-back"></span>
                </p>
                <p><span @click="buyHallChose = !buyHallChose">{{defPlayName}}<span class="icon-arrow-down"></span></span></p>
                <div class=" border_line"></div>
            </header>
        </div>
        <div class="buyHallDetail">

            <p class="title"><span></span>第{{actionno}}期<em class="red ML10">{{actiontime}} 截止</em></p>
            <div class="choseTitle">
                <div class="H10"></div>
                <p>每位至少选择<em class="red">{{minlength}}</em>个号码</p>
                <div class="shake"></div>
            </div>
            <div class="choseList" v-for="(item,bit) in selectGroup">
                <p class="pos tabListName">{{item.keyname}}</p>
                <ul class="out">
                    <li class="n" 
                        v-for="(number,index) in item.options"
                        @click="selectgroup(index,bit)"
                        :class="number.class"
                        :keyname="item.keyname"
                    >{{number.num}}</li>
                </ul>
                <div class=" border_line"></div>
            </div>
        </div>
        <div class="H50">
            <div class="buyHallBtn">
                <div class=" border_line"></div>
                <div class="con">
                    <span class="icon-delete" @click="deleteSelect"></span>
                    共{{total}}注 {{totalMoney}}元 <span class="fr" @click="toPlay">确认</span>
                    <div class="border_lineLeft"></div>
                </div>
            </div>
        </div>
        <div class="buyHallChose" v-show="buyHallChose">
            <div class="con">
                <div class="buyHallChoseList tabList">
                    <div class="H20"></div>
                    <div class="title">
                        <p class="tabListName">{{groupName}}</p>
                    </div>
                    <ul class="out">
                        <li class="n" 
                            v-for="(list,index) in initList.groupList" 
                            @click="groupList(index)"
                            :class="list.class"
                            >
                            <p>{{list.groupname}}</p>
                        </li>
                    </ul>
                </div>
                <div class="buyHallChoseList tabList">
                    <div class="H20"></div>
                    <div class="title">
                        <p class="tabListName">{{playName}}</p>
                    </div>
                    <ul class="out">
                        <li class="n" 
                            v-for="(list,index) in initList.playList" 
                            @click="playList(index)"
                            :class="list.class"
                            >
                            <p :playid="list.playid">{{list.name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="H10"></div>
            </div>
            <div class="bg" @click="buyHallChose = !buyHallChose"></div>
        </div>
        <buyHallSetting :total="total" 
                        :totalMoney="totalMoney"
                        :fanDianBdw="fanDianBdw"
                        :bonusprop="bonusprop"
                        :bonuspropbase="bonuspropbase"
                        :gameFanDian="gameFanDian"
                        :myFanDian="myFanDian"
                        :award="award"
                        :highest="highest"
                        v-on:fresh2="freshPro2"
                        ></buyHallSetting>
    </div>
</template>

<script>
    import server from './../../server'
    import buyHallSetting from './buyHallSetting'
    export default {
        name: 'buykuai3',
        data () {
            return {
                defPlayName:'',
                initList:[],
                groupName:'',
                groupId:'',
                playName:'',
                playedId:'',
                actiontime:'',
                actionno:'',
                buyHallChose:false,
                type:'',
                selectGroup:[],
                total: 0,
                totalMoney:0,
                fanDianBdw:'',
                bonusprop:'',
                bonuspropbase:'',
                gameFanDian:'',
                myFanDian:'',
                award:'',
                highest:'',
                minlength: 0            // 玩法最少选几个号码
            }
        },
        components:{
          buyHallSetting
        },
        methods:{
            back:function(){
                this.$router.go(-1);
            },
            groupList:function(index){
                for(var i=0;i<this.initList.groupList.length;i++){
                    this.initList.groupList[i].class='';
                }
                this.initList.groupList[index].class='current';
                this.groupName=this.initList.groupList[index].groupname;
                //获取玩法列表
                var _self=this;
                server.getPlayList(_self,{
                    groupId:this.initList.groupList[index].groupid,
                });
            },
            playList:function(index){
                for(var i=0;i<this.initList.playList.length;i++){
                    this.initList.playList[i].class='';
                }
                this.initList.playList[index].class='current';
                this.playName=this.initList.playList[index].name;

                this.playedId=this.initList.playList[index].playid;
                //获取玩法具体参数
                var _self=this;
                server.played(_self,{
                    type:this.type,
                    playedId:2,
                });

            },
            selectgroup:function(index,bit){
                if(this.selectGroup[bit].options[index].class=='current'){
                    this.selectGroup[bit].options[index].class='';
                    this.selectGroup[bit].number--;
                    //取消选中的数字
                    var num=this.selectGroup[bit].options[index].num;
                    var arr=this.selectGroup[bit].numberList;
                    for(var i=0;i<arr.length;i++){
                        if(arr[i]==num){
                            arr.splice(i,1);
                            return this.selectGroup[bit].numberList=arr.sort();
                        }
                    }
                    //返回后台选中的数字
                    var str='';
                    for(var i=0;i<this.selectGroup.length;i++){
                        str+=this.selectGroup[i].numberList.join(',');
                        str+=',';
                    }
                    this.$store.commit('addDataActionData',str);
                }else{
                    this.selectGroup[bit].options[index].class='current';
                    this.selectGroup[bit].number++;
                    var num=this.selectGroup[bit].options[index].num;
                    this.selectGroup[bit].numberList.push(num);
                    this.selectGroup[0].numberList.sort();
                    //返回后台选中的数字
                    var str='';
                    for(var i=0;i<this.selectGroup.length;i++){
                        str+=this.selectGroup[i].numberList.join('');
                        str+=',';
                    }
                    this.$store.commit('addDataActionData',str);
                }
                var sum=1;
                for(var i=0;i<this.selectGroup.length;i++){
                    sum=sum*this.selectGroup[i].number;
                    this.total=sum;
                    this.totalMoney=sum*2;
                };
            },
            deleteSelect:function(){
                for(var i=0;i<this.selectGroup.length;i++){
                    for(var j=0;j<this.selectGroup[i].options.length;j++){
                       this.selectGroup[i].options[j].class="";
                    }
                };
                this.total=0;
                this.totalMoney=0;
                for(var i=0;i<this.selectGroup.length;i++){
                    this.selectGroup[i].number=0;
                    data.playedconfig.selectGroup[i].numberList=[];
                }
            },
            toPlay:function(){
                 this.$store.commit('buySetting',true);
            },
            freshPro2:function(b){
                 this.totalMoney=b
            }
        },
        watch:{
              initList:function(val){
                this.selectGroup=this.initList.playedconfig.config.selectGroup;
                this.defPlayName=this.initList.defPlayName;
                this.groupName=this.initList.groupList[0].groupname;
                this.playName=this.initList.playList[0].name;
                this.actionno=this.initList.actionNo.actionno;
                this.actiontime=this.initList.actionNo.actiontime;
                this.groupId=this.initList.playedconfig.groupId;
                this.playedId=this.initList.playList[0].playid;
                //用于计算返利
                var bonusprop=this.initList.playedconfig.config.bonusprop;
                var bonuspropbase=this.initList.playedconfig.config.bonuspropbase;
                var gameFanDian=this.initList.playedconfig.config.gameFanDian;
                var myFanDian=this.initList.playedconfig.config.myFanDian;
                this.fanDianBdw=this.initList.playedconfig.config.fanDianBdw;
                this.bonusprop=bonusprop;
                this.bonuspropbase=bonuspropbase;
                this.gameFanDian=gameFanDian;
                this.myFanDian=myFanDian;
             },
        },
        mounted:function(){
            this.type=location.href.split('?')[1].split('=')[1] ;
            var _self=this;
            //获取彩种信息
            server.playDefaultInfo(_self,{
                type:this.type
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .back{
        position: absolute;
        left:0;
        top:0; 
        width: 35px;
    }
    .icon-back{
        font-size: 18px;
        color: #666;
    }
   /*购买大厅详情*/
    .buyHallDetail .title{
      position: relative;
      padding: 0 10px 0 20px;
      background: #fff;
      line-height: 35px;
      font-size: 14px;
      color: #666;
    }
    .buyHallDetail .title span{
      position: absolute;
      left:10px;
      top:7px;
      width: 3px;
      height: 20px;
      background: #f54444;
    }
    .buyHallDetail .choseTitle{
      line-height: 40px;
      margin:  0 10px;
      color: #666;
      font-size: 15px;
    }
    .buyHallDetail .choseList {
      position: relative;
      
    }
    .buyHallDetail .choseList .pos{
      position: absolute;
      left:10px;
      top:10px;
      color: #666;
      background: #e3e2e2;
      border-radius: 20px;
      padding: 5px 8px;
    }
    .buyHallDetail .choseList ul{
      margin: 10px 10px 0 70px;
    }
    .buyHallDetail .choseList ul li{
      width: 40px;
        height: 40px;
        background: #fff;
        border:solid 1px #dfdfdf;
        color: #f54444;
        font-size: 13px;
        text-align: center;
        line-height: 40px;
        margin:0 10px 10px 0;
        border-radius: 50%;
    }
    .buyHallDetail .choseList ul li.current{
      color: #fff;
      background: #f54444;
      border:solid 1px #f54444;
    }
    .buyHallBtn{
      position: fixed;
      left:0;
      bottom:0;
      height: 50px;
      width: 100%;
    }
    .buyHallBtn .con{
      height: 49px;
      background: #fff;
      padding: 0 10px 0 60px;
      line-height: 49px;
      font-size: 15px;
      color: #000;
      position: relative;
    }
    .buyHallBtn .icon-delete{
        position: absolute;
        left:0;
        top:0;
        width: 50px;
        height: 50px;
        display: block;
        text-align: center;
        line-height: 50px;
        color: #999;
        font-size: 25px;
    }
    .buyHallBtn .border_lineLeft{
      left:50px;
      top:10px;
      height: 30px;
    }
    .buyHallBtn  .fr{
      background: #f54444;
      color: #fff;
      font-size: 16px;
      border-radius: 5px;
      width: 80px;
      height: 35px;
      display: inline-block;
      text-align: center;
      line-height: 35px;
      margin-top: 8px;
    }
    /*购买大厅弹框*/
    .buyHallChose{
       position: fixed;
       left:0;
       width: 100%;
       top:50px;
       height: 100%;
    }
    .buyHallChose .bg{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .buyHallChose .con{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      background: #fff;
      z-index: 5;
    }
    .buyHallChose .con .title{
      height: 15px;
      border-top: solid 1px #f54444;;
      position: relative;
      margin-bottom: 5px;
    }
    .buyHallChose .con .title p{
      position: absolute;
      background: #fff;
      left:50%;
      top:-15px;
      line-height: 30px;
      text-align: center;
      padding: 0 5px;
      min-width: 80px;
      margin-left: -45px;
      font-size: 15px;
      color: #f54444;;
    }
    .buyHallChose .con  ul{
      margin-left: 10px;
    }
    .buyHallChose .con  ul li{
      width: 33.3%;
    }
    .buyHallChose .con  ul li.current{
      color: #f54444;;
    }
    .buyHallChose .con  ul li p{
      margin: 0 10px 10px 0;
      border-radius: 5px;
      border:solid 1px #dedede;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
    }
</style>

