<template>
    <div class="information">
        <headCom></headCom>
        <div class="tab">
            <div class="buyHallTab">
                <ul class="out">
                    <li class="n W33" :class="item.class" v-for="(item, index) in tab" @click="tab_box(index)">
                        <span>
                            <a href="javascript:">{{item.title}}</a>
                        </span>
                    </li>
                </ul>
                <div class=" border_line_top H01px"></div>
            </div>
            <div class="H45"></div>
        </div>
        <div class="listContainer">
            <div class="pushList" v-for="item in informationList">
                <router-link :to="{ name: 'informationDetail', params: { notifyId: item.id }}">
                    <span class="icon-arrow-right"></span>
                    <p>
                        <span class="type">{{item.title}} </span>
                    </p>
                    <p>
                        <span class="gry FZ12">{{item.sendtime}}</span>
                    </p>
                    <div class="H05"></div>
                    <div class=" border_line"></div>
                </router-link>
            </div>
        </div>
        <div class="more" @click="moreBtn">{{moretitle}}</div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import tab from './../public/tab'
import server from './../../server'
export default {
    name: 'information',
    data() {
        return {
            informationList: [],
            tab: [
                { title: '个人消息', class: 'current', orderType: 1 },
                { title: '普通消息', class: '', orderType: 2 },
                { title: '优惠消息', class: '', orderType: 3 },
            ],
            moretitle: '点击加载更多',
            orderType: 1,      // index
            pageNum: 1         // 页码
        }
    },
    components: {
        headCom
    },
    mounted: function () {
        var _self = this;
        this.$store.commit('changeTabwidth', 'W33');
        //修改title
        this.$store.commit('changetitle', '个人消息');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
        
        server.notifyList(_self, {
            // userId: userId,
            // token: token,
            type: 1,
            current_page: 1,
            page_count: 20
        });
    },
    methods: {
        tab_box: function (index) {
            var _self = this;
            _self.moretitle = '点击加载更多'
            _self.pageNum = 1
            for (var i = 0; i < this.tab.length; i++) {
                this.tab[i].class = '';
            }
            _self.informationList = [];
            this.tab[index].class = 'current';
            _self.orderType = this.tab[index].orderType
            server.notifyList(_self, {
                type: _self.orderType,
                current_page: 1,
                page_count: 20
            });
        },
        // 加载更多
        moreBtn () {
            var _self = this;
            _self.pageNum++
            server.notifyList(_self, {
                type: _self.orderType,
                current_page: _self.pageNum,
                page_count: 20
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.memberTable table {
    width: 100%;
    background: #f7f7f7;
}

.memberTable table tr {

    line-height: 50px;
    text-align: center;
}*/
.buyHallTab {
    position: fixed;
    left: 0;
    top: 50px;
    width: 100%;
    height: 45px;
    background: #fff;
    z-index: 10;
}

.buyHallTab li {
    font-size: 15px;
    line-height: 43px;
    text-align: center;
}

.buyHallTab li a {
    display: inline-block;
    color: #000;
    height: 43px;
    border-bottom: solid 2px #fff
}

.buyHallTab li.current a{
    color: #f54444;
    border-bottom: solid 2px #f54444
}

.listContainer {
    height: 100%;
    overflow: scroll;
}

.pushList {
    padding-top: 5px;
    position: relative;
}

.pushList a {
    display: block;
}

.icon-arrow-right {
    position: absolute;
    right: 10px;
    top: 18px;
    width: 16px;
    height: 16px;
    color: #cccccc;
    border: solid 1px #cccccc;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    font-size: 10px;
}

.pushList p {
    margin: 0 40px 0 10px;
    line-height: 22px;
}

.pushList .type {
    font-size: 15px;
    color: #000;
}

.more {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

