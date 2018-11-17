/**
 * JSAPI
 * @author liulongsen
 * @version 1.0.0
 **/
import {
    __postNotification,
    __isObject,
    __sameModule,
    __isNumber,
    __buildUrl,
    __showLoading,
    __hideLoading,
    __hasOwnProperty,
    __setSessionData,
    __getSessionData,
    __processError,
    __isEmptyObject
} from './helper';
import rpc from './rpc';
import _ from 'lodash';
import checkAuth from './checkAuth';

const _Native = {
    /**
     * @method rpc
     * @desc 调用原生rpc发送请求
     * @param  {String} operationType - 请求的地址
     * @param  {Boolean} needParse=false - 在特定的情况下是否需要转化成json格式的对象，一般不需要
     * @param  {Object} data={} - 对应的接口参数
     * @param  {Function} processError - 参数是(header,body)当通讯成功，业务失败的时候，
     * 会自动做一层拦截提示错误信息，默认使用alert提示错误信息，如果需要定制就传入该参数，传入参数时
     * 不会触发promise.then中的error函数
     * @example App.Native.rpc({}).then(success(body), error(header, body), always)
     */
    rpc,

    /**
     * @desc 缓存数据到session，并指定存储的键。没有办法去remove sesionData的key，只有通过设置一个空值来清除，假如用户账号在其他设备登入导致logout，那么并不会清除数据，这个时候如果这个设备登入另一个账号，是可以看到这*个数据的
     * @method setSessionData
     * @param  {String}  key - 缓存数据的 key 值
     * @param  {String}  val - 缓存数据的值
     * @example App.Native.setSessionData('test', '测试数据')
     */
    setSessionData: __setSessionData,

    /**
     * @method getSessionData
     * @desc 获取session中指定键的数据
     * @param  {Array | String}  key - 需要获取的key的值
     * @returns {Promise} 返回对应key的Promise
     * @example App.Native.getSessionData('test')
     */
    getSessionData: __getSessionData,

    /**
     * @method passwordAlready
     * @desc 是否已经设置了支付密码,如果没有设置的话将弹出confirm
     * @param  {Boolean}  operation=true - 是否需要立即设置支付密码弹窗
     * @return {Promise} 返回true或者false的Promise
     * @example App.Native.passwordAlready().then()  => true | false
     */
    passwordAlready(operation = true) {
        return new Promise((reslove, reject) => {
            // __getSessionData('pswdStatus').then(res => {

            // if(Number(res) == 1){return reslove(true)}

            _Native.userInfo().then(info => {
                rpc({
                    operationType: 'com.ifp.MP1148',
                    processError: false,
                    slient: true,
                    data: {
                        transferFlowNoNew: new Date().getTime() +
                            (Math.random() + '00000000000').substr(2, 9),
                        customerId: info.customerId,
                        mobileNo: info.mobileNo
                    }
                }).then(({
                    body,
                    header
                }) => {
                    if (body.pswdStatus === '00') {
                        reslove(true);
                    } else {
                        operation
                            ?
                            _Native
                            .confirm({
                                title: '',
                                message: '立即设置支付密码'
                            })
                            .then(res => reslove(res)) :
                            reslove(false);
                    }
                }, reject);
            });
            // })
        });
    },

    /**
     * @method firstInstall
     * @desc 检查客户端是否第一次安装
     * @example App.Native.firstInstall() =>  {data:true | false}
     */
    firstInstall() {
        return new Promise(reslove => {
            AlipayJSBridge.call('firstInstall', data => {
                __processError(data).then(res => reslove(res));
            });
        });
    },

    /**
     * @method pwdEncrypt
     * @desc 二次加密密码键盘给出的密文，上传到后台前需要二次加密
     * @param {Object} opt -
     * {
     *		name: '' 用名登录名
     *		pwd: '' 需要加密的密文,以数组的形式传入，有时需要一次加密多个
     *		ps: '' 加密方式
     * }
     * @return {Promise} 返回后台数据的Promise
     * @example App.Native.pwdEncrypt().then()
     */
    pwdEncrypt(opt = {}) {
        let _opt = Object.assign({
                name: 'yanzs',
                pwd: ['0014848'],
                ps: 'AE0'
            },
            opt
        );

        return new Promise(reslove => {
            AlipayJSBridge.call('pwdEncrypt', _opt, res => {
                reslove(res.result);
            });
        });
    },

    /**
     * @method showCamera
     * @desc 调起相机,相册,扫一扫等
     * @param {Object} opt -
     * {
     *		type: Number   0相机 , 1相册, 2扫一扫
     *		id: ''    用户ID，让原生上传图片时使用，必填, type < 2 时ID必填
     * }
     * @return {Promise} 返回后台数据的Promise
     * @example App.Native.showCamera().then(data => { success }, () => { error })
     */
    showCamera(opt = {}) {
        let _opt = Object.assign({
                type: 0
            },
            opt
        );

        if (!__isNumber(_opt.type)) {
            alert('type 类型必须是number');
        }

        if (_opt.type < 2 && !__hasOwnProperty(_opt, 'id')) {
            return alert('用户ID不能为空');
        }

        return new Promise((reslove, reject) => {
            if (opt.type == 2) {
                let _opt = {
                    appsId: opt.appsId,
                    YLpayCodeUrl: opt.YLpayCodeUrl,
                    NearShopUrl: opt.NearShopUrl
                };
                AlipayJSBridge.call('showerweima', _opt, ({
                        result
                    }) =>
                    reslove(result)
                );
            } else {
                AlipayJSBridge.call('showCamera', _opt, data => {
                    __processError(data).then(({
                        result
                    }) => {
                        reslove('data:image/png;base64,' + result);
                    });
                });
            }
        });
    },

    /**
     * @method showLoading
     * @desc 菊花提示
     * @param  {Object} opt -
     *  {
     *     text: '请求中...'  文本内容；如需设为无文案，需传入一个空格
     *     delay: 0  延迟多少毫秒后显示；如果在此时间之前调用了hideLoading, 则不会再显示
     *     autoHide: true 默认情况下容器会在pageFinish的后会主动隐藏菊花，默认true, 传入false，
     *     关掉自动隐藏(only android)
     *     cancelable: true 安卓返回键是否消掉菊花，默认物理返回键会消掉菊花(only android)
     *  }
     * @example App.Native.showLoading({ text, delay, autoHide, cancelable })
     */
    showLoading: __showLoading,

    /**
     * @method hideLoading
     * @desc 关闭菊花提示
     * @example App.Native.hideLoading()
     */
    hideLoading: __hideLoading,

    /**
     * @method toast
     * @desc toast提示, 返回promise对象，toast消失时会触发promise.reslove
     * @param  {Object} opt -
     *  {
     *     content: '小发' 提示的内容
     *     type: 'none'  类型, none / success / fail / exception。 excption类型必须传文案
     *     duration: 2000 单位是毫秒  设置自己消失的时间
     *     xOffset: 0 左为正方向，单位为px
     *     yOffset: 0 上为正方向，单位为px
     *  }
     * @returns {Promise} 返回回调Promise
     * @example App.Native.toast({ content, type }).then(() => { toast消失了 })
     */
    toast(opt = {}) {
        return new Promise(reslove => {
            let _opt = Object.assign({
                    content: '小发',
                    type: 'none',
                    duration: 2000,
                    xOffset: 0,
                    yOffset: 0
                },
                opt
            );

            AlipayJSBridge.call('toast', _opt, reslove);
        });
    },

    /**
     * @method pushWindow
     * @desc 新开页面
     * @param  {Object} opt -
     *  {
     *     url: '' 需要打开的地址 /home/cdbank_index/index.html
     *     param: {}  设置客户端参数
     *     data: {}  需要传递到目标页面的参数ha
     *     pushOwnWindow: function 自己处理跳转逻辑
     *  }
     * @example App.Native.pushWindow({ url, param, data })
     */
    pushWindow: _.debounce(
        (opt = {}) => {
            let [url, ext] = opt.url.split('.');
            let {
                loginStatus,
                signStatus
            } = App.vm.$store.getters;
            let nextVm = (nextParam = {}) => {
                let {
                    fn,
                    appId = null,
                    titleBarColor = 0xffffff,
                    backBehavior = 'pop',
                    allowsBounceVertical = false,
                    showOptionMenu = true
                } = __sameModule(opt.url);

                let param = Object.assign(
                    appId ? {
                        appId
                    } : {}, {
                        titleBarColor,
                        backBehavior,
                        allowsBounceVertical,
                        showOptionMenu
                    },
                    opt.param
                );
                let _opt = Object.assign({}, opt, param, nextParam);

                if (__isObject(_opt.data)) {
                    _opt.url = __buildUrl(_opt.url, _opt.data);
                    delete _opt.data;
                }

                console.log(fn, _opt);

                AlipayJSBridge.call(fn, _opt);
                setTimeout(() => App.trigger('H5_leave'), 120);
            };

            checkAuth(opt, nextVm, url);
        },
        800, {
            leading: true,
            trailing: false
        }
    ),

    popTo(data) {
        AlipayJSBridge.call('popTo', {
            data
        });
    },

    /**
     * @method pushWindowOnline
     * @desc 打开第三方页面
     * @param  {Object} opt -
     *  {
     *     url: '' 需要打开的地址 http://www.cgb.com
     *     data: {}  需要传递到目标页面的参数
     *  }
     * @example App.Native.pushWindowOnline(opt)
     */
    pushWindowOnline: _.debounce(
        (opt = {}) => {
            let _opt = Object.assign({}, opt);

            if (__isObject(_opt.data)) {
                _opt.url = __buildUrl(_opt.url, _opt.data);
                delete _opt.data;
            }
            console.log('pushWindowOnline', _opt);
            AlipayJSBridge.call('pushWindow', _opt);
            setTimeout(() => App.trigger('H5_leave'), 120);
        },
        800, {
            leading: true,
            trailing: false
        }
    ),

    /**
     * @method setTitleTitle
     * @desc 设置标题
     * @param  {String} title - 标题文字
     * @example App.Native.setTitle(title)
     */
    setTitle(title = '') {
        AlipayJSBridge.call('setTitle', {
            title
        });
    },

    /**
     * @method hideHeader
     * @desc 隐藏导航栏
     * @example App.Native.HideHeader() 
     */
    hideHeader() {
      console.log('hideHeader');
      if (App.device.os == 'android') {
          AlipayJSBridge.call('hideTitlebarAndroid');
      } else {
          AlipayJSBridge.call('hideTitlebar');
      }
    },

     /**
     * @method alert
     * @desc 弹出警告框
     * @param  {Object} opt -
     *  {
     *     title: '小发',
     *     message: '小发',
     *     button: '确定'
     *  }
     * @returns {Promise} 返回回调Promise
     * @example App.Native.alert({ title, message, button, align }).then(() => {alert消失了})
     */
    alert(msg, title = '提示') {
        return new Promise(reslove => {
            let _opt = {
                title,
                message: msg,
                button: '确定'
            };
            if (App.device.os == 'android') {
                AlipayJSBridge.call('showAlertAndroid', _opt, reslove);
            } else {
                AlipayJSBridge.call('alert', _opt, reslove);
            }
        });
    },

    /**
     * @method confirm
     * @desc 弹出确认框
     * @param  {Object} opt -
     *  {
     *     title: '小发',
     *     message: '小发',
     *     okButton: '是'
     *     cancelButton: '否'
     *  }
     * @returns {Promise} 返回回调Promise
     * @example App.Native.confirm({ title, message, button, align }).then(({ok}) => {ok = true | false })
     * 通过then里面的参数判断是点了确认还是取消
     */
    confirm(message) {
        return new Promise(reslove => {
            let _opt = {
                title: '提示',
                okButton: '是',
                cancelButton: '否'
            };
            if (typeof message == 'string') {
                _opt.message = message;
            } else if (typeof message == 'object') {
                _opt = Object.assign(_opt, message);
            }
            if (App.device.os === 'android') {
                AlipayJSBridge.call('showConfimAndroid', _opt, reslove)
            } else {
                AlipayJSBridge.call('confirm', _opt, reslove)
            }
        });
    },

    /**
     * @method redirect
     * @desc 重定向
     * @param  {Object} opt -
     *  {
     *     url: '' 需要打开的地址 /home/cdbank_index/index.html
     *     data: {}  需要参递到目标页面的参数
     *  }
     * AlipayJSBridge.call('setPage', { url: opt.url }) 重定向后重置原生的页面指向
     * @example App.Native.redirect({ url, data })
     */
    redirect(opt = {}) {
        if (__isObject(opt.data)) {
            opt.url = __buildUrl(opt.url, opt.data);
        }
        AlipayJSBridge.call('setPage', {
            url: opt.url
        });
        location.href = opt.url;
    },

    /**
     * @method clientInfo
     * @desc 获取客户端信息，由于信息量大，详细开发者可行打印
     * @returns {Promise} 返回回调Promise
     * @example App.Native.clientInfo()
     */
    clientInfo() {
        return new Promise(reslove => {
            AlipayJSBridge.call('getClientInfo', info => {
                reslove(info);
            });
        });
    },

    /**
     * @method userInfo
     * @desc 获取客户端信息，由于信息量大，详细开发者可行打印
     * @returns {Promise} 返回回调Promise
     * @example App.Native.userInfo()
     */
    userInfo() {
        return new Promise(reslove => {
            AlipayJSBridge.call('getUserInfo', info => {
                let {
                    isLogin,
                    userInfo,
                    creditNo,
                } = info;
                console.log(info, '登录信息');
                let data = null;
                // 登录成功
                if (isLogin) {
                    data = userInfo;
                    data= Object.assign({creditNo: creditNo}, data);
                }
                reslove(data);
            });
        });
    },

    /**
     * @method setClipboard
     * @desc 复制黏贴
     * @example App.Native.setClipboard('dxzasdjhew')
     */
    setClipboard(str) {
        AlipayJSBridge.call('setClipboard', {
            text: String(str)
        });
    },

    /**
     * @method getClipboard
     * @desc - 获取黏贴
     * @returns {Promise} 返回回调Promise
     * @example App.Native.getClipboard().then(res => {  })
     */
    getClipboard() {
        return new Promise(reslove => {
            AlipayJSBridge.call('getClipboard', {}, ({
                text
            }) => {
                reslove(text);
            });
        });
    },

    /**
     * @method callPhone
     * @desc 拨打电话
     * @example App.Native.callPhone(tel)
     */
    callPhone(tel = '13800138000') {
        AlipayJSBridge.call('callPhone', {
            tel
        });
    },

    /**
     * @method showKeyboard
     * @desc 密码键盘
     * @param  {Object} opt -
     *  {
     *     isSpecialPassWordRequired: true 是否显示特殊字符
     *     actionName: '' 由h5发起的动作名，原生会在inputMsg回传
     *     maxSize: '12'  最大可输入长度
     *     ps: 'AE0' APIN、EPIN加密
     *     	  '01'  动态加密
     *     	  'AE1'  APIN、EPIN加密与动态加密
     *     	  'A0'  APIN加密
     *     	  'A1'  APIN加密与动态加密
     *     	  'E0'  EPIN加密
     *     	  'E1'  EPIN加密与动态加密
     *     isRegister: true  是否检查弱密码
     *     isVibrator: true  是否按键震动 默认true
     *     mobileNo: 13800138000  手机号，用意未知
     *     pswIndex: '0'  当前输入密码位数下标
     *  }
     *  @returns {Promise} 返回回调Promise
     * @example App.Native.showKeyboard(number).then(res = > { 键盘弹起来了 })
     * then函数不是必须的
     */
    showKeyBoard(opt = {}, cb) {
        opt.multiCallback = true;
        AlipayJSBridge.call('showKeyBoard', opt, data => {
            cb && cb(data);
        });
    },

    /**
     * @method hideKeyboard
     * @desc 隐藏密键盘
     * @returns {Promise} 返回回调Promise
     * @example App.Native.hideKeyboard().then(res => { 键盘消失了 })
     * then函数不是必须的
     */
    hideKeyBoard(cb) {
        AlipayJSBridge.call('hideKeyBoard', {}, data => {
            cb && cb(data);
        });
    },

    /**
     * @method showNumKeyboard
     * @desc 数字键盘
     * @param {Object} opt -
     * {
     *   isIDCard: true/false  //是否是身份证键盘，可不传，默认false
     * }
     * @returns {Promise} 返回回调Promise
     * @example - App.Native.showNumKeyboard().then(res => { 键盘消失了 })
     * event 1.inputMsg：点击键盘触发此事件，触发对应的回调函数
     */
    showNumKeyboard(opt = {}) {
        return new Promise(resolve => {
            let _opt = Object.assign({
                    isIDCard: false
                },
                opt
            );

            AlipayJSBridge.call('showNumKeyboard', _opt, data => {
                __processError(data).then(res => resolve(res));
            });
        });
    },

    /**
     * @method hideNumKeyboard
     * @desc 隐藏数字键盘
     * @returns {Promise} 返回回调Promise
     * @example App.Native.hideNumKeyboard().then(res => { 键盘消失了 })
     * then函数不是必须的
     */
    hideNumKeyboard() {
        return new Promise(resolve => {
            AlipayJSBridge.call('hideNumKeyboard', {}, data => {
                __processError(data).then(res => resolve(res));
            });
        });
    },

    /**
     * @method closeTo
     * @desc 回退页面
     * @param{Object} opt -
     * {
     *    index: -1  表示回退N步
     *    url: '/home/cdbank_index/index.html?a=1&b=2'  回退到的页面的路径，需要带上参数
     *    urlPattern: '/home/cdbank_index/index.html'  回退到的页面的路径
     *    data: {}   返回时要带到上个页面的参数
     * }
     * @returns {Promise} 返回回调Promise
     * @example App.Native.closeTo()
     * 优化级： urlPattern,url,index,
     *  urlPattern,url,index, 只需要使用其个一个即可
     */
    closeTo(opt = {}) {
        return new Promise(reslove => {
            AlipayJSBridge.call('closeTo', opt, res => {
                reslove(res);
            });
        });
    },

    /**
     * @method closeAll
     * @desc 关闭所有的H5页面，包括自身
     * @example App.Native.closeAll()
     */
    closeAll(opt = {}) {
        AlipayJSBridge.call('closeAll', opt);
    },

    /**
     * @method closeOther
     * @desc 关闭所有的H5页面，除去自身
     * @example App.Native.closeOther()
     */
    closeOther(opt = {}) {
        AlipayJSBridge.call('closeOther', opt);
    },
    /**
     * @method getCFCA
     * type==1  certInfo
     * type==2  sign
     * type==3  importCert
     * type==4  certReq
     */
    getCFCA(opt) {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call('getCFCA', opt, res => {
                reslove(res);
            });
        });

    },
    /**
     * @desc - 调起登录
     * @param
     * {
     *		isGoto: false, 登录后是否会跳转指定页面，默认值false
     * }
     * @example App.Native.login()
     */
    login() {
        return new Promise((reslove, reject) => {
            App.on('login', r => {
              console.log(222333, r)
                __postNotification('loginSuccess', r).then(r => {
                    App.vm.$store.dispatch('commitUserInfo').then(reslove)
                });
            });
            AlipayJSBridge.call('login');
        });
    },

    /**
     * @method loginOut
     * @desc 退出登录
     * @returns {Promise} 返回回调Promise
     * @example App.Native.loginOut()
     */
    loginOut() {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call('logout', res => {
                App.vm.$store.dispatch('cleanUserInfo');
                reslove(res);
            });
        });
    },

    /**
     * @method setAPDataStorage
     * @desc 设置持久缓存
     * @param {Object}  key - 键
     * @param {Object}  value - 值
     * @returns {Promise} 返回回调Promise
     * @example App.Native.setAPDataStorage().then(success => {})
     */
    setAPDataStorage(key, value) {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call(
                'setAPDataStorage', {
                    type: 'common',
                    business: 'customBusinessKey',
                    key,
                    value: JSON.stringify(value)
                },
                ({
                    success,
                    errorMessage
                }) => {
                    if (success) {
                        return reslove(success);
                    }
                    //alert(errorMessage)
                    //reject(success)
                }
            );
        });
    },

    /**
     * @method getAPDataStorage
     * @desc 获取持久缓存
     * @param {Object}  key - 键
     * @returns {Promise} 返回回调Promise
     * @example App.Native.getAPDataStorage(key).then({data} => {})
     */
    getAPDataStorage(key) {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call(
                'getAPDataStorage', {
                    type: 'common',
                    business: 'customBusinessKey',
                    key
                },
                ({
                    data,
                    errorMessage
                }) => {
                    try {
                        reslove(JSON.parse(data));
                    } catch (e) {
                        reslove(data);
                    }
                }
            );
        });
    },

    /**
     * @method removeAPDataStorage
     * @desc 删除持久缓存
     * @param {Object}  key - 键
     * @returns {Promise} 返回回调Promise
     * @example App.Native.removeAPDataStorage(key).then({success} => {})
     */
    removeAPDataStorage(key) {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call(
                'removeAPDataStorage', {
                    type: 'common',
                    business: 'customBusinessKey',
                    key
                },
                ({
                    success,
                    data,
                    errorMessage
                }) => {
                    if (success) {
                        return reslove(success);
                    }
                    reject(undefined);
                }
            );
        });
    },

    /**
     * @method gotoNavBaiduMap
     * @desc 调用百度地图
     * @param {Object} opt -
     * {
     *    title: '百度地图'  标题
     *    address: '广东省佛山市'  地址
     *    latlng: '22,113' 经度,纬度
     *    type: '步行'
     *    fromLocation: '22,113' 出发地经度,纬度
     *    toLocation: '22,113' 目地地经度,纬度
     * }
     * @example App.Native.gotoNavBaiduMap(opt)
     */
    gotoNavBaiduMap(opt = {}) {
        let _opt = Object.assign({
                title: '百度地图',
                address: '22',
                latlng: '22,113',
                type: '步行',
                fromLocation: '22,113',
                toLocation: '24,115'
            },
            opt
        );

        AlipayJSBridge.call('gotoNavBaiduMap', _opt);
    },

    /**
     * @method showOCRIDCard
     * @desc 调用ORC扫描证件
     * @param {Object}  arg -
     * {
     *    IDCardFrontImage: 正面图片base64
     *    IDCardBackImage: 反面图片base64
     *    validity: 有效期
     *    certNo: 身份证号
     *    certName: 姓名
     * }
     * @returns {Promise} 返回回调Promise
     * @example App.Native.showOCRIDCard('IDCardFrontImage', 'IDCardBackImage')
     * ps: 由于图片太大会导致性能低下，故按照传入的参数返回值，默认返回
     * ps: 默认返回 'validity', 'certNo', 'certName'
     * ps: 选填 'IDCardFrontImage', 'IDCardBackImage'
     */
    showOCRIDCard(...arg) {
        let key = ['validity', 'certNo', 'certName'].concat(...arg);
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call(
                'showOCRIDCard', {
                    title: '扫描证件',
                    key
                },
                result => {
                    if (result.error == -2) {
                        return reject(result);
                    }
                    reslove(result);
                }
            );
        });
    },

    /**
     * @method showOCRCreditCard
     * @desc 调用OCR扫描银行卡
     * @param {Boolean}  track=false - 是否埋点
     * @returns {Promise} 返回回调Promise
     * @example App.Native.showOCRCreditCard('IDCardFrontImage', 'IDCardBackImage')
     * ps: 由于图片太大会导致性能低下，故按照传入的参数返回值，默认返回
     * ps: 默认返回 'validity', 'certNo', 'certName'
     * ps: 选填 'IDCardFrontImage', 'IDCardBackImage'
     */
    showOCRCreditCard(track = false) {
        return new Promise(reslove => {
            AlipayJSBridge.call(
                'showOCRCard', {
                    title: '扫描银行卡',
                    track
                },
                result => reslove(result)
            );
        });
    },
    /**
     * @method getDeviceid
     * @desc 获取设备信息
     */
    getDeviceInfo() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getDeviceid', (
                result
            ) => {
                resolve(result)
            });
        });
    },

    /**
     * @method isSupportFingerprint
     * @desc 判断当前设备是否支持指纹（或面部)识别（设备不支持、已越狱、已ROOT均返回不支持）
     * @returns {Object}
     * {
     *  status,  {Boolean} 是否支持指纹或人脸识别
     *  errorCode, {Number} 错误代码
     *  type,	 {String} 支持类型: touchID faceID none
     *  typeName  {String} 支持类型中文名称（转义后）: 指纹 面容
     * }
     * @example App.Native.isSupportFingerprint().then(result=>{})
     */
    isSupportFingerprint() {
        return new Promise(resolve => {
            AlipayJSBridge.call(
                'openTouchID', {
                    action: 'isSupportTouchID'
                },
                res => {
                    resolve({
                        //errorCode {Number} 错误码，仅当status为0时返回 。-8：支持但已被锁 -2000：已越狱或已ROOT
                        status: res.status === 1 || (res.status === 0 && res.errorCode === -8),
                        type: res.type,
                        errorCode: res.errorCode || '',
                        typeName: new Map([
                            ['touchID', '指纹'],
                            ['faceID', '面容']
                        ]).get(
                            res.type
                        ) || ''
                    });
                }
            );
        });
    },

    /**
   * @method fingerprintVerify
   * @desc 验证手机指纹（或面部验证）
   * @param {object} opt -
   * {
 * 	message  提示信息
 * 	buttonText  第二个按钮文字 留空则不显示，否则会在验证失败时显示
 * }
   * @returns {object}
   * {
 *  status  {Number}
      0——通过验证
      -100——不支持指纹或人脸识别
      -2000——已经越狱或ROOT
      -1——指纹不匹配
      -2——在TouchID对话框中点击了取消按钮
      -3——在TouchID对话框中点击了第二个按钮（buttonText不为空才会触发）
      -4——TouchID对话框被系统取消，例如按下Home或者电源键
      -5——设备系统未设置密码
      -6——设备未设置Touch ID
      -7——用户未录入指纹
      -8——Touch ID被锁，需要用户输入密码解锁
      -9——用户不能控制情况下APP被挂起
      -10——未知错误
  errorMessage {String} 错误信息
 * }
   * @example App.Native.fingerprintVerify({ buttonText: '重输密码', message: '轻触Home键验证已有手机指纹' }).then(result=>{})
   */
    fingerprintVerify(opt = {}) {
        opt = Object.assign({
                buttonText: '',
                message: '请验证已有{type}'
            },
            opt, {
                action: 'recognitionTouchID'
            }
        );
        return new Promise(async resolve => {
            let {
                status,
                typeName = '指纹',
                type,
                errorCode
            } = await _Native.isSupportFingerprint();
            let errorMessage = new Map([
                [-100, `不支持${typeName}识别`],
                [-2000, `设备已越狱或ROOT，无法使用${typeName}识别`],
                [-1, `验证不通过`],
                [-2, `用户取消验证`],
                [-3, `用户点击了${opt.buttonText}按钮`],
                [-4, `验证被系统取消`],
                [-5, `设备系统未设置密码`],
                [-6, `设备不支持或未开启${typeName}识别`],
                [-7, `用户未录入指纹`],
                [-8, `${typeName}验证失败次数超限，现已暂停，请稍候再试`],
                [-9, `APP已被挂起`],
                [-10, `未知错误`]
            ]);
            if (!status) {
                return resolve({
                    status: errorCode ? errorCode : -6,
                    errorMessage: errorMessage.get(errorCode ? errorCode : -6) || '未知错误',
                    type,
                    typeName
                });
            }
            opt.message = opt.message.replace('{type}', typeName);
            AlipayJSBridge.call('openTouchID', opt, res => {
                res.errorMessage =
                    res.status === 0 ?
                    '' :
                    errorMessage.get(res.status) || `未知错误：${res.status}`;
                res.type = type;
                res.typeName = typeName;
                resolve(res);
            });
        });
    },

    /**
     * @method getDeviceFingerprintPayStatus
     * @desc 获取设备指纹/面容支付开关状态
     * @returns {Boolean} 是否开启
     * @example App.Native.getDeviceFingerprintPayStatus().then(result=>{})
     */
    getDeviceFingerprintPayStatus() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getFingerPayStatus', ({
                result
            }) => {
                resolve(result);
            });
        });
    },
    /**
     * @method isSupportFingerprintPay
     * @desc 判断是否可使用指纹（面容）支付功能
     * @returns {Boolean} 是否可用
     * @example App.Native.getDeviceFingerprintPayStatus() => true | false
     */
    async isSupportFingerprintPay() {
        let [userInfo, {
            os
        }] = await Promise.all([
            _Native.userInfo(),
            _Native.clientInfo()
        ]);
        if (__isEmptyObject(userInfo) || os !== 'ios') {
            return false;
        }
        return !!(
            (await _Native.getDeviceFingerprintPayStatus()) &&
            (await _Native.isSupportFingerprint()).status
        );
    },

    /**
   * @method fingerprintPay
   * @desc 调用指纹（人脸）支付功能
   * @param {any} fallBackFunction - 当设备不支持指纹（人脸）识别功能或用户点击了“输入密码”按钮的回调函数
   * @returns {any} {boolean|object} 仅当结果!==false时才能继续业务逻辑
   * {
      status  {Number}
      0——通过验证
      -100——不支持指纹或人脸识别
      -2000——已经越狱或ROOT
      -1——指纹不匹配
      -2——在TouchID对话框中点击了取消按钮
      -3——在TouchID对话框中点击了第二个按钮
      -4——TouchID对话框被系统取消，例如按下Home或者电源键
      -5——设备系统未设置密码
      -6——设备未设置Touch ID
      -7——用户未录入指纹
      -8——Touch ID被锁，请验证锁屏密码解锁
      -9——用户不能控制情况下APP被挂起
      -10——未知错误
      -11——用户未登录
  errorMessage {String} 错误信息
  result {Object}
      type,
      typeName,
      errorMessage,
      data:{
        uuid UUID （用于接口上送）
        UTDID mpaas sdk生成的设备唯一ID
        withdrawPwd 设备指纹 （用于接口上送）
        userOs 系统类型 i代表ios 、a代表Android （用于接口上送）
        safeToolType 安全认证方式 （用于接口上送）
        isWithdrawPwd 支付时必须验证设备指纹 （用于接口上送）
      }
   * }
   * @example App.Native.fingerprintPay(()=>{
 * 		//用户点击输入密码按钮或设备不支持指纹（人脸）识别时会触发该回调 应在此完成支付密码验证相关逻辑（比如显示支付密码输入框）
 * }).then(result=>{
 * 		if(result){//成功 应在此完成支付逻辑
 * 			data = Object.assign(data,result.data) //合并到上送参数
 * 			//开始请求支付接口...
 * 			App.Native.rpc({
 * 				operationType: '****',
 * 				data
 * 			}).then(({header,body})=>{
 * 				//支付成功
 * 			},({header,body})=>{
 * 				//支付失败
 * 				App.Native.toast({
 * 					content: header.errorMsg,
 * 					type: 'exception'
 * 				})
 * 			})
 * 		}
 * },error=>{
 * 		//提示用户错误信息
 * 		App.Native.toast({
 *			content: error.errorMessage,
 *			type: 'exception'
 *		})
 * });
   *
   */
    async fingerprintPay(fallBackFunction = () => {}) {
        let [userInfo, {
            os,
            utdid: UTDID,
            uuid
        }] = await Promise.all([
            _Native.userInfo(),
            _Native.clientInfo()
        ]);
        //未登录、获取不到指纹支付开关状态、设备不支持指纹均返回false
        if (__isEmptyObject(userInfo)) {
            //判断是否登录
            throw {
                status: -11,
                errorMessage: '尚未登录',
                type: 'none'
            };
        } else if (os !== 'ios') {
            //非ios，禁用指纹支付功能
            throw {
                status: -6,
                errorMessage: '设备不支持',
                type: 'none'
            };
        } else {
            //判断指纹支付开关状态
            if (await _Native.isSupportFingerprintPay()) {
                //缓存开关已开
                let result = await _Native.fingerprintVerify({
                    message: '请验证已有{type}，用于支付',
                    buttonText: '输入密码'
                });
                if (result.status === 0) {
                    //验证成功
                    if (result.verifyType === 'password') {
                        //用户通过锁屏密码验证通过则再验证一次指纹
                        return _Native.fingerprintPay(fallBackFunction);
                    }
                    let {
                        result: withdrawPwd = ''
                    } = await _Native.fingerMark();
                    return Object.assign(result, {
                        data: {
                            userOs: os === 'ios' ? 'i' : 'a',
                            UTDID,
                            uuid,
                            withdrawPwd,
                            isWithdrawPwd: 'Y',
                            safeToolType: result.type === 'touchID' ? '5' : '14' //安全认证方式：5是指纹；14是面容
                        }
                    });
                } else if (result.status === -2) {
                    //点击了取消
                    return false;
                } else if (
                    result.status === -3 ||
                    result.status === -6 ||
                    result.status === -100 ||
                    result.status === -2000
                ) {
                    //点击了第二个按钮或设备不支持指纹、面部识别，触发fallBack回调
                    fallBackFunction.call();
                    return false;
                } else {
                    //其他各种错误 包括验证未通过
                    throw result;
                }
            } else {
                //缓存开关已关
                fallBackFunction.call();
                return false;
            }
        }
    },

    /**
     * @method disableFingerprintPay
     * @desc 关闭指纹支付开关(本地)
     * @returns {Object}
     * @example App.Native.disableFingerprintPay().then(result=>{})
     */
    disableFingerprintPay() {
        return new Promise((resolve, reject) => {
            AlipayJSBridge.call('closeFingerPayStatus', result => {
                __processError(result).then(resolve, reject);
            });
        });
    },

    /**
     * @method fingerMark
     * @desc 设备指纹
     * @returns {Object}
     * @example App.Native.fingerMark().then(res => {})
     */
    fingerMark() {
        return new Promise(reslove => {
            AlipayJSBridge.call('getDeviceFingerprint', res => {
                reslove(res);
            });
        });
    },

    /**
     * @method selectCity
     * @desc 选择城市
     * @returns {Object}
     * @example App.Native.selectCity().then(({cityName,cityCode}) => {})
     */
    selectCity() {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call('selectCity', res => {
                if (res.error !== -1) {
                    // __postNotification('cityChanged', res)
                    App.vm.$store.commit('__updateCityInfo', res);
                    reslove(res);
                } else {
                    App.vm.$store.commit('__updateCityInfo', {
                        cityName: '广州市'
                    });
                    reject(res);
                }
            });
        });
    },

    /**
     * @method cityInfo
     * @desc 获取当前城市
     * @returns {Object}
     * @example App.Native.cityInfo().then(({cityName,cityCode}) => {})
     */
    cityInfo() {
        return new Promise(reslove => {
            AlipayJSBridge.call('getCityInfo', res => {
                reslove(res);
            });
        });
    },

    /**
     * @method mapLocate
     * @desc 获取定位
     * @returns {Object}
     * @example App.Native.mapLocate().then(({
     *		latitude
     *		longitude
     *		city
     *		province,
     *		addrStr
     *  }) => {})
     */
    mapLocate() {
        return new Promise((reslove, reject) => {
            AlipayJSBridge.call('mapLocate', res => {
                __processError(res)
                    .then(e => {
                        // __postNotification('cityChanged', {
                        // 	cityName: e.city,
                        // 	cityCode: e.cityCode
                        // })
                        App.vm.$store.commit('__updateCityInfo', {
                            cityName: e.city,
                            cityCode: e.cityCode
                        });
                        reslove(e);
                    })
                    .catch(e => {
                        App.vm.$store.commit('__updateCityInfo', {
                            cityName: '广州市'
                        });
                        reject(e);
                    });
            });
        });
    },

    /**
     * @method userImg
     * @desc 获取用户头像
     * @returns {Object}
     * @example App.Native.userImg().then(({result}) => {})
     */
    userImg() {
        return new Promise(resolve => {
            AlipayJSBridge.call('userImg', ({
                result
            }) => {
                resolve(result);
            });
        });
    },

    /**
     * @method openSyncsteps
     * @desc 调G-Froce手环
     * @returns {Object}
     * @example App.Native.openSyncsteps().then()
     * {
     *     mobileNo:   登录手机号
     *     certNo:     证件号码
     *     certType:   证件类型
     *     customerId: 客户编号
     * }
     */
    openSyncsteps(opt) {
        return new Promise(resolve => {
            AlipayJSBridge.call('syncsteps', opt, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method settingpwd
     * @desc - 一次完整注册时调用原生的设置密码页面
     * @param {object} opt -
     * {
     * 	mobileNo:  手机号
     * }
     * @returns {Object}
     * @example App.Native.settingpwd(opt).then()
     */
    settingpwd(opt = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('settingpwd', opt, res => {
                resolve(res);
            });
        });
    },

    /**
   * @method merchantMap
   * @desc 商户描点
   * @param {Object} opt - 参数
   * {
 *  mcd_area:,地区名
  distance:,距离
  discountType:,优惠券类型
  sortMode:, 排序类型
  custom_tag:,商圈标签
  mbt_type_id:,二级品牌类型ID
  mac_id:,一级品牌类型ID
  mbt_type_name:,二级品牌类型名称
  store_tag 热门标签
 * }
   * @returns {Object}
   * @example App.Native.merchantMap().then()
   */
    merchantMap(opt = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('merchantMap', opt, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method readsms
     * @desc 安卓短信自动填写
     * @param {Oobject} opt -
     * {
     * 	smsNumber:  '95508'
     * }
     * @returns {Object}
     * @example App.Native.readsms(opt).then()
     */
    readsms(
        opt = {
            smsNumber: '95508'
        }
    ) {
        return new Promise(resolve => {
            AlipayJSBridge.call('readsms', opt, res => {
                resolve(res);
            });
        });
    },

    /**
     * @method closePage
     * @desc - 关闭制定页面
     * @param {Object} opt -
     * {
     * 	urls:  ['url','url']
     * }
     * @example App.Native.closePage(opt)
     */
    closePage(
        opt = {
            urls: []
        }
    ) {
        AlipayJSBridge.call('closePage', opt);
    },

    /**
     * @method hideTitlebar
     * @desc 关闭原生头部
     * @example App.Native.hideTitlebar(）
     */
    hideTitlebar() {
        AlipayJSBridge.call('hideTitlebar');
    },

    /**
     * @method showTitlebar
     * @desc 调起原生头部
     * @example App.Native.showTitlebar(）
     */
    showTitlebar() {
        AlipayJSBridge.call('showTitlebar');
    },

    /**
     * @method verifySuccess
     * @desc 通知原生验证成功（更换设备）
     * @example App.Native.verifySuccess()
     */
    verifySuccess() {
        AlipayJSBridge.call('verifySuccess');
    },

    /**
     * @method authorSuccess
     * @desc 通知原生验证成功（授权登录）
     * @example App.Native.authorSuccess()
     */
    authorSuccess() {
        AlipayJSBridge.call('authorSuccess');
    },

    /**
     * @method homePage
     * @desc - 回到首页的首页
     * @example App.Native.homePage(）
     */
    homePage(opt = {}) {
        AlipayJSBridge.call('homePage', opt);
    },

    /**
     * @method modifyPwd
     * @desc 跳到简易密码修改页面
     * @example App.Native.modifyPwd(）
     */
    modifyPwd() {
        AlipayJSBridge.call('modifyPwd');
    },

    /**
     * @method showBarMask
     * @desc 显示原生头部的蒙版
     * @example App.Native.showBarMask(）
     */
    showBarMask() {
        AlipayJSBridge.call('showBarMask');
    },

    /**
     * @method hideBarMask
     * @desc 隐藏原生头部的蒙版
     * @example App.Native.hideBarMask(）
     */
    hideBarMask() {
        AlipayJSBridge.call('hideBarMask');
    },

    /**
     * @method showBarBottomLine
     * @desc 显示原生头部下阴影
     * @example App.Native.showBarBottomLine(）
     */
    showBarBottomLine() {
        AlipayJSBridge.call('showBarBottomLine');
    },

    /**
     * @method hideBarBottomLine
     * @desc - 隐藏原生头部下阴影
     * @example App.Native.hideBarBottomLine(）
     */
    hideBarBottomLine() {
        AlipayJSBridge.call('hideBarBottomLine');
    },

    //==========================Begin===============================

    /**
     * @method startLocal
     * @desc 开启 gps
     * @returns {Object}
     * @example App.Native.startLocal().then()
     */
    startLocal() {
        return new Promise(resolve => {
            AlipayJSBridge.call('startLocal', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openGPSOrNo
     * @desc 判断是否开启 gps
     * @returns {Object}
     * @example App.Native.openGPSOrNo().then()
     */
    openGPSOrNo() {
        return new Promise(resolve => {
            AlipayJSBridge.call('openGPSOrNo', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openBaiduFace
     * @desc -  开启 人脸识别
     * @param {Object} opts -
     * {
     * 	  workTime : 活体单次操作超时时间
     * 	  currencyTimes : 人脸比对照片数
     * 	  flag : 活体开关
     * 	  countTime : 连续活体认证通过次数
     * 	  collectActionType :
     * 	  timemark : 时间戳
     * 	  cardNo :
     * 	  certNo :
     * 	  time : `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
     * 	  item :
     * 	  addWater :
     * }
     * @returns {Object}
     * @example App.Native.openBaiduFace(opts).then()
     */
    openBaiduFace(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('openBaiduFace', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method showProtocolImage
     * @desc 协议截屏
     * @param {Object} opts
     * @returns {Object}
     * @example App.Native.showProtocolImage(opts).then()
     */
    showProtocolImage(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('showProtocolImage', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method showOCRIDCard
     * @desc 传送水印参数
     * @param {Object} opts -
     * {
     *    title :
     *    key : []
     *    ...
     * }
     * @returns {Object}
     * @example App.Native.showOCRIDCard(opts).then()
     */
    // showOCRIDCard(opts = {}) {
    //     return new Promise(resolve => {
    //         AlipayJSBridge.call('showOCRIDCard', opts, data => {
    //             resolve(data);
    //         });
    //     });
    // },

    /**
     * @method showOCRCard
     * @desc 传送水印参数
     * @param {Object} opts -
     * {
     *    title :
     *    ...
     * }
     * @returns {Object}
     * @example App.Native.showOCRCard(opts).then()
     */
    showOCRCard(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('showOCRCard', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method setLandscape
     * @desc 让页面横屏
     * @returns {Object}
     * @example App.Native.setLandscape()
     */
    setLandscape() {
        return new Promise(resolve => {
            AlipayJSBridge.call('setLandscape', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method setPortrait
     * @desc 让页面竖屏
     * @returns {Object}
     * @example App.Native.setPortrait()
     */
    setPortrait() {
        return new Promise(resolve => {
            AlipayJSBridge.call('setPortrait', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method screenshot
     * @desc 截屏
     * @param {Object}
     * @returns {Object}
     * @example App.Native.screenshot(opts)
     */
    screenshot(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('screenshot', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @desc 分享到指定渠道
     * @param {opts.name} 渠道名称，详细参考阿里的jsapi
     * @returns {Object.param} 分享参数{title,content,imageUrl,url,imageData}
     * @example App.Native.screenshot(opts)
     */
    shareToChannel(opts) {
        return new Promise(resolve => {
            AlipayJSBridge.call("shareToChannel", {
                bizType: 'BIZTYPE_TEST',
                name: opts.name,
                param: opts.data
            }, (data) => {
                resolve(data);
            });
        });
    },

    /**
     * @method shareModule
     * @desc 暂无
     * @param {Object} opts -
     * {
     *    shareList : 分享列表
     * }
     * @example App.Native.shareModule(opts)
     */
    shareModule(opts = {}) {
        AlipayJSBridge.call('shareModule', opts);
    },

    /**
     * @method share
     * @desc 调用分享
     * @param {Object} opts -
     * {
     *    title : 标题
     *    url : 链接
     *    description : 描述
     *    img : 分享的图片
     *    SharePrize : object
     * }
     * @example App.Native.share(opts)
     */
    share(opts = {}) {
        AlipayJSBridge.call('share', opts);
    },

    /**
     * @method openSettings
     * @desc 开启设置
     * @example App.Native.openSettings()
     */
    openSettings() {
        AlipayJSBridge.call('openSettings');
    },

    /**
     * @method openGesture
     * @desc 开启手势
     * @param {Object} opts -
     * {
     *    type :
     * }
     * @returns {Object}
     * @example App.Native.openGesture(opts).then()
     */
    openGesture(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('openGesture', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method getGesture
     * @desc 获取手势
     * @returns {Object}
     * @example App.Native.getGesture().then()
     */
    getGesture() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getGesture', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method getGestureShow
     * @desc 暂无
     * @returns {Object}
     * @example App.Native.getGestureShow().then()
     */
    getGestureShow() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getGestureShow', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method modifyGesture
     * @desc 修改手势
     * @returns {Object}
     * @example App.Native.modifyGesture().then()
     */
    modifyGesture() {
        return new Promise(resolve => {
            AlipayJSBridge.call('modifyGesture', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openGestureShow
     * @desc 暂无
     * @returns {Object}
     * @example App.Native.openGestureShow().then()
     */
    openGestureShow() {
        return new Promise(resolve => {
            AlipayJSBridge.call('openGestureShow', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method closeGestureShow
     * @desc 暂无
     * @returns {Object}
     * @example App.Native.closeGestureShow().then()
     */
    closeGestureShow() {
        return new Promise(resolve => {
            AlipayJSBridge.call('closeGestureShow', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method closeGesture
     * @desc 暂无
     * @returns {Object}
     * @example App.Native.closeGesture().then()
     */
    closeGesture() {
        return new Promise(resolve => {
            AlipayJSBridge.call('closeGesture', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openFinger
     * @desc 开启后台指纹开关
     * @param {Object} opts -
     * @returns {Object}
     * @example App.Native.openFinger(opts).then()
     */
    openFinger(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('openFinger', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method getFinger
     * @desc 获取指纹
     * @returns {Object}
     * @example App.Native.getFinger().then()
     */
    getFinger() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getFinger', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method closeFinger
     * @desc 关闭后台指纹开关
     * @returns {Object}
     * @example App.Native.closeFinger().then()
     */
    closeFinger() {
        return new Promise(resolve => {
            AlipayJSBridge.call('closeFinger', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method getFaceID
     * @desc 获取原生人脸状态
     * @returns {Object}
     * @example App.Native.getFaceID().then()
     */
    getFaceID() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getFaceID', data => {
                resolve(data);
            });
        });
    },
    /**
     *
     * @method getFace
     * @desc  人脸识别
     * @param cstName 客户名称
     * @param cstCertNo 客户身份证号
     * @param cstCertNoImageId 客户身份证正面照影像ID
     * @param channelNo 接入渠道
     * @param channelSeriaNo 渠道流水号
     * @param bankChannel 核心渠道编号
     * @param faceUsedType 交易类型 00登陆前变更手机号 01登陆后变更手机号 02冻结账户启用 03新增银行卡 04变更银行卡 05直销银行充值
     * @param accessLogo 准入标识
     * @param accessUrl 准入URL
     * @param transCode 交易代码
     * @param faceChannel 人脸使用渠道
     * @param signture 签名字段
     * @param cstCif 核心客户号
     * @param cstBranchNo 客户所属的分支机构号
     * @param faceType 人脸使用类型 checkPersonEx 三证对比 checkPerson 两证对比
     *@param faceTransCode
     * @return OCRAndFaceUtils
     */
    getFace(opt = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('getFace', opt, data => {
                resolve(data);
            });
        });
    },
    /**
     * @method openFaceID
     * @desc 开启后台人脸开关
     * @param {Object} opts -
     * @returns {Object}
     * @example App.Native.openFaceID(opts).then()
     */
    openFaceID(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('openFaceID', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method closeFaceID
     * @desc 关闭后台人脸开关
     * @returns {Object}
     * @example App.Native.closeFaceID().then()
     */
    closeFaceID() {
        return new Promise(resolve => {
            AlipayJSBridge.call('closeFaceID', data => {
                resolve(data);
            });
        });
    },
    /**
     * @method getNFC
     * @desc NFC功能
     * @param {Object} opts -
     * @returns {Object}
     * @example App.Native.getNFC(opts).then()
     */
    getNFC(opts = {}) {
      return new Promise(resolve => {
          AlipayJSBridge.call('getNFC', opts, data => {
              resolve(data);
          });
      });
    },

    /**
     * @method changeCity
     * @desc 修改城市
     * @param {Object} opts -
     * {
     *    cityName : 城市名称
     * }
     * @returns {Object}
     * @example App.Native.changeCity(opts).then()
     */
    changeCity(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('changeCity', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openApp
     * @desc 调用分享
     * @param {Object} opts -
     * {
     *    packageName : app包名
     * }
     * @example App.Native.openApp(opts)
     */
    openApp(opts = {}) {
        AlipayJSBridge.call('openApp', opts);
    },

    /**
     * @method qzonea
     * @desc 暂无
     * @returns {Object}
     * @example App.Native.qzonea().then()
     */
    qzonea() {
        return new Promise(resolve => {
            AlipayJSBridge.call('qzonea', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openPush
     * @desc 开启推送
     * @example App.Native.openPush()
     */
    openPush() {
        AlipayJSBridge.call('openPush');
    },

    /**
     * @method closePush
     * @desc 关闭推送
     * @example App.Native.closePush()
     */
    closePush() {
        AlipayJSBridge.call('closePush');
    },

    /**
     * @method getPushStatus
     * @desc 检查消息推送状态
     * @returns {Object}
     * @example App.Native.getPushStatus().then()
     */
    getPushStatus() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getPushStatus', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method clearCache
     * @desc 清空本地缓存
     * @returns {Object}
     * @example App.Native.clearCache().then()
     */
    clearCache() {
        return new Promise(resolve => {
            AlipayJSBridge.call('clearCache', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method getCacheSize
     * @desc 检查缓存大小
     * @returns {Object}
     * @example App.Native.getCacheSize().then()
     */
    getCacheSize() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getCacheSize', {}, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method thirdApi
     * @desc 请求第三方api
     * @param {Object} opts -
     * {
     *    method : 请求类型
     *    url : 请求的链接
     * }
     * @returns {Object}
     * @example App.Native.thirdApi(opts).then()
     */
    thirdApi(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('thirdApi', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method shareSixModule
     * @desc 暂无
     * @example App.Native.shareSixModule(opts)
     */
    shareSixModule(opts = {}) {
        AlipayJSBridge.call('shareSixModule', opts);
    },

    /**
     * @method saveAlbum
     * @desc 保存图片到相册
     * @param {Oobject} opts -
     * {
     *    name :
     * }
     * @example App.Native.saveAlbum(opts)
     */
    saveAlbum(opts = {}) {
        AlipayJSBridge.call('saveAlbum', opts);
    },

    /**
     * @method sendMail
     * @desc 发送邮件
     * @param {Oobject} opts -
     * {
     *    mailAddr : 邮件地址
     * }
     * @example App.Native.sendMail(opts)
     */
    sendMail(opts = {}) {
        AlipayJSBridge.call('sendMail', opts);
    },

    /**
     * @method getMsgStatus
     * @desc 获取消息状态
     * @returns {Object}
     * @example App.Native.getMsgStatus().then()
     */
    getMsgStatus() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getMsgStatus', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method
     * @desc 设置消息状态
     * @param {Oobject} opts -
     * {
     *    type :
     * }
     * @example App.Native.setMsgStatus(opts)
     */
    setMsgStatus(opts = {}) {
        AlipayJSBridge.call('setMsgStatus', opts);
    },

    /**
     * @method openApplePay
     * @desc 开启苹果支付
     * @param {Oobject} opts -
     * {
     *    action :
     * }
     * @example App.Native.openApplePay(opts)
     */
    openApplePay(opts = {}) {
        AlipayJSBridge.call('openApplePay', opts);
    },

    /**
     * @method canAddToNative
     * @desc 暂无
     * @param {Oobject} opts -
     * {
     *    accountno :
     * }
     * @returns {Object}
     * @example App.Native.canAddToNative(opts).then()
     */
    canAddToNative(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('canAddToNative', opts, data => {
                resolve(data);
            });
        });
    },

    /**
     * @method setOptionMenu
     * @desc 设置头部菜单样式
     * @param {Oobject} opts -
     * {
     *    title : 标题
     *    color : 颜色值
     *    ...
     * }
     * @example App.Native.setOptionMenu(opts)
     */
    setOptionMenu(opts = {}) {
        AlipayJSBridge.call('setOptionMenu', opts);
    },

    /**
     * @method showOptionMenu
     * @desc 展示头部菜单
     * @example App.Native.showOptionMenu()
     */
    showOptionMenu() {
        AlipayJSBridge.call('showOptionMenu');
    },

    /**
     * @method isOpenBluetooth
     * @desc 是否开启蓝牙
     * @returns {Object}
     * @example App.Native.isOpenBluetooth().then()
     */
    isOpenBluetooth() {
        return new Promise(resolve => {
            AlipayJSBridge.call('isOpenBluetooth', data => {
                resolve(data);
            });
        });
    },

    /**
     * @method openBluetooth
     * @desc 开启蓝牙
     * @example App.Native.openBluetooth()
     */
    openBluetooth() {
        AlipayJSBridge.call('openBluetooth');
    },

    /**
     * @method raiseBrightness
     * @desc 提高屏幕亮度
     * @example App.Native.raiseBrightness()
     */
    raiseBrightness() {
        AlipayJSBridge.call('raiseBrightness');
    },

    /**
     * @method closeBrightness
     * @desc 关闭屏幕亮度
     * @example App.Native.closeBrightness()
     */
    closeBrightness() {
        AlipayJSBridge.call('closeBrightness');
    },

    /**
     * @method openContactPicker
     * @desc 调起通信录
     * @param {Oobject} opts -
     * {
     * }
     * @returns {Object}
     * @example App.Native.openContactPicker(opts).then()
     */
    openContactPicker(opts = {}) {
        return new Promise(resolve => {
            AlipayJSBridge.call('openContactPicker', opts, data => {
                resolve(data);
            });
        });
    },
    /**
     * @desc 调用ocr
     * @param {Oobject} opts -通知手机端调用 applyChannel 申请渠道 accessLogo 准入标识
     * accessUrl 准入URL signture 签名密文 accessType 准入类型 请求类型 00 身份证正面照 01 身份证反面照 02
     * 银行卡 10 身份证正面照并解析 11 身份证反面照并解析 12 银行卡并解析 seriaNo 渠道交易流水 transCode 交易代码
     * @return OCRAndFaceUtils
     */
    ocrScan(opts) {
        return new Promise(resolve => {
            AlipayJSBridge.call('getOCR', opts, data => {
                resolve(data);
            });
        });
    },
    /**
     * @method getServerTime
     * @desc 获取服务器时间（取最近一次RPC请求得到的服务器时间，请紧跟RPC请求后调用）
     * @returns {Date} 日期对象
     * @example App.Native.getServerTime().then(date=>{})
     */
    getServerTime() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getServerTime', {}, res => {
                if (res && res.date) {
                    return resolve(new Date(res.date));
                } else {
                    _Native
                        .rpc({
                            operationType: 'com.ifp.MP0002'
                        })
                        .then(({
                            body
                        }) => {
                            let m = body.currentTime.match(
                                /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d+)/
                            );
                            return m ?
                                resolve(
                                    new Date(
                                        `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}.${m[7]}Z`
                                    )
                                ) :
                                resolve(new Date());
                        });
                }
            });
        });
    },

    /**
     * @desc - 检查版本更新
     * @example App.Native.checkNewVersion()
     * @return {object} {}
     */
    checkNewVersion() {
        return new Promise(resolve => {
            AlipayJSBridge.call('checkNewVersion', {}, res => {
                resolve(res);
            });
        });
    },
    /**
     * @desc - 通讯录联系人选择
     * @example App.Native.getContacts()
     * @return {object} {}
     */
    getContacts() {
        return new Promise(resolve => {
            AlipayJSBridge.call('getContacts', {}, res => {
                resolve(res);
            });
        });
    },

    /**
     * @desc - 通过城市中文名字获取城市code
     * @example App.Native.getCityCodeByName()
     * @param {cityName: string}
     * @return {city, code}
     */
    getCityCodeByName(cityName) {
        return new Promise(resolve => {
            AlipayJSBridge.call(
                'getCityCodeByName', {
                    cityName
                },
                res => {
                    resolve(res);
                }
            );
        });
    },
    /**
    * @desc - 本地选择图片
    * @example App.Native.chooseImage()
      chooseImage({clip,quality},cb) {
    * @param {clip,quality}   clip  布尔值,是否剪裁  quality  图片压缩比例 0-1
    */
    chooseImage({ clip, quality }) {
        return new Promise(reslove => {
            AlipayJSBridge.call('chooseImage', { clip, quality }, res => {
                reslove(res);
            })
        })
    },
    /**
     * @desc - 扫一扫
     * @example App.Native.getScans()
     * @name @guo
     */
    getScans({
        title,
        remake
    }) {
        return new Promise(reslove => {
            AlipayJSBridge.call(
                'getScan', {
                    title,
                    remake
                },
                res => {
                    reslove(res);
                }
            );
        });
    },
    /**
     * @desc - 获取经纬度
     * @example App.Native.getLocations()
     * @name @guo
     */

    // chooseImage(cb) {
    //     AlipayJSBridge.call('pushWindow', {
    //         url: 'quickError.html'
    //     });
    // },
    /**
     * @desc - 扫一扫
     * @example App.Native.getScans()
     * @name @guo
     */
    getScans({
        title,
        remake
    }) {
        return new Promise(reslove => {
            AlipayJSBridge.call(
                'getScan', {
                    title,
                    remake
                },
                res => {
                    reslove(res);
                }
            );
        });
    },
    /**
     * @desc - 获取经纬度
     * @example App.Native.getLocations()
     * @name @guo
     */

    getLocations() {
        return new Promise(reslove => {
            AlipayJSBridge.call('getLocation', {}, res => {
                reslove(res);
            });
        });
    },
    /**
     * @desc - 自定义埋点
     * @example App.Native.remoteLog('eventId', 'a=1&b=2')
     *
     */
    remoteLog(eventId, paramStr) {
      console.log(`埋点事件:${eventId}`, `埋点参数:${paramStr}`);
      AlipayJSBridge.call('remoteLog', {
        type: "behavior",
        logLevel: 1,
        spmId: eventId,
        actionId: "event",
        param4: paramStr
      });
    }
};

export default _Native;
