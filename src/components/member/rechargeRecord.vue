<template>
    <div class="rechargeRecord">
        <headCom></headCom>
        <div class="tab">
            <div class="buyHallTab" >
                <ul class="out">
                    <li class="n W50"  :class="item.class" v-for="(item, index) in tab" @click="tab_box(index)"><span><a href="javascript:">{{item.title}}</a></span></li>
                </ul>
                <div class=" border_line_top H01px"></div>
            </div>
            <div class="H45"></div>
        </div>
        <div class="memberTable rechargeRecord">
            <table>
                <tr v-for="item in recharge_list">
                    <td class="W33">
                        <p>{{dec}}</p>
                        <div class=" border_line"></div>
                    </td>
                    <td class="green W33">
                        <p>{{item.amount}}元</p>
                        <div class=" border_line"></div>
                    </td>
                    <td class="gry W33">
                        <p>
                            <span style="padding-top:7px;">{{item.actiondate}}</span>
                            <span>{{item.actiontime}}</span>
                        </p>
                        <div class=" border_line"></div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'

    import server from './../../server'
    export default {
        name: 'rechargeRecord',
        data () {
            return {
                recharge_list:[],
                dec:'待审核',
                tab:[{title:'待审核',class:'current',state:0},
                    {title:'已存入',class:'',state:1},
                    //{title:'待存入',class:'',state:-1},
                   ]

            }
        },
        components:{
            headCom
        },
        methods:{
            //筛选弹框的事件
            tab_box: function (index) {
                for(var i=0;i<this.tab.length;i++){
                    this.tab[i].class='';
                }
                this.tab[index].class='current';
                this.dec=this.tab[index].title;
                //修改选中的id
                var _self=this;
                server.rechargeRecord(_self,{
                    state:this.tab[index].state
                });
            },
            confirmPay : function(rechargeId)
            {

                var _self=this;
                 server.rechargePay(_self,{
                    id:rechargeId
                },function(){
                      _self.tab_box(0);
                });
            }
        },
        mounted:function(){
            var _self=this;
            server.rechargeRecord(_self,{
                state:0
            });
            //修改title
            this.$store.commit('changetitle','充值记录');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .memberTable table{
        width: 100%;
        background: #f7f7f7;
    }
    .memberTable table tr{

        line-height: 50px;
        text-align: center;
    }
    .memberTable table p{
        height: 50px;
    }
    .memberTable table p span{
        height: 18px;
        line-height: 18px;
        display: block;
        font-size: 12px;
    }
    .buyHallTab{
      position: fixed;
      left:0;top:50px;
      width: 100%;
      height: 45px;
      background: #fff;
      z-index: 10;
    }
    .buyHallTab li{
      font-size: 15px;
      line-height: 43px;
      text-align: center;
    }
    .buyHallTab li a{
      display: inline-block;
      color: #000;
      height: 43px;
      border-bottom:solid 2px #fff
    }
    .buyHallTab li.current a{
      color: #f54444;
      border-bottom:solid 2px #f54444
    }
</style>

