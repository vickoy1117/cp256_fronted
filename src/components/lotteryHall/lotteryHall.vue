<template>
    <div class="lotteryHall">
        <headCom></headCom>
        <lottery></lottery>
        <foot></foot>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import lottery from './../public/lottery'
    import foot from './../public/foot'
    import server from './../../server'
    export default {
        name: 'lotteryHall',
        components:{
            headCom,lottery,foot
        },
        mounted () {
            var _self=this;
            server.prizeShow(_self);
            //修改title
            this.$store.commit('changetitle','开奖大厅');
            //修改头部返回箭头
            this.$store.commit('changeBack',false);

        }
    }
</script>


