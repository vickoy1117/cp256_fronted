<template>
    <div class="awardList">
        <headCom></headCom>
        <div class="scrollDivWin">
            <ul>
                <li v-for="item in scrollDivWin"><p><span class="icon-win"></span><span class="num">{{item.username}}</span><span class="money">{{item.bonus}}</span><span class="use">{{item.title}}</span></p></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import server from './../../server'
    import headCom from './../public/headCom'
    export default {
        name: 'awardList',
        data () {
            return {
               scrollDivWin:[]
            }
        },
        components:{
            headCom
        },
        mounted:function(){
            var _self=this;
            server.newWinner(_self,{
                current_page:1,
                page_count:100
            })
            //修改title
            this.$store.commit('changetitle','全部');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     .scrollDivWin{
      margin:0 10px;
      padding-top: 5px;
      height: 105px;
      position: relative;
    }
    .scrollDivWin ul{

      position: absolute;
      left: 0;
      width: 100%;
    }
    .scrollDivWin li{
      line-height: 35px;
        width: 100%;

    }
    .scrollDivWin li span{
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .scrollDivWin li span.icon-win{
      color: #f8ae01;
      font-size: 15px;
      margin-right: 5px;
      margin-left: 10px;
    }
    .scrollDivWin li span.num{
      color: #666666;
      font-size: 16px;
      margin-right: 5px;
      width: 25%;
    }
    .scrollDivWin li span.money{
      color: #f64442;
      font-size: 16px;
      margin-right: 5px;
      width: 20%;
      padding-left:5%;
    }
    .scrollDivWin li span.use{
      color: #666;
      font-size: 15px;
      margin-right: 5px;

    }
</style>
