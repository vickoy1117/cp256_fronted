<template>
    <div class="pushRecordDetail">
        <headCom></headCom>
        <div class="H10"></div>
        <div>
            <div class="buyHall">
                <a href="javascript:">
                    <p class="buyHallTitle">{{title}}</p>
                    <p class="buyHallTime FZ14">{{sendtime}}</p>
                </a>
            </div>
            <div class="H10"></div>
            <div class="buyCheckDetail">
                <p class="title">
                    <span></span>消息内容</p>
                <div class="detailcontent">{{content}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'pushRecordDetail',
    data() {
        return {
            title: '',
            content: '',
            sendtime: '',
            notifyId: ''
        }
    },
    components: {
        headCom
    },
    mounted: function () {
        var _self = this;
        this.notifyId = _self.$route.params.notifyId;
        // if (!this.$store.state.userId || !this.$store.state.token) {
        //     _self.$router.push({
        //         path: '/member/information'
        //     });
        // }
        // this.notifyId=location.href.split('?')[1].split('=')[1];

        server.notifyDetail(_self, {
            notifyId: _self.notifyId
        });
        //修改title
        this.$store.commit('changetitle', '信息详情');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buyHall {
    margin: 0 10px 5px 10px;
}

.buyHall a {
    position: relative;
    background: #fff;
    display: block;
}

.buyHallTitle {
    font-size: 16px;
    line-height: 30px;
    padding-top: 18px;
    text-align: center;
}

.buyHallTime {
    font-size: 12px;
    color: #bdbdbd;
    line-height: 20px;
    padding-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}

.buyCheckDetail {
    margin: 0 10px;
    background: #fff;
    min-height: 300px;
}

.buyCheckDetail .title {
    line-height: 35px;
    padding: 0 12px;
    position: relative;
    font-size: 14px;
}

.buyCheckDetail .title span {
    display: block;
    position: absolute;
    left: 5px;
    top: 7px;
    height: 17px;
    width: 3px;
    background: #f54444;
}

.buyCheckDetail .detailcontent {
    width: 90%;
    margin: 0 auto;
}
</style>

