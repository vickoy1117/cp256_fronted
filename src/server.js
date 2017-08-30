import Vue from 'vue'

const doApi = function (url) {
  return '/api/' + url;
};

const ajaxRequest = function (VueObj, url, type, data, callback) {
  // 播放加载动画
  VueObj.$parent.loading = true
  data = data || {};
  if (!VueObj.$store.state.userId || !VueObj.$store.state.token) {
    // console.log('!vuex');
    if (iBHLYZX.isLogined()) {
      // console.log('islogined');
      data.userId = JSON.parse(iBHLYZX.getToken()).userid || '';
      data.token = JSON.parse(iBHLYZX.getToken()).token || '';
    } else {
      // console.log('!logined');
      data.userId = '';
      data.token = '';
    }
  } else {
    // console.log('invuex');
    data.userId = VueObj.$store.state.userId
    data.token = VueObj.$store.state.token
  }

  // console.log('data:' + JSON.stringify(data));
  for (const i in data) {
    if (!data[i] && data[i] !== 0 && (data[i].length && data[i].length > 0)) {
      delete data[i]
    }
  }
  return $(function () {
    // console.log('params:' + JSON.stringify(data));
    $.ajax({
      url: doApi(url),
      type: type,
      data: data,
      dataType: "json",
      success: function (data) {
        //console.log('result:' + JSON.stringify(data));
        if (data.errcode == 1000002 || data.errcode == 1000001 ||
          data.errcode == "1000002" || data.errcode == "1000001"
        ) {
          // window.localStorage.setItem('islogined', null)
          // window.localStorage.setItem('islogined', null)
          if(typeof iBHLYZX != "undefined")
          {
            if(typeof iBHLYZX.logout != "undefined"){
              iBHLYZX.logout();
            }
            else if(typeof iBHLYZX.setToken != "undefined"){
              iBHLYZX.setToken("","");
            }
          }
          VueObj.$store.state.isForceLogout = true;
          VueObj.$router.push({
            path: '/loginRegis/login'
          });
          VueObj.$nextTick(function () {
            VueObj.$parent.loading = false
          })
          return;
        }
        callback(data);
        // 移除加载动画
        VueObj.$nextTick(function () {
          VueObj.$parent.loading = false
        })
      }
    })
  });
};

