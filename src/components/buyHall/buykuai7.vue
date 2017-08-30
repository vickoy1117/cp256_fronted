<!--六合彩 -->
<template>
    <div class="buykuai3">
        <div class="H50">
            <header>
                <p class="back" @click="back">
                    <span class="icon-back"></span>
                </p>
                <p>
                    <span @click="buyHallChose = !buyHallChose">{{groupName}}
                        <span class="icon-arrow-down"></span>
                    </span>
                </p>
                <div class=" border_line"></div>
            </header>
        </div>
        <div class="buyHallDetail">
            <component :is="'buyHallPrimary'"></component>
            <!--<p class="title">
                <span></span>第{{actionno}}期
                <em class="red ML10">{{actiontime}} 截止</em>
            </p>
            <div class="choseTitle">
                <div class="H10"></div>
                <p>{{simpleInfo}}</p>
                <div class="shake"></div>
            </div>-->
            <div class="choseList" v-for="(item,init) in selectGroup">
                <p class="pos tabListName">{{item.keyname}}</p>
                <ul class="out">
                    <li class="n" v-for="(number,index) in item.options" @click="selectgroup(index,init)" :keyname="item.keyname" v-if="!(playedId == 326 || playedId == 330)">
                        <div :class="number.class">{{number.num}}</div>
                        <div v-if="isFixed == 1">{{number.odds}}</div>
                    </li>
                    <!--六合彩-正码特-正四大小(326)为4字的号超出边框，故单独设计-->
                    <li class="n" v-for="(number,index) in item.options" @click="selectgroup(index,init)" :keyname="item.keyname" v-if="playedId == 326 || playedId == 330">
                        <div class="special-num" :class="number.class">{{number.num}}</div>
                        <div v-if="isFixed == 1">{{number.odds}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="H50">
            <div class="buyHallBtn">
                <div class=" border_line"></div>
                <div class="con">
                    <span class="icon-delete" @click="deleteSelect"></span>
                    共{{total}}注 {{totalMoney}}元
                    <span class="fr" @click="toPlay">确认</span>
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
                        <li class="n" v-for="(list,index) in initList.groupList" @click="groupList(index)" :class="list.class" :type="list.groupid">
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
                        <li class="n" v-for="(list,index) in initList.playList" :class="list.class" @click="playList(index)" :type="list.playid">
                            <p :playid="list.playid">{{list.name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="H10"></div>
            </div>
            <div class="bg" @click="buyHallChose = !buyHallChose"></div>
        </div>
        <buyHallSetting :total="total" :totalMoney="totalMoney" :fanDianBdw="fanDianBdw" :bonusprop="bonusprop" :bonuspropbase="bonuspropbase" :gameFanDian="gameFanDian" :myFanDian="myFanDian" :award="award" :highest="highest" v-on:fresh2="freshPro2" v-on:fresh1="freshPro1" :json="json" :json2="json2">
        </buyHallSetting>
        <buyHallCheck :json="json" :json2="json2" :total="total" :groupName="groupName" :totalMoney="totalMoney" :selectGroup="selectGroup" v-on:fresh3="freshPro3" v-on:fresh4="freshPro4" v-on:optionFun="optionFun">
        </buyHallCheck>
    </div>
</template>

<script>
import server from './../../server'
import buyHallSetting from './buyHallSetting'
import buyHallCheck from './buyHallCheck'
import buyHallPrimary from './buyHallPrimary'

export default {
    name: 'buykuai3',
    data() {
        return {
            fanDianBdw: '',         // 返点
            bonusprop: '',          // 赔率
            bonuspropbase: '',
            gameFanDian: '',
            myFanDian: '',
            isFixed: 0,             // 判断是否显示赔率
            award: '',              // 排序后的赔率
            highest: '',            // 最高奖励
            arr: [],                // 存放选中的数字
            arrOdds: [],            // 存放选中的数字的赔率
            changeOdds: [],         // 存放某些特殊彩种的动态赔率
            price: 2,               // 单注金额
            type: '',
            actiontime: '',
            actionno: '',
            buyHallChose: false,    // 控制顶部玩法选项框
            defPlayName: '',
            selectGroup: [],
            initList: {},
            groupName: '',
            playName: '',
            groupId: '',
            playedId: '',
            total: 0,               // 注数
            totalMoney: 0,
            json: {},
            json2: {},
            jsfun: '',              // 不同玩法对应的方法
            arrList: [{ one: [] }, { two: [] }],
            simpleInfo: ''          // 玩法最少选几个号码

        }
    },
    components: {
        buyHallSetting, buyHallCheck,buyHallPrimary
    },
    methods: {
        // 获取投注页面信息的方法
        getPlayDefaultInfo() {
            this.type = location.href.split('?')[1].split('=')[1];
            var _self = this;
            //获取彩种信息
            server.playDefaultInfo(_self, {
                type: this.type
            });
        },
        back: function () {
            this.$router.go(-1);
        },
        groupList: function (index) {
            for (var i = 0; i < this.initList.groupList.length; i++) {
                this.initList.groupList[i].class = '';
            }
            this.initList.groupList[index].class = 'current';
            //改变第一级选项
            this.groupName = this.initList.groupList[index].groupname;
            this.groupId = this.initList.groupList[index].groupid;
            //获取玩法列表
            var _self = this;
            server.played2(_self, {
                groupId: _self.groupId,
            });
            //清空之前选中的注数
            this.total = 0;
            this.totalMoney = 0;
            this.json = {};
            this.json2 = {};
            this.arr = [];
            this.arrOdds = [];
            this.arrList = [{ one: [] }, { two: [] }];
            // 清空投注数据数组
            this.$store.commit('arrList', [])
            // 清空支付页面显示数据数组
            this.$store.commit('betsDisplay', [])
        },
        playList: function (index) {
            for (var i = 0; i < this.initList.playList.length; i++) {
                this.initList.playList[i].class = '';
            }
            this.initList.playList[index].class = 'current';
            this.playName = this.initList.playList[index].name;
            this.playedId = this.initList.playList[index].playid;
            this.jsfun = this.initList.playList[index].jsfun;
            //获取玩法具体参数
            var _self = this;

            server.played(_self, {
                type: this.type,
                playedId: this.initList.playList[index].playid
            });
            //清空之前选中的注数
            this.total = 0;
            this.totalMoney = 0;
            this.json = {};
            this.json2 = {};
            this.arr = [];
            this.arrOdds = [];
            this.arrList = [{ one: [] }, { two: [] }];
            // 清空投注数据数组
            this.$store.commit('arrList', [])
            // 清空支付页面显示数据数组
            this.$store.commit('betsDisplay', [])
        },
        // 选号区
        selectgroup: function (index, init) {
            var _self = this;
            if (this.selectGroup[init].options[index].class == 'current') {
                this.selectGroup[init].options[index].class = '';
                //取消选中的数字
                var num = this.selectGroup[init].options[index].num;
                var selectIndex = this.arr[init].indexOf(num);
                if (selectIndex > -1) {
                    this.arr[init].splice(selectIndex, 1);
                }
                // 取消选中的数字的赔率
                if (_self.isFixed == 1) {
                    var odds = this.selectGroup[init].options[index].odds;
                    this.arrOdds[init].splice(selectIndex, 1);
                }
                // 动态赔率
                if (_self.isFixed == 2) {
                    if (_self.changeOdds[_self.arr[init].length]) {
                        _self.$store.commit('changeOdds', _self.changeOdds[_self.arr[init].length])
                    }
                }

            } else {
                this.selectGroup[init].options[index].class = 'current';
                var num = this.selectGroup[init].options[index].num;
                addArr(init, num)
                // 如果赔率固定，同步插入addarrOdds数组
                if (_self.isFixed == 1) {
                    var odds = this.selectGroup[init].options[index].odds;
                    addarrOdds(init, odds)
                }
                // 动态赔率
                if (_self.isFixed == 2) {
                    if (_self.changeOdds[_self.arr[init].length]) {
                        _self.$store.commit('changeOdds', _self.changeOdds[_self.arr[init].length])
                    }
                }
            };
            //添加this.arr（把选择的号插入数组）
            function addArr(initNum, addNum) {
                if (_self.arr[initNum] instanceof Array) {
                    _self.arr[initNum].push(addNum);
                    // _self.arr[initNum].sort();
                } else {
                    _self.arr[initNum] = [];
                    _self.arr[initNum].push(addNum);
                    // _self.arr[initNum].sort()
                }
                // 将选择的号码传给vuex保存
                console.log('_self.arr:' + _self.arr[initNum])
                _self.$store.commit('arr', _self.arr[initNum])
            };
            // 添加this.arrOdds（把选择的号的固定赔率插入数组）
            function addarrOdds(initNum, addOdds) {
                if (_self.arrOdds[initNum] instanceof Array) {
                    _self.arrOdds[initNum].push(addOdds);
                } else {
                    _self.arrOdds[initNum] = [];
                    _self.arrOdds[initNum].push(addOdds);
                    // _self.arrOdds[initNum].sort()
                }
                // 将选择的号码的赔率传给vuex保存
                console.log('_self.arrOdds:' + _self.arrOdds[initNum])
                _self.$store.commit('odds', _self.arrOdds[initNum])
                // 用作固定赔率最高奖励之用传递给buyHallSetting使用
                _self.award = Math.max.apply(null, _self.arrOdds[initNum])
            }

            // 根据彩种调用相应方法
            switch (this.jsfun) {
                case 'combineshaw':                      // 合肖  限制11个数  1注
                    maximum(11, 1);
                    break;
                case 'optionalMiss':                     // 自选不中  限制11个数 1注 
                    maximum(11, 1);
                    break;
                // case 'evenYardsMidTwo':                  // 连码-中二 限制7个数  动态注数
                //     maximum(7);
                //     combineSelect(3);
                //     break;
                case 'evenYardsInAllThree':              // 连码-三全中 限制10个 动态注数
                    maximum(10);
                    combineSelect(3);
                    break;
                case 'evenYardsInAllTwo':               // 连码-二全中 限制7个 注数动态
                    maximum(7);
                    combineSelect(2);
                    break;
                // case 'evenYardsMidSpecial':             // 连码-中特  限制7个  1注
                //     maximum(7, 1);
                //     break;
                case 'evenYardsSpecialBunch':           // 连码-特串 限制7个 注数动态
                    maximum(7);
                    combineSelect(2);
                    break;
                case 'evenYardsInAllFour':              // 连码-四全中 限制10个 注数动态
                    maximum(10);
                    combineSelect(4);
                    break;
                case 'shawTwo':
                case 'tailTwo':
                    combineSelect(2);
                    break;
                case 'shawThree':
                case 'tailThree':
                    combineSelect(3);
                    break;
                case 'shawFour':
                case 'tailFour':
                    combineSelect(4);
                    break;
                case 'shawFive':
                case 'tailFive':
                    combineSelect(5);
                    break;
                default:
                    eval(this.jsfun + '()');            // 大多数基础方法
                    break;
            }

            // 基础六合彩注数算法
            function sixSelect() {
                _self.total = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array) {
                        _self.total += _self.arr[i].length;
                    }
                }
            }

            // 动态注数计算方法
            function combineSelect(num) {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length > (num - 1)) {
                        var dCode = _self.arr[0];
                        var dLen = _self.arr[0].length;
                        _self.total = combine(dCode, num).length;
                        console.log('total' + _self.total)
                        _self.$store.commit('total', _self.total)
                    } else {
                        _self.total = 0;
                    }
                } else {
                    _self.total = 0;
                }
            }

            // 动态注数的计算方法
            function combine(arr, num) {
                var r = [];
                (function f(t, a, n) {
                    if (n == 0) return r.push(t);
                    for (var i = 0, l = a.length; i <= l - n; i++) {
                        f(t.concat(a[i]), a.slice(i + 1), n - 1);
                    }
                })([], arr, num);
                return r;
            }

            // 可选号数量最大值max，某些彩种一次只能购买一注由value控制
            function maximum(max, value) {
                _self.total = 0;    // 注数
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array) {
                        _self.total += _self.arr[i].length;
                        if (_self.total > max) {
                            // 获取选号数组的第一个被选中的数
                            var place = _self.arr[0][0]
                            // 循环找到最早被选中数，取消他的选中
                            for (var i = 0; _self.selectGroup[0].options[i]; i++) {
                                if (_self.selectGroup[0].options[i].num == place) {
                                    _self.selectGroup[0].options[i].class = "";
                                }
                            }
                            // 从选中数组中删除第一个数
                            _self.arr[0].splice(0, 1);
                            // 注数超过最大限制，减1
                            _self.total--;
                        }
                    }
                }
                // 如果value为非false，注数统一为1注
                if (value) {
                    _self.total = 1;
                }
            }
        },
        // 清空
        deleteSelect: function () {
            for (var i = 0; i < this.selectGroup.length; i++) {
                for (var j = 0; j < this.selectGroup[i].options.length; j++) {
                    this.selectGroup[i].options[j].class = "";
                }
            };
            this.arr = [];
            this.arrOdds = [];
            this.total = 0;
            this.totalMoney = 0;
            this.$store.commit('total', 0);
            this.arrList = [{ one: [] }, { two: [] }];
            for (var i = 0; i < this.selectGroup.length; i++) {
                this.selectGroup[i].number = 0;
                this.selectGroup[i].numberList = [];
            }
        },
        // 确认
        toPlay: function () {
            // 规则：
            // 特码B（305、306）、特码A（309、310）、色波（311~313）、特肖(314)、
            // 头尾数(316)、正码(317、318)、正码特(319~330)、正码1-6(331~336)、
            // 五行(337)、平特-肖尾数(338、339)、正肖（340）、7色波（341）、总肖（342）： 1号1注，可全选，赔率固定
            // 合肖 combineshaw（315）:共一注，最少2个可选11个，动态赔率
            // 自选不中（343）：共一注、最少6个可选11个，动态赔率
            // 连肖连尾—二连肖 shawTwo（344）：注数动态，最少选2个可全选，赔率按固定赔率中最低的算 
            // 连肖连尾—三连肖 shawThree（345）：注数动态，最少选3个可全选，赔率按固定赔率中最低的算
            // 连肖连尾—四连肖 shawFour（346）：注数动态，最少选4个可全选，赔率按固定赔率中最低的算 
            // 连肖连尾—五连肖 shawFive（347）：注数动态，最少选5个可全选，赔率按固定赔率中最低的算
            // 连肖连尾-二连尾 tailTwo（348）：注数动态，最少选2个可全选，赔率按固定赔率中最低的算
            // 连肖连尾-三连尾 tailThree（349）：注数动态，最少选3个可全选，赔率按固定赔率中最低的算
            // 连肖连尾-四连尾 tailFour（350）：注数动态，最少选4个可全选，赔率按固定赔率中最低的算
            // 连肖连尾-五连尾 tailFive（351）：注数动态，最少选5个可全选，赔率按固定赔率中最低的算
            // 连码-中二（352）：注数动态，最少3个可选7个，赔率固定
            // 连码-三全中（353）：注数动态，最少3个可选10个，赔率固定
            // 连码-二全中（354）：注数动态，最少2个可选7个，赔率固定
            // 连码-中特（355），共一注，最少2个可选7个，赔率固定
            // 连码-特串（356）：注数动态，最少2个可选7个，赔率固定
            // 连码-四全中（357）：注数动态，最少4个可选10个，赔率固定

            var _self = this;
            // 根据传过来的玩法判断至少需要几注
            if (this.playedId == 315 || this.playedId == 344 || this.playedId == 348 || this.playedId == 354 || this.playedId == 355 || this.playedId == 356) {
                errorNum(0, 2)
            } else if (this.playedId == 345 || this.playedId == 349 || this.playedId == 352 || this.playedId == 353) {
                errorNum(0, 3)
            } else if (this.playedId == 346 || this.playedId == 350 || this.playedId == 357) {
                errorNum(0, 4)
            } else if (this.playedId == 347 || this.playedId == 351) {
                errorNum(0, 5)
            } else if (this.playedId == 343) {
                // 自选不中
                errorNum(0, 6)
            } else {
                //调用该方法
                eval(this.jsfun + '()')
            }
            //六合彩算法
            function sixSelect() {
                var dataList = [];
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array) {
                        dataList[i] = _self.arr[i].join(' ');
                    } else {
                        dataList[i] = '-'
                    }
                };
                _self.json.actionData = [dataList.join(',')];
                sendDate();
            }
            //判断最低选择的位数
            function errorNum(initW, lest) {
                var fullNum = true;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] == undefined || _self.arr[i].length == 0) {
                        errMSg('请选择' + _self.selectGroup[i].keyname)
                        fullNum = false;
                        return;
                    } else if (_self.arr[initW] instanceof Array) {
                        if (_self.arr[initW].length < lest) {
                            errMSg(_self.selectGroup[initW].keyname + '至少选择' + lest + '个');
                            fullNum = false;
                            return;
                        }
                    }
                }
                if (fullNum) {
                    actionData2();
                    sendDate();
                }
            }
            //错误提示
            function errMSg(msg) {
                layer.open({
                    content: msg,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            }

            function actionData() {
                _self.json.actionData = [_self.arr[0].join(',')];
            }
            function actionData2() {
                var arrJoin = [];
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.playedId == '93') {
                        arrJoin[i] = _self.arr[i].join(',');
                    }
                    else {
                        arrJoin[i] = _self.arr[i].join(' ');
                    }
                };
                _self.json.actionData = [arrJoin.join(',')];
            }
            //发送给后台的数据
            function sendDate() {
                _self.json.actionNum = _self.total;
                _self.json.playedGroup = _self.groupId;
                _self.json.playedId = _self.playedId;
                _self.json.type = _self.type;
                _self.json.actionNo = _self.actionno;
                _self.json.weiShu = 0;
                _self.json.beiShu = 1;

                _self.$store.commit('buySetting', true)
            }
            // 当赔率为动态赔率时修改award的值
            if (_self.isFixed == 2) {
                console.log('changeOdds:', this.$store.state.changeOdds)
                this.award == this.$store.state.changeOdds
                console.log('_self.award:' + _self.award)
            }
        },
        freshPro2: function (b) {
            this.totalMoney = b.totalMoney;
            this.price = b.price;
        },
        freshPro1: function (b) {
            this.json2 = b
        },
        // 自选号
        optionFun() {
            console.log('optionFun click')
            this.arr = [];
            this.arrOdds = [];
            this.total = 0;
            this.totalMoney = 0;
            this.arrList = [{ one: [] }, { two: [] }];
            for (var i = 0; i < this.selectGroup.length; i++) {
                for (var j = 0; j < this.selectGroup[i].options.length; j++) {
                    this.selectGroup[i].options[j].class = "";
                }
            };
            for (var i = 0; i < this.selectGroup.length; i++) {
                this.selectGroup[i].number = 0;
                this.selectGroup[i].numberList = [];
            }
        },
        // 清空
        freshPro3: function (b) {
            this.arr = [];
            this.arrOdds = [];
            this.total = 0;
            this.totalMoney = 0;
            this.arrList = [{ one: [] }, { two: [] }];
            this.$store.commit('arrList', [])
            console.log('清空后的arrList:', this.$store.state.arrList)
            for (var i = 0; i < this.selectGroup.length; i++) {
                for (var j = 0; j < this.selectGroup[i].options.length; j++) {
                    this.selectGroup[i].options[j].class = "";
                }
            };
            for (var i = 0; i < this.selectGroup.length; i++) {
                this.selectGroup[i].number = 0;
                this.selectGroup[i].numberList = [];

            }
        },
        // 机选一注
        freshPro4: function (b) {
            if (this.$store.state.isFixed == 1) {
                this.arr[0].push(b);
                this.$store.commit('arr', this.arr[0])
            } else {
                this.arr.push(b);
            }
            this.total += 1;
        },
    },
    watch: {
        initList: function (val) {
            this.selectGroup = this.initList.playedconfig.config.selectGroup;
            this.defPlayName = this.initList.defPlayName;
            this.groupName = this.initList.groupList[0].groupname;
            this.playName = this.initList.playList[0].name;
            this.actionno = this.initList.actionNo.actionno;
            this.actiontime = this.initList.actionNo.actiontime;
            this.groupId = this.initList.playedconfig.groupId;
            this.playedId = this.initList.playList[0].playid;
            this.jsfun = this.initList.playList[0].jsfun;
            //用于计算返利
            var bonusprop = this.initList.playedconfig.config.bonusprop;
            var bonuspropbase = this.initList.playedconfig.config.bonuspropbase;
            var gameFanDian = this.initList.playedconfig.config.gameFanDian;
            var myFanDian = this.initList.playedconfig.config.myFanDian;
            this.fanDianBdw = this.initList.playedconfig.config.fanDianBdw;
            this.bonusprop = bonusprop;
            this.bonuspropbase = bonuspropbase;
            this.gameFanDian = gameFanDian;
            this.myFanDian = myFanDian;
        },
        total: function (val) {
            this.totalMoney = (val * this.price).toFixed(2);
        }
    },
    mounted: function () {
        // 获取投注页面信息的方法
        this.getPlayDefaultInfo();
        // 清空投注数据数组
        this.$store.commit('arrList', [])
        // 清空支付页面显示数据数组
        this.$store.commit('betsDisplay', [])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back {
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
}

.icon-back {
    font-size: 18px;
    color: #666;
}


/*购买大厅详情*/

.buyHallDetail .title {
    position: relative;
    padding: 0 10px 0 20px;
    background: #fff;
    line-height: 35px;
    font-size: 14px;
    color: #666;
}

.buyHallDetail .title span {
    position: absolute;
    left: 10px;
    top: 7px;
    width: 3px;
    height: 20px;
    background: #f54444;
}

.buyHallDetail .choseTitle {
    line-height: 40px;
    margin: 0 10px;
    color: #666;
    font-size: 15px;
}

.buyHallDetail .choseList {
    position: relative;
}

.buyHallDetail .choseList .pos {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #666;
    background: #e3e2e2;
    border-radius: 20px;
    padding: 5px 8px;
}

.buyHallDetail .choseList ul {
    margin: 10px 10px 0 90px;
}

.buyHallDetail .choseList ul li {
    margin: 0 10px 10px 0;
}

.buyHallDetail .choseList ul li div:first-child {
    width: 40px;
    height: 40px;
    background: #fff;
    border: solid 1px #dfdfdf;
    color: #f54444;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
}

.buyHallDetail .choseList ul li .special-num {
    /*为326单独设计的样式*/
    width: 70px !important;
}

.buyHallDetail .choseList ul li div:nth-child(2) {
    height: 15px;
    font-size: 10px;
    margin: 3px 0 0 0;
    color: #999;
    text-align: center;
}

.buyHallDetail .choseList ul li div.current {
    color: #fff;
    background: #f54444;
    /*border: solid 1px #f54444;*/
}

.buyHallDetail .choseList2 {
    position: relative;
}

.buyHallDetail .choseList2 .pos {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #666;
    background: #e3e2e2;
    border-radius: 20px;
    padding: 5px 8px;
}

.buyHallDetail .choseList2 ul {
    margin: 10px 10px 0 70px;
}

.buyHallDetail .choseList2 ul li {
    height: 40px;
    background: #fff;
    border: solid 1px #dfdfdf;
    color: #f54444;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    padding: 0 10px;
}

.buyHallDetail .choseList2 ul li.current {
    color: #fff;
    background: #f54444;
    border: solid 1px #f54444;
}

.buyHallBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
}

