<template>
    <div class="pushRecord">
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
            <div class="pushList" v-for="item in orderList">
                <router-link :to="{ path: '/member/pushRecordDetail', query: { id: item.id }}">
                    <span class="icon-arrow-right"></span>
                    <p>
                        <span class="type">{{item.name}} </span>
                        <span class="fr gry">{{item.lotteryno | judge}}</span>
                    </p>
                    <p>
                        <span class="gry FZ12">{{item.actiontime}}</span>
                        <span class="red fr">{{item.bonus}}</span>
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
import server from './../../server'

export default {
    name: 'pushRecord',
    data() {
        return {
            orderList: [],
            tab: [
                { title: '全部订单', class: 'current', orderType: 0 },
                // {title:'我的追号',class:'',orderType:1},
                { title: '我的中奖', class: '', orderType: 2 },
                { title: '待开奖', class: '', orderType: 3 },
            ],
            dec: '',
            moretitle: '加载更多',
            orderType: 0,      // index
            pageNum: 1         // 页码
        }
    },
    components: {
        headCom
    },
    methods: {
        //筛选弹框的事件
        tab_box: function (index) {
            var _self = this;
            _self.moretitle = '加载更多'
            _self.pageNum = 1
            for (var i = 0; i < this.tab.length; i++) {
                this.tab[i].class = '';
            }
            _self.orderList = [];
            this.tab[index].class = 'current';
            _self.orderType = this.tab[index].orderType
            server.getOrderHistory(_self, {
                orderType: _self.orderType,
                current_page: 1,
                page_count: 20
            });
        },
        // 加载更多
        moreBtn () {
            var _self = this;
            _self.pageNum++
            server.getOrderHistory(_self, {
                orderType: _self.orderType,
                current_page: _self.pageNum,
                page_count: 20
            });
        }
    },
    mounted: function () {
        var _self = this;

        server.getOrderHistory(_self, {
            orderType: 0,
            current_page: 1,
            page_count: 20
        });
        //修改title
        this.$store.commit('changetitle', '投注记录');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
    },
    filters: {
        // 如果传过来的为空，则待开奖，如果传过来的非空，则为已开奖
        judge: function(value) {
            if(value) {
                return "已开奖"
            } else {
                return "待开奖"
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.buyHallTab li.current a {
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

