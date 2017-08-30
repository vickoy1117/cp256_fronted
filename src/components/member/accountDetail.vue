<template>
    <div class="accountDetail">
        <headCom></headCom>
        <div class="tab">
            <div class="buyHallTab">
                <ul class="out">
                    <li class="n" :class="item.class" v-for="(item, index) in tab" @click="tab_box(index)">
                        <span>
                            <a href="javascript:">{{item.title}}</a>
                        </span>
                    </li>
                </ul>
                <div class=" border_line_top H01px"></div>
            </div>
            <div class="H45"></div>
        </div>
        <div class="rootList">
            <ul>
                <li v-for="item in root">
                    <div class="leftTime">
                        <span class="FZ14">{{item.actiontime | cutDate}}</span>
                        <span class="FZ12">{{item.actiontime | cutTime}}</span>
                    </div>
                    <p class="rootLogo" :class="item.liqtype | cutBg">{{item.liqtype | cutLogo}}</p>
                    <p class="rootInfo FZ14">{{item.info}}</p>
                    <div class="rightMoney">
                        <span :class="item.liqtype | cutColor">{{item.coin}}</span>
                        <span class="gry FZ12">余额：{{item.usercoin}}元</span>
                    </div>
                    <div class=" border_line_top H01px"></div>
                </li>
            </ul>
        </div>
        <div class="more" @click="moreBtn">{{moretitle}}</div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'

export default {
    name: 'accountDetail',
    data() {
        return {
            tab: [{ title: '全部', class: 'current', liqType: 0 },
            { title: '充值', class: '', liqType: 1 },
            { title: '投注', class: '', liqType: 101 },
            { title: '中奖', class: '', liqType: 6 },
            { title: '提现', class: '', liqType: 107 }],
            root: [],
            moretitle: '点击加载更多',
            liqType: 0,
            pageNum: 1          // 页码
        }
    },
    components: {
        headCom
    },
    methods: {
        //筛选弹框的事件
        tab_box: function (index) {
            var _self = this;
            _self.moretitle = '点击加载更多'
            _self.pageNum = 1
            for (var i = 0; i < this.tab.length; i++) {
                this.tab[i].class = '';
            }
            this.tab[index].class = 'current';
            _self.root = [];
            //修改选中的id
            _self.liqType = this.tab[index].liqType;

            server.accountChange(_self, {
                liqType: _self.liqType,
                current_page: _self.pageNum,
                page_count: 20
            });
        },
        // 加载更多
        moreBtn() {
            var _self = this;
            _self.pageNum++
            server.accountChange(_self, {
                liqType: _self.liqType,
                current_page: _self.pageNum,
                page_count: 20
            });
        }
    },
    filters: {
        cutDate: function (value) {
            if (value) {
                var str = value.split(' ')[0]
                var arr = str.split('-').slice(1, 3)
                return arr.join('-')
            }
        },
        cutTime: function (value) {
            if (value) {
                return value.split(' ')[1]
            }
        },
        cutLogo: function (value) {
            switch (value) {
                case '1':
                    return '充'
                case '101':
                    return '投'
                case '6':
                    return '中'
                case '107':
                    return '提'
            }
        },
        cutBg: function (value) {
            switch (value) {
                case '1':
                    return 'blue'
                case '101':
                    return 'yellow'
                case '6':
                    return 'red'
                case '107':
                    return 'green'
            }
        },
        cutColor: function (value) {

            switch (value) {
                case '1':
                    return 'colorred'
                case '101':
                    return 'colorblue'
                case '6':
                    return 'colorred'
                case '107':
                    return 'colorblue'
            }
        }
    },
    mounted: function () {
        var _self = this;

        server.accountChange(_self, {
            liqType: 0,
            current_page: 1,
            page_count: 20
        });
        //修改title
        this.$store.commit('changetitle', '资金明细');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blue {
    background: #019fe8;
}

.yellow {
    background: #f7ad00;
}

.red {
    background: #019fe8;
}

.green {
    background: #46c4ee;
}

.colorred {
    color: #019fe8;
}

.colorblue {
    color: #019fe8;
}

.rootList {
    background: #fff;
}

.rootList li {
    position: relative;

    height: 80px;
}

.rootList li .leftTime {
    position: absolute;
    left: 10px;
    top: 20px;
    color: #999;
    width: 50px;
    text-align: center;
}

.rootLogo {
    position: absolute;
    left: 70px;
    top: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
}

.rootInfo {
    padding-left: 120px;
    line-height: 80px;
}

.rightMoney {
    position: absolute;
    right: 10px;
    top: 20px;
    text-align: right;
}

.rightMoney span {
    display: block;
}

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
    width: 20%;
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

.more {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

