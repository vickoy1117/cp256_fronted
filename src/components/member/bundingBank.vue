<template>
    <div class="bundingBank">
        <headCom></headCom>
        <!--<p class="MB10 LH40">开户名：{{this.$store.state.realName}}</p>-->		
        <dl class="MB10">
		    <dd class="W100 bankUserName">
			    <p><span>开户人姓名 :</span> <input type="text" placeholder="请输入开户名" v-model="bankUserName"></p>
			</dd>
            <dd class="W100">
                <p class="bank" @click="bankShow">{{bankName}}
                    <span class="icon-arrow-down icon"></span>
                </p>
            </dd>
            <dd>
                <ul class="out province">
                    <li class="n W50">
                        <p class="" @click="proShow">{{proName}}
                            <span class="icon-arrow-down icon"></span>
                        </p>
                    </li>
                    <li class="n W50">
                        <p class="" @click="cityShow">{{cityName}}
                            <span class="icon-arrow-down icon"></span>
                        </p>
                    </li>
    
                </ul>
            </dd>
            <dd class="W100 bankInp">
                <p>
                    <span>支行</span>
                    <input type="text" placeholder="请输入支行名称" v-model="countname">
                </p>
    
            </dd>
            <dd class="W100 bankInp">
                <p>
                    <span>卡号</span>
                    <input type="text" placeholder="请输入储蓄卡号" v-model="account">
                </p>
			<dd class="W100 coinPassword">
			  <p><span>交易密码：</span><input type="text" placeholder="请输入交易密码" v-model="coinPassword"></p>
            </dd>
        </dl>
        <div class="H10"></div>
        <div class="MB10" @click="bankBtn">
            <span class="btn">确认</span>
        </div>
        <div class="H20"></div>
        <div class="MB10">
            <p class="red FZ14 LH20">温馨提示</p>
            <p class="gry3 FZ12 LH18">1.请勿绑定信用卡，如绑定信用卡将无法提款。</p>
            <p class="gry3 FZ12 LH18">2.银行卡号绑定后不可随意修改，请慎重填写</p>
            <p class="gry3 FZ12 LH18">3.请确保绑定银行卡的开户名和真实姓名一致，如不一致将无法提款</p>
        </div>
    
        <div class="list" v-show="listShow">
            <div class="con" :style="{height: height + 'px' }">
                <p>{{listName}}</p>
                <div class=" border_line"></div>
                <ul>
                    <li v-for="(item,index) in list" @click="chose(index)">
                        <p v-show="item.name">{{item.name}}</p>
                        <p v-show="item.areaname">{{item.areaname}}</p>
                        <div class=" border_line"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'bundingBank',
    data() {
        return {
            bankName: '请选择银行',
            proName: '请选择省份',
            cityName: '请选择城市',
            list: [],
            listName: '',
            bank: {},
            countname: '',
            account: '',
				bankUserName:'',
				coinPassword:'',
            listShow: false,
            height: '',
        }
    },
    components: {
        headCom
    },
    methods: {
        back: function () {
            this.$router.push({ path: '/member/member' });
        },
        bankShow: function () {
            var _self = this;
            this.listName = '请选择银行';
            this.listShow = true;

            server.getBankAndArea(_self);
        },
        proShow: function () {
            var _self = this;
            server.getProvinceList(_self);
            this.listName = '请选择省份';
            this.listShow = true;
        },
        cityShow: function () {
            this.listName = '请选择城市';
            var _self = this;
            server.getCitys(_self, {
                provinceId: this.bank.provinceId
            });
            this.listShow = true;
        },
        chose: function (index) {
            if (this.listName == '请选择银行') {
                console.info(this.list)
                this.bank.bankId = this.list[index].id;
                this.bankName = this.list[index].name;
            } else if (this.listName == '请选择省份') {
                this.bank.provinceId = this.list[index].areaid;
                this.proName = this.list[index].areaname;
            } else if (this.listName == '请选择城市') {
                this.bank.cityId = this.list[index].areaid;
                this.cityName = this.list[index].areaname;
            };
            this.listShow = false;
        },
        bankBtn: function () {
            var errMsg = function (data) {
                layer.open({
                    content: data,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            };
            if (this.bank.bankId == '') {
                errMsg('请选择银行');
            } else if (this.bank.provinceId == '') {
                errMsg('请选择省份');
            } else if (this.bank.cityId == '') {
                errMsg('请选择城市');
            } else if (this.countname == '') {
                errMsg('请填写支行');
            } else if (this.account == '') {
                errMsg('请填写银行卡号');
            } else {
                var _self = this;

                server.addBank(_self, {
                    bankId: this.bank.bankId,
                    provinceId: this.bank.provinceId,
                    cityId: this.bank.cityId,
                    account: this.account,
                    countname:this.countname,
		    bankUserName:this.bankUserName,
		    coinPassword:this.coinPassword,
                })
            }
        }
    },
    mounted: function () {
        var _self = this;
        //server.getBankList(_self);
        //修改title
        this.$store.commit('changetitle', '绑定银行卡');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
        //修改头部返回箭头
        this.height = $(window).height() - 60;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    z-index: 10;
}

.back {
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
}

.icon-back {
    font-size: 20px;
    color: #666;
}

.list {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 11;
}

.list .con {
    margin: 30px 20px;
    border-radius: 5px;
    background: #fff;
    overflow-y: auto;
}

.list .con p {
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #666;
}

.list .con li p {
    text-align: center;
    line-height: 45px;
    color: #4aaefa;
    font-size: 16px;
    background: #fff;
}

dl {
    font-size: 15px;
}

dl dd {
    margin-bottom: 10px;
}

dl dd.W100 {

    height: 35px;
    background: #fff;
    border-radius: 5px;
    display: block;
}

.province li:nth-child(1) p {
    margin-right: 8px;
}

.province li:nth-child(2) p {
    margin-left: 8px;
}

.province li p {
    line-height: 35px;
    border-radius: 5px;
    position: relative;
    padding: 0 10px;
    background: #fff;
    color: #b5b5b5;
    font-size: 14px;
}

.bank {
    line-height: 35px;
    padding: 0 10px;
    color: #b5b5b5;
    font-size: 14px;
    position: relative;
}

span.icon {
    position: absolute;
    color: #b5b5b5;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 15px;
}

.bankInp {
    padding-left: 50px;
    line-height: 35px;
    position: relative;
}

.bankInp span {
    position: absolute;
    left: 10px;
    line-height: 35px;
    top: 0;
    font-size: 14px;
}

.bankInp input {
    width: 100%;
    height: 35px;
    font-size: 14px;
    color: #b5b5b5;
}
	.coinPassword{
        padding-left: 80px;
        line-height: 35px;
        position: relative;
    }
    .coinPassword span{
        position: absolute;
        left:10px;
        line-height: 35px;
        top:0;
        font-size: 14px;
    }
    .coinPassword input{
        width: 100%;
        height: 35px;
        font-size: 14px;
        color:#b5b5b5; 
    }
	
	.bankUserName{
        padding-left: 90px;
        line-height: 35px;
        position: relative;
    }
    .bankUserName span{
        position: absolute;
        left:10px;
        line-height: 35px;
        top:0;
        font-size: 14px;
    }
    .bankUserName input{
        width: 100%;
        height: 35px;
        font-size: 14px;
        color:#b5b5b5; 
    }
.gry3 {
    color: #666;
}

.LH18 {
    line-height: 18px;
}

.btn {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    background: #f54444;
    font-size: 16px;
}
</style>

