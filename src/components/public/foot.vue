<template>
    <div class="foot">
        <footer>
            <div class="border_line_top H01"></div>
            <ul class="out">
                <li class="n on" v-for="item in footList">
                    <router-link :to="item.router" >
                        <div class="pic" :class="item.icon"></div>
                        <p>{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'foot',
        data () {
            return {
                footList:[{name:'首页',icon:'icon-home',router:'/index/home'},
                          {name:'购彩',icon:'icon-car',router:'/buyHall/buyHall'},
                          {name:'开奖',icon:'icon-lottery',router:'/lotteryHall/lotteryHall'},
                          {name:'走势',icon:'icon-trend',router:'/trend/trend'},
                          {name:'我的',icon:'icon-account',router:'/member/member'}]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .foot{
        height: 50px;
    }
    footer {
        position: fixed;
        left:0;bottom:0;
        background: #ffffff;
        width: 100%;
        height: 50px;
    }
    footer ul{
        height: 49px;
        width: 100%;
    }
    footer ul li{
        width: 20%;
        font-size: 12px;
        text-align: center;
    }
    footer ul li .pic{
        font-size: 24px;
        padding-top: 5px;
    }
    footer ul li p{
        line-height: 20px;
    }
    footer ul li a.router-link-active{
        color:#f95905; 
    }
</style>
