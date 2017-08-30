<template>
    <div class="pushRecordDetail">
        <headCom></headCom>
         <div class="H10"></div>
        <div v-for="item in orderDetail">
            <div class="buyHall">
                <a href="javascript:">
                    <div class="pic" :class="item.icon"></div>
                    <p class="buyHallTitle">{{item.typeName}}<span class="gry2">第{{item.actionno}}期</span></p>
                    <p class="buyHallTime FZ14">开奖号码 <span class="red">{{item.lotteryno | judge}}</span> </p>
                </a>
            </div>
            <div class="H10"></div>
            <div class="buyCheckDetail">
                <p class="title"><span></span>订单内容</p>
                <dl>
                    <dd>
                        <span class="left">订单号</span>
                        <span class="right">{{item.orderid}}</span>
                    </dd>
                    <dd>
                        <span class="left">投注金额</span>
                        <span class="right">{{item.betbonus}}</span>
                    </dd>
                    <dd>
                        <span class="left">投注注数</span>
                        <span class="right">{{item.actionnum}}</span>
                    </dd>
                    <dd>
                        <span class="left">投注返点</span>
                        <span class="right">{{item.fandian}}%</span>
                    </dd>
                    <dd>
                        <span class="left">投注赔率</span>
                        <span class="right">{{item.bonusprop}}</span>
                    </dd>
                    <dd>
                        <span class="left">投注时间</span>
                        <span class="right">{{item.actiontime}}</span>
                    </dd>
                    <dd>
                        <span class="left">是否中奖</span>
                        <span class="right">{{item.zjcount | islottery}}</span>
                    </dd>
                    <dd>
                        <span class="left">中奖金额</span>
                        <span class="right">{{item.bonus}}</span>
                    </dd>
                    <dd>
                        <span class="left">玩法名称</span>
                        <span class="right">{{item.name}}</span>
                    </dd>
                </dl>
            </div>
            <div class="H10"></div>
            <div class="buyCheckDetail">
                <p class="title"><span></span>投注号码</p>
                <dl>
                    <dd>
                        <!--<span class="left">冠军</span>-->
                        <span class="right">{{item.actiondata}}</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'
    export default {
        name: 'pushRecordDetail',
        data () {
            return {
                type:'',
                orderDetail:[]
            }
        },
        components:{
            headCom
        },
        mounted:function(){
            var _self=this;
            this.type=location.href.split('?')[1].split('=')[1] ;

            server.OrderDetail(_self,{
                betId:this.type
            });
            //修改title
            this.$store.commit('changetitle','投注详情');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);
            
        },
        filters: {
            // 如果传过来的为空，则待开奖，如果传过来的非空，则为已开奖
            judge: function(value) {
                if(value) {
                    return value
                } else {
                    return "待开奖"
                }
            },
            // 中奖注数-没中奖为0，中奖为显示注数
            islottery: function(value) {
                if(value == '0') {
                    return '未中奖'
                } else {
                    return '中奖' + value + '注'
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .buyHall{
        margin:0 10px 5px 10px;
    }
    .buyHall a{
        position: relative;
        background: #fff;
        display: block;
    }
    .buyHall .pic{
        position: absolute;
        left:10px;
        top:15px;
        width: 50px;
        height: 50px;
        color: #f54444;
        font-size: 55px;
    }
    .buyHallTitle{
        margin-left: 70px;
        font-size: 16px;
        line-height: 30px;
        padding-top: 18px;
    }
    .buyHallTitle span{
        color: #f54444;
        font-size: 13px;
        margin-left: 5px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .buyHallTime{
        margin-left: 70px;
        font-size: 12px;
        color: #bdbdbd;
        line-height: 20px;
        padding-bottom: 20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .buyCheckDetail{
        margin: 0 10px;
        background: #fff;
    }
    .buyCheckDetail .title{
        line-height: 35px;
        padding: 0 12px;
        position: relative;
        font-size: 14px;
    }
    .buyCheckDetail .title span{
        display: block;
        position: absolute;
        left: 5px;
        top: 7px;
        height: 17px;
        width: 3px;
        background: #f54444;
    }
    .buyCheckDetail  dl{
        padding-bottom: 10px;
    }
    .buyCheckDetail  dl dd{
        position: relative;
        padding-left: 100px;
        line-height: 25px;
        font-size: 14px;
    }
    .buyCheckDetail  dl .left{
        display: inline-block;
        width: 80px;
        text-align: right;
        color: #999999;
        
        position: absolute;
        left:0;top:0;
    }
    .buyCheckDetailBtn{
        height: 60px;
    }
    .buyCheckDetailBtn .con{
        position: fixed;
        left:0;
        bottom:0;
        width: 100%;
        height: 60px;
        background: #fff;
    }
    .buyCheckDetailBtn .con a{
        display: block;
        height: 40px;
        margin:0 10px;
        background: #f54444;
        color: #fff;
        margin-top: 10px;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        font-size: 16px;
    }
</style>