export default {
  // 验证码请求地址
  vCodeUrl: function (vCodeurl) {
    return doApi(vCodeurl)
  },
  //首页轮播请求地址
  indexAd: function (_self) {
    const data = {
      'current_page': 1,
      'page_count': 10
    }
    return ajaxRequest(_self, 'Public/indexAd', 'post', data, function (data) {
      _self.slide = data.adsList;
    });
  },
  // 活动列表
  activeList: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/activeList'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       _self.activity = data.activeList;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/activeList', 'post', data, function (data) {
      _self.activity = data.activeList;
    });
  },
  activeDetail: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/activeDetail'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.activeDetail = data.activeDetail;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/activeDetail', 'post', data, function (data) {
      _self.activeDetail = data.activeDetail;
    });
  },
  onlinePay: function (_self, data) {
    return $(function () {
      var ua = navigator.userAgent,
        isInApp = false;
      if (ua.match(/cp59/i) == 'cp59') {
        isInApp = true;
      }
      if (!isInApp) {
        _self.tempWindow = window.open();
      }
      ajaxRequest(
        _self,
        'Money/rechargeDo',
        'post',
        data,
        function (data) {
          if (data && data.errcode == 0) {
            if (typeof data.rechargeInfo.payurl != 'undefined') {
              if (!isInApp && _self.tempWindow) {
                _self.tempWindow.location.href = data.rechargeInfo.payurl;
              } else if (typeof iBHLYZX.extopen != 'undefined') {
                iBHLYZX.extopen(data.rechargeInfo.payurl);
              } else {
                layer.open({
                  content: '打开获取支付页面失败:-12',
                  skin: 'msg',
                  time: 3 //2秒后自动关闭
                });
              }
              //询问框
              layer.open({
                content: '是否支付成功？',
                btn: ['成功', '失败'] //按钮
                ,
                yes: function (index) {
                  layer.close(index);
                  _self.$router.push({
                    path: '/member/rechargeRecord'
                  });
                },
                no: function (index) {
                  layer.close(index);
                  _self.$router.push({
                    path: '/member/rechargeRecord'
                  });
                }
              });
            } else {
              if (!isInApp && _self.tempWindow) {
                _self.tempWindow.close();
              }

              layer.open({
                content: '获取支付地址失败',
                skin: 'msg',
                time: 3 //2秒后自动关闭
              });
            }
          } else {
            if (!isInApp && _self.tempWindow) {
              _self.tempWindow.close();
            }
            layer.open({
              content: data.errmsg,
              skin: 'msg',
              time: 3 //2秒后自动关闭
            });
          }
        }
      )
    });
  },

  //首页公告请求地址
  noticeList: function (_self) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Notice/noticeList'),
    //     type: 'post',
    //     data: {
    //       'current_page': 1,
    //       'page_count': 10
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //       _self.scrollDiv = data.noticeList;

    //     }
    //   })
    // });
    const data = {
      'current_page': 1,
      'page_count': 10
    }
    return ajaxRequest(_self, 'Notice/noticeList', 'post', data, function (data) {
      _self.scrollDiv = data.noticeList;
    });
  },
  //首页最新中奖名单请求地址
  newWinner: function (_self) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Index/newWinner'),
    //     type: 'post',
    //     data: {
    //       'current_page': 1,
    //       'page_count': 15
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //       _self.scrollDivWin = data.winnerList;
    //     }
    //   })
    // });
    const data = {
      'current_page': 1,
      'page_count': 15
    }
    return ajaxRequest(_self, 'Index/newWinner', 'post', data, function (data) {
      _self.scrollDivWin = data.winnerList;
    });
  },
  //首页热门彩种请求地址
  ticList: function (_self) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Index/hotLottery'),
    //     type: 'post',
    //     data: {
    //       'current_page': 1,
    //       'page_count': 7
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //       _self.ticList = data.hotLotteryList;

    //     }
    //   })
    // });
    const data = {
      'current_page': 1,
      'page_count': 7
    }
    return ajaxRequest(_self, 'Index/hotLottery', 'post', data, function (data) {
      _self.ticList = data.hotLotteryList;
    });
  },
  //登录页面请求地址
  login: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/loginto'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });
    //       if (data.errcode == 0) {
    //         _self.$router.push({
    //           name: 'home'
    //         });
    //         //添加userId token
    //         _self.$store.commit('addUserId', data.loginInfo.data.userId);
    //         _self.$store.commit('addToken', data.loginInfo.data.token);
    //         iBHLYZX.setToken(data.loginInfo.data.userId, data.loginInfo.data.token);
    //         _self.$store.state.isLogined = true;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/loginto', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
      if (data.errcode == 0) {
        _self.$router.push({
          name: 'home'
        });
        //添加userId token
        _self.$store.commit('addUserId', data.loginInfo.data.userId);
        _self.$store.commit('addToken', data.loginInfo.data.token);
        iBHLYZX.setToken(data.loginInfo.data.userId, data.loginInfo.data.token);
        _self.$store.state.isLogined = true;
      }
    });
  },
  //注册页面请求地址
  register: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/register'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });
    //       if (data.errcode == 0) {
    //         _self.$router.push({
    //           name: 'home'
    //         });
    //         //添加userId token
    //         _self.$store.commit('addUserId', data.loginInfo.data.userId);
    //         _self.$store.commit('addToken', data.loginInfo.data.token);
    //         iBHLYZX.setToken(data.loginInfo.data.userId, data.loginInfo.data.token);
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/register', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
      if (data.errcode == 0) {
        _self.$router.push({
          name: 'home'
        });
        //添加userId token
        _self.$store.commit('addUserId', data.loginInfo.data.userId);
        _self.$store.commit('addToken', data.loginInfo.data.token);
        iBHLYZX.setToken(data.loginInfo.data.userId, data.loginInfo.data.token);
      }
    });
  },
  //忘记密码页面请求地址
  loginPwd: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/loginPwd'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });
    //       if (data.errcode == 0) {
    //         _self.$router.push({
    //           name: 'login'
    //         });
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/loginPwd', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
      if (data.errcode == 0) {
        _self.$router.push({
          name: 'login'
        });
      }
    });
  },
  // 获取试玩账号
  getTryName: function (_self) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/getTryName'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       _self.username = data.data
    //       // console.log(data.data)
    //       // console.log('aaa')
    //     }
    //   })
    // })
    return ajaxRequest(_self, 'Public/getTryName', 'post', {}, function (data) {
      _self.username = data.data
    });
  },
  // 试玩提交接口
  tryDo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/tryDo'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });
    //       if (data.errcode == 0) {
    //         _self.$router.push({
    //           name: 'home'
    //         });
    //         //添加userId token
    //         _self.$store.commit('addUserId', data.loginInfo.data.userId);
    //         _self.$store.commit('addToken', data.loginInfo.data.token);
    //         iBHLYZX.setToken(data.loginInfo.data.userId, data.loginInfo.data.token);
    //         _self.$store.state.isLogined = true;
    //       }
    //     }
    //   })
    // })
    return ajaxRequest(_self, 'Public/tryDo', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
      if (data.errcode == 0) {
        _self.$router.push({
          name: 'home'
        });
        //添加userId token
        _self.$store.commit('addUserId', data.loginInfo.data.userId);
        _self.$store.commit('addToken', data.loginInfo.data.token);
        iBHLYZX.setToken(data.loginInfo.data.userId, data.loginInfo.data.token);
        _self.$store.state.isLogined = true;
      }
    });
  },
  //修改资金密码请求地址
  editCoinPwd: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/editCoinPwd'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });
    //       if (data.errcode == 0) {
    //         _self.$router.push({
    //           name: 'member'
    //         });
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/editCoinPwd', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
      if (data.errcode == 0) {
        _self.$router.push({
          name: 'member'
        });
      }
    });
  },

  //投注页面请求地址
  playDefaultInfo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/playDefaultInfo'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.initList = data.initList;
    //         // 判断是否是固定赔率，1为固定赔率，0或无此字段为非固定赔率
    //         _self.isFixed = data.initList.playedconfig.isFixed;
    //         _self.$store.state.isFixed = data.initList.playedconfig.isFixed;
    //         // 玩法最少选几个号码
    //         _self.simpleInfo = data.initList.playedconfig.simpleInfo;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/playDefaultInfo', 'post', data, function (data) {
      _self.initList = data.initList;
      // 判断是否是固定赔率，1为固定赔率，0或无此字段为非固定赔率
      _self.isFixed = data.initList.playedconfig.isFixed;
      _self.$store.state.isFixed = data.initList.playedconfig.isFixed;
      // 玩法最少选几个号码
      _self.simpleInfo = data.initList.playedconfig.simpleInfo;
    });
  },
  getPlayList: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Index/getPlayList'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.initList.playList = data.playList;
    //       _self.playName = data.playList[0].name;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Index/getPlayList', 'post', data, function (data) {
      _self.initList.playList = data.playList;
      _self.playName = data.playList[0].name;
    });
  },
  played: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Orders/played'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.selectGroup = data.playedconfig.selectGroup;
    //       _self.buyHallChose = false;
    //       for (var i = 0; i < data.playedconfig.selectGroup.length; i++) {
    //         data.playedconfig.selectGroup[i].number = 0;
    //         data.playedconfig.selectGroup[i].numberList = [];
    //       }
    //       // 计算返利
    //       _self.fanDianBdw = data.playedconfig.fanDianBdw;
    //       _self.bonusprop = data.playedconfig.bonusprop;
    //       _self.bonuspropbase = data.playedconfig.bonuspropbase;
    //       _self.gameFanDian = data.playedconfig.gameFanDian;
    //       _self.myFanDian = data.playedconfig.myFanDian;
    //       _self.isFixed = data.isFixed;
    //       _self.$store.state.isFixed = data.isFixed;
    //       // 玩法最少选几个号码
    //       _self.simpleInfo = data.simpleInfo;
    //       console.log('玩法id：' + data.played)
    //       // 如果是动态赔率则执行if内语句，如果为null，即非动态赔率
    //       if (data.changeOdds) {
    //         let oddsArr = {};
    //         data.changeOdds.forEach((item) => {
    //           oddsArr[item.ballcount] = item.odds;
    //         }, this);
    //         _self.changeOdds = oddsArr;
    //         console.log('动态赔率', _self.changeOdds)
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Orders/played', 'post', data, function (data) {
      _self.selectGroup = data.playedconfig.selectGroup;
      _self.buyHallChose = false;
      for (var i = 0; i < data.playedconfig.selectGroup.length; i++) {
        data.playedconfig.selectGroup[i].number = 0;
        data.playedconfig.selectGroup[i].numberList = [];
      }
      // 计算返利
      _self.fanDianBdw = data.playedconfig.fanDianBdw;
      _self.bonusprop = data.playedconfig.bonusprop;
      _self.bonuspropbase = data.playedconfig.bonuspropbase;
      _self.gameFanDian = data.playedconfig.gameFanDian;
      _self.myFanDian = data.playedconfig.myFanDian;
      _self.isFixed = data.isFixed;
      _self.$store.state.isFixed = data.isFixed;
      // 玩法最少选几个号码
      _self.simpleInfo = data.simpleInfo;
      console.log('玩法id：' + data.played)
      // 如果是动态赔率则执行if内语句，如果为null，即非动态赔率
      if (data.changeOdds) {
        let oddsArr = {};
        data.changeOdds.forEach((item) => {
          oddsArr[item.ballcount] = item.odds;
        }, this);
        _self.changeOdds = oddsArr;
        console.log('动态赔率', _self.changeOdds)
      }
    });
  },
  played2: function (_self, data) {
    return $(function () {
      $.ajax({
        url: doApi('Index/getPlayList'),
        type: 'post',
        data: {
          groupId: _self.groupId,
        },
        dataType: "json",
        success: function (data) {
          _self.initList.playList = data.playList;
          // 如果二级菜单里只有一种玩法，自动收起菜单
          if(_self.initList.playList.length <=1) {
            _self.buyHallChose = false;
          }
          _self.playName = data.playList[0].name;
          _self.playedId = data.playList[0].playid;
          _self.jsfun = data.playList[0].jsfun;
          $.ajax({
            url: doApi('Orders/played'),
            type: 'post',
            data: {
              type: _self.type,
              playedId: _self.playedId,
              userId: _self.$store.state.userId,
              token: _self.$store.state.token
            },
            dataType: "json",
            success: function (data) {
              _self.selectGroup = data.playedconfig.selectGroup;
              for (var i = 0; i < data.playedconfig.selectGroup.length; i++) {
                data.playedconfig.selectGroup[i].number = 0;
                data.playedconfig.selectGroup[i].numberList = [];
              }
              // 计算返利
              _self.fanDianBdw = data.playedconfig.fanDianBdw;
              _self.bonusprop = data.playedconfig.bonusprop;
              _self.bonuspropbase = data.playedconfig.bonuspropbase;
              _self.gameFanDian = data.playedconfig.gameFanDian;
              _self.myFanDian = data.playedconfig.myFanDian;
            }
          })
        }
      })
    });
  },
  //购彩大厅请求地址
  colorHall: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Games/colorHall'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.buyHall = data.hallList;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Games/colorHall', 'post', data, function (data) {
      _self.buyHall = data.hallList;
    });
  },
  //确认投注请求地址
  postCode: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Orders/postCode'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 // 2秒后自动关闭
    //       });
    //       if (data.errcode == 1000008) {
    //         // 投注时间超过开奖时间
    //         _self.$router.push({
    //           path: '/buyHall/buyHall'
    //         });
    //       }
    //       _self.$store.commit('buyCheck', false);
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Orders/postCode', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 // 2秒后自动关闭
      });
      if (data.errcode == 1000008) {
        // 投注时间超过开奖时间
        _self.$router.push({
          path: '/buyHall/buyHall'
        });
      }
      _self.$store.commit('buyCheck', false);
    });
  },
  //开奖大厅请求地址
  prizeShow: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/prizeShow'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.$store.commit('hasCate', data.typeList.hasCate);
    //       _self.$store.commit('noCate', data.typeList.noCate);
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/prizeShow', 'post', data, function (data) {
      _self.$store.commit('hasCate', data.typeList.hasCate);
      _self.$store.commit('noCate', data.typeList.noCate);
    });
  },
  //开奖详情请求地址
  getHistoryNums: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Games/getHistoryNums'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       console.info(data)
    //       _self.list = data.data;
    //       _self.typeName = data.typeName;
    //       _self.typeId = data.typeId;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Games/getHistoryNums', 'post', data, function (data) {
      // console.info(data)
      _self.list = data.data;
      _self.typeName = data.typeName;
      _self.typeId = data.typeId;
    });
  },
  //趋势详情请求地址
  trendChart: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('TrendChart/trendChart'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       console.info(data.data.trendList)
    //       if (data.errcode == 0) {
    //         _self.trendList = data.data.trendList;
    //       }

    //     }
    //   })
    // });
    return ajaxRequest(_self, 'TrendChart/trendChart', 'post', data, function (data) {
      if (data.errcode == 0) {
        _self.trendList = data.data.trendList;
      }
    });
  },
  //趋势彩种请求地址
  roleTypeList: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('TrendChart/roleTypeList'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 0) {
    //         _self.buyHallChoseList = data.data;
    //         _self.type = data.data[0].typeid;
    //         _self.typeName = data.data[0].title;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'TrendChart/roleTypeList', 'post', data, function (data) {
      if (data.errcode == 0) {
        _self.buyHallChoseList = data.data;
        _self.type = data.data[0].typeid;
        _self.typeName = data.data[0].title;
      }
    });
  },
  // 获取彩种的当前信息
  getCurrentInfo: function (_self, data) {
    return ajaxRequest(_self, 'Orders/getCurrentInfo', 'post', data, function (data) {
      _self.actionno = data.actionNo.actionno;
      _self.actiontime = data.actionNo.actiontime;
      _self.number = data.lastInfo.number;
      _self.data = data.lastInfo.data;
      _self.money = data.userInfo.coin;
    })
  },
  //个人中心请求地址
  userInfo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/userCenter'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002 || data.errcode == 1000001) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.nickname = data.userInfo.username;
    //         _self.money = data.userInfo.coin;
    //         _self.$store.commit('addRealName', data.userInfo.name);
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/userCenter', 'post', data, function (data) {
      _self.nickname = data.userInfo.username;
      _self.money = data.userInfo.coin;
      _self.$store.commit('addRealName', data.userInfo.name);
    });
  },
  //个人中心 资金明细
  accountChange: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/accountChange'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         if (data.data.root.length < 20) {
    //           _self.moretitle = '没有数据'
    //         } else {
    //           _self.moretitle = '点击加载更多'
    //         }
    //         _self.root = _self.root.concat(data.data.root)
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/accountChange', 'post', data, function (data) {
      if (data.data.root.length < 20) {
        _self.moretitle = '没有数据'
      } else {
        _self.moretitle = '点击加载更多'
      }
      _self.root = _self.root.concat(data.data.root)
    });
  },
  // 提现范围地址
  withdrawInfo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/withdrawInfo'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       _self.coinScope = data.info
    //       console.log(data.info);
    //     }
    //   })
    // })
    return ajaxRequest(_self, 'Public/withdrawInfo', 'post', data, function (data) {
      _self.coinScope = data.info
    });
  },
  //提现请求地址
  getUserBankInfo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/getUserBankInfo'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.userBankInfo == null) {
    //         _self.cashAlert = true;
    //       } else {
    //         _self.bankName = data.userBankInfo.countname;
    //         _self.account = data.userBankInfo.account;
    //         _self.username = data.userBankInfo.username;
    //       }

    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/getUserBankInfo', 'post', data, function (data) {
      if (data.userBankInfo == null) {
        _self.cashAlert = true;
      } else {
        _self.bankName = data.userBankInfo.countname;
        _self.account = data.userBankInfo.account;
        _self.username = data.userBankInfo.username;
      }
    });
  },
  //提现提交请求地址
  withdrawDo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Money/withdrawDo'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 0) {
    //         _self.$router.back();
    //         layer.open({
    //           content: data.errmsg,
    //           skin: 'msg',
    //           time: 3 //2秒后自动关闭
    //         });
    //       } else {
    //         layer.open({
    //           content: data.errmsg,
    //           skin: 'msg',
    //           time: 3 //2秒后自动关闭
    //         });
    //       }
    //       console.info(data)
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Money/withdrawDo', 'post', data, function (data) {
      if (data.errcode == 0) {
        _self.$router.back();
        layer.open({
          content: data.errmsg,
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      } else {
        layer.open({
          content: data.errmsg,
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      }
    });
  },
  //充值提交请求地址
  rechargeDo: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('/Money/rechargeDo'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.number = data.rechargeInfo.ordernum;
    //         _self.ercodeurl = data.rechargeInfo.ercodeurl;
    //         _self.idNum = data.rechargeInfo.id;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, '/Money/rechargeDo', 'post', data, function (data) {
      _self.number = data.rechargeInfo.ordernum;
      _self.ercodeurl = data.rechargeInfo.ercodeurl;
      _self.idNum = data.rechargeInfo.id;
    });
  },

  //充值提交请求地址
  rechargeBank: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('/Money/rechargeDirect'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002 || data.errcode == 1000001) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         if (data.errcode == 0) {
    //           layer.open({
    //             content: data.errmsg,
    //             skin: 'msg',
    //             time: 3 //2秒后自动关闭
    //           });
    //           _self.$router.push({
    //             path: '/member/rechargeRecord'
    //           });
    //         } else if (data.errcode == 1200063) {
    //           layer.open({
    //             content: data.errmsg,
    //             skin: 'msg',
    //             time: 3 //2秒后自动关闭
    //           });
    //         } else {
    //           layer.open({
    //             content: '提交失败，请稍后再试',
    //             skin: 'msg',
    //             time: 3 //2秒后自动关闭
    //           });
    //         }
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, '/Money/rechargeDirect', 'post', data, function (data) {
      if (data.errcode == 0) {
        layer.open({
          content: data.errmsg,
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
        _self.$router.push({
          path: '/member/rechargeRecord'
        });
      } else if (data.errcode == 1200063) {
        layer.open({
          content: data.errmsg,
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      } else {
        layer.open({
          content: '提交失败，请稍后再试',
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      }
    });
  },

  //我已支付请求地址
  rechargePay: function (_self, data, callback) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Money/rechargePay'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 0) {
    //         layer.open({
    //           content: '提交成功，请耐心等待管理员审核',
    //           skin: 'msg',
    //           time: 3 //2秒后自动关闭
    //         });
    //         if (typeof callback != 'undefined' && callback) {
    //           callback(data);
    //         } else {
    //           _self.$router.push({
    //             path: '/member/member'
    //           });
    //         }
    //       } else {
    //         layer.open({
    //           content: '提交失败，请稍后再试',
    //           skin: 'msg',
    //           time: 3 //2秒后自动关闭
    //         });
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Money/rechargePay', 'post', data, function (data) {
      if (data.errcode == 0) {
        layer.open({
          content: '提交成功，请耐心等待管理员审核',
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
        if (typeof callback != 'undefined' && callback) {
          callback(data);
        } else {
          _self.$router.push({
            path: '/member/member'
          });
        }
      } else {
        layer.open({
          content: '提交失败，请稍后再试',
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      }
    });
  },
  //充值记录请求地址
  rechargeRecord: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/rechargeRecord'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.recharge_list = data.recharge_list.rechargeList;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/rechargeRecord', 'post', data, function (data) {
      _self.recharge_list = data.recharge_list.rechargeList;
    });
  },
  //提款记录请求地址
  withdrawRecord: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/withdrawRecord'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.withdrawList = data.withdrawList;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/withdrawRecord', 'post', data, function (data) {
      _self.withdrawList = data.withdrawList;
    });
  },
  //投注记录请求地址
  getOrderHistory: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/getOrderHistory'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         if (data.orderList.length < 20) {
    //           _self.moretitle = '没有数据'
    //         } else {
    //           _self.moretitle = '加载更多'
    //         }
    //         _self.orderList = _self.orderList.concat(data.orderList)
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/getOrderHistory', 'post', data, function (data) {
      if (data.orderList.length < 20) {
        _self.moretitle = '没有数据'
      } else {
        _self.moretitle = '加载更多'
      }
      _self.orderList = _self.orderList.concat(data.orderList)
    });
  },
  //投注详情请求地址
  OrderDetail: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Orders/OrderDetail'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.orderDetail = data.orderDetail;
    //       }
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Orders/OrderDetail', 'post', data, function (data) {
      _self.orderDetail = data.orderDetail;
    });
  },
  // 个人消息请求
  notifyList: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/notifyList'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         if (data.notifyList.length < 20) {
    //           _self.moretitle = '没有数据'
    //         } else {
    //           _self.moretitle = '加载更多'
    //         }
    //         _self.informationList = _self.informationList.concat(data.notifyList)
    //       }
    //     }
    //   })
    // })
    return ajaxRequest(_self, 'Users/notifyList', 'post', data, function (data) {
      if (data.notifyList.length < 20) {
        _self.moretitle = '没有数据'
      } else {
        _self.moretitle = '加载更多'
      }
      _self.informationList = _self.informationList.concat(data.notifyList)
    });
  },
  // 个人消息详情请求
  notifyDetail: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/notifyDetail'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.errcode == 1000002) {
    //         // window.localStorage.setItem('islogined', null)
    //         iBHLYZX.logout();
    //         _self.$router.push({
    //           path: '/loginRegis/login'
    //         });
    //       } else {
    //         _self.title = data.data.title
    //         _self.content = data.data.content
    //         _self.sendtime = data.data.sendtime
    //       }
    //     }
    //   })
    // })
    return ajaxRequest(_self, 'Users/notifyDetail', 'post', data, function (data) {
      _self.title = data.data.title
      _self.content = data.data.content
      _self.sendtime = data.data.sendtime
    });
  },
  //银行卡请求地址
  getBankAndArea: function (_self) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('UsersBank/getBankAndArea'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       _self.list = data.bank_list.bankList;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'UsersBank/getBankAndArea', 'post', {}, function (data) {
      _self.list = data.bank_list.bankList;
    });
  },
  getProvinceList: function (_self) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('UsersBank/getProvinceList'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       _self.list = data.bank_list.provinceList;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'UsersBank/getProvinceList', 'post', {}, function (data) {
      _self.list = data.bank_list.provinceList;
    });
  },
  //银行卡请求地址
  getCitys: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('UsersBank/getCitys'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.list = data.city_list;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'UsersBank/getCitys', 'post', data, function (data) {
      _self.list = data.city_list;
    });
  },
  //银行卡请求地址
  addBank: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/addBank'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });
    //       _self.$router.go(-1);
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/addBank', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
      _self.$router.go(-1);
    });
  },
  //意见反馈请求地址
  feedback: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Users/feedback'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       console.info(data)
    //       layer.open({
    //         content: data.errmsg,
    //         skin: 'msg',
    //         time: 3 //2秒后自动关闭
    //       });

    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Users/feedback', 'post', data, function (data) {
      layer.open({
        content: data.errmsg,
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
    });
  },
  //银行卡充值请求地址
  publicAccount: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/publicAccount'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.accountList = data.accountList;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/publicAccount', 'post', data, function (data) {
      _self.accountList = data.accountList;
    });
  },
  //银行卡充值请求地址
  accountDetail: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('/Public/accountDetail'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.info = data.info;
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/accountDetail', 'post', data, function (data) {
      _self.info = data.info;
    });
  },
  //退出登录请求地址
  logout: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('/Users/logout'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       // window.localStorage.setItem('islogined', null)
    //       iBHLYZX.logout();
    //       _self.$router.push({
    //         name: 'login'
    //       });
    //       _self.info = data.info;
    //       _self.$store.commit('addUserId', '');
    //       _self.$store.commit('addToken', '');
    //       iBHLYZX.setToken('', '');
    //       if (typeof iBHLYZX.logout != 'undefined') {
    //         iBHLYZX.logout();
    //       }
    //     }
    //   })
    // });
    ajaxRequest(_self, '/Users/logout', 'post', data, function (data) {

    });
    _self.info = data.info;
    _self.$store.commit('addUserId', '');
    _self.$store.commit('addToken', '');
    if(typeof iBHLYZX != "undefined")
    {
      if(typeof iBHLYZX.logout != "undefined"){
        iBHLYZX.logout();
      }
      else if(typeof iBHLYZX.setToken != "undefined"){
        iBHLYZX.setToken("","");
      }
    }
    _self.$store.state.isForceLogout = true;
    _self.$store.state.isLogined = false;
    _self.$router.push({
      name: 'login'
    });
  },
  //关于我们
  aboutus: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('Public/aboutus'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.aboutInfo = data.aboutInfo
    //     }
    //   })
    // });
    return ajaxRequest(_self, 'Public/aboutus', 'post', data, function (data) {
      _self.aboutInfo = data.aboutInfo
    });
  },
  // 用户注册密保问题
  questionList: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('/Public/questionList'),
    //     type: 'post',
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //       _self.questionList = data.questionList;
    //     }
    //   })
    // })
    return ajaxRequest(_self, '/Public/questionList', 'post', data, function (data) {
      _self.questionList = data.questionList;
    });
  },
  // 注册协议
  regPro: function (_self, data) {
    // return $(function () {
    //   $.ajax({
    //     url: doApi('/public/regPro'),
    //     type: 'post',
    //     dataType: "json",
    //     success: function (data) {
    //       // _self.regPro=data.content;
    //       layer.open({
    //         content: data.content,
    //         // type: 1,
    //         skin: 'layui-layer-demo', //样式类名
    //         closeBtn: 0, //不显示关闭按钮
    //         anim: 2,
    //         shadeClose: true, //开启遮罩关闭
    //       });
    //     }
    //   })
    // })
    return ajaxRequest(_self, '/public/regPro', 'post', data, function (data) {
      layer.open({
        content: data.content,
        // type: 1,
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 0, //不显示关闭按钮
        anim: 2,
        shadeClose: true, //开启遮罩关闭
      });
    });
  }
}