.buyHallBtn .con {
    height: 49px;
    background: #fff;
    padding: 0 10px 0 60px;
    line-height: 49px;
    font-size: 15px;
    color: #000;
    position: relative;
}

.buyHallBtn .icon-delete {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    display: block;
    text-align: center;
    line-height: 50px;
    color: #999;
    font-size: 25px;
}

.buyHallBtn .border_lineLeft {
    left: 50px;
    top: 10px;
    height: 30px;
}

.buyHallBtn .fr {
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

.buyHallChose {
    position: fixed;
    left: 0;
    width: 100%;
    top: 50px;
    height: 100%;
}

.buyHallChose .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.buyHallChose .con {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 5;
}

.buyHallChose .con .title {
    height: 15px;
    border-top: solid 1px #f54444;
    ;
    position: relative;
    margin-bottom: 5px;
}

.buyHallChose .con .title p {
    position: absolute;
    background: #fff;
    left: 50%;
    top: -15px;
    line-height: 30px;
    text-align: center;
    padding: 0 5px;
    min-width: 80px;
    margin-left: -45px;
    font-size: 15px;
    color: #f54444;
    ;
}

.buyHallChose .con ul {
    margin-left: 10px;
}

.buyHallChose .con ul li {
    width: 33.3%;
}

.buyHallChose .con ul li.current {
    color: #f54444;
    ;
}

.buyHallChose .con ul li p {
    margin: 0 10px 10px 0;
    border-radius: 5px;
    border: solid 1px #dedede;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
}
</style>

