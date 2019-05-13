import Vue from 'vue'
import Router from 'vue-router'

// 首页
const home = resolve => require(['@/pages/home/home'], resolve);
const index = resolve => require(['@/pages/home/index/index'], resolve);
//扫一扫
const scanning = resolve => require(["@/pages/home/index/scanning/scanning"], resolve);
//地址
const location = resolve => require(["@/pages/home/index/location/location"], resolve);
//分享
const share=resolve=>require(["@/pages/home/my/my-invitation/share"],resolve)
//文章列表
const articleList = resolve => require(['@/pages/home/index/article-list/article-list'], resolve);
//文章详情
const articleDetails = resolve => require(['@/pages/home/index/article-list/article-details/article-details'], resolve);
//发帖
const post = resolve => require(['@/pages/home/post/post'], resolve);
const postContent = resolve => require(['@/pages/home/post/post-content/post-content'], resolve);
const PostContentManager = resolve => require(['@/pages/home/post/post-content/post-content-manager'], resolve);
const PostDetail = resolve => require(['@/pages/home/post/post-content/post-detail'], resolve);
//信贷圈
const creditCircle = resolve => require(['@/pages/home/creditCircle/credit-circle'], resolve);
const creditCirclePost = resolve => require(['@/pages/home/post/creditCirclePost'], resolve);

//订单
const order = resolve => require(['@/pages/home/order/order'], resolve);
//全部订单
const orderall = resolve => require(['@/pages/home/order/orderall'], resolve);
//订单详情
const orderdetail = resolve => require(['@/pages/home/order/orderdetail'], resolve);

const orderdetails = resolve => require(['@/pages/home/order/orderdetails'], resolve);

//个人中心
const my = resolve => require(['@/pages/home/my/my'], resolve);
//登录
const login = resolve => require(['@/pages/home/login/login'], resolve);
//注册
const regist = resolve => require(['@/pages/home/regist/regist'], resolve);
//忘记密码
const forgetPassword = resolve => require(['@/pages/home/forgetPassword/forgetPassword'], resolve);
//设置
const set = resolve => require(['@/pages/home/my/set/set'], resolve);
//实名认证
const myName = resolve => require(['@/pages/home/my/my-name/my-name'], resolve)
    //我的账户
const myAccount = resolve => require(['@/pages/home/my/my-account/my-account'], resolve)
    //帮助中心
const helpCenter = resolve => require(['@/pages/home/my/help-center/help-center'], resolve)
    //信用贷
const creditLoan = resolve => require(['@/pages/home/creditCircle/credit-loan/credit-loan'], resolve)
//车贷
const CarLoan = resolve => require(['@/pages/home/index/car-loan/car-loan'], resolve);
//我要贷款
const GoLoan = resolve => require(['@/pages/home/index/tabber/goloan'], resolve);
//车贷详情
const CarLoanDetail = resolve => require(['@/pages/home/index/car-loan/car-loan-detail'], resolve);
    //产品详情
const creditdetail = resolve => require(['@/pages/home/creditCircle/credit-loan/credit-details'], resolve)
    //我的邀请码
const myInvitation = resolve => require(['@/pages/home/my/my-invitation/my-invitation'], resolve)
    //我的信用卡
const CreditCard = resolve => require(['@/pages/home/index/credit-card/credit-card'], resolve)
    //我的手刷
const Brush = resolve => require(['@/pages/home/index/credit-card/brush'], resolve)
    //活动中心  
const ActiveCenter = resolve => require(['@/pages/home/my/active-center/active-center'], resolve)
    //我的银行卡绑定
const BankCard = resolve => require(['@/pages/home/my/my-bankcard/my-bankcard'], resolve)
    //我的银行卡
const Bank = resolve => require(['@/pages/home/my/my-bankcard/my-bank'], resolve)
    //刷卡支付
const SwipeCard = resolve => require(['@/pages/home/my/swipe-card/swipe-card'], resolve)
    //刷卡支付1
const SwipeCardO = resolve => require(['@/pages/home/my/swipe-card/swipe-card0'], resolve)
    //刷卡记录
const SwipeCardRecord = resolve => require(['@/pages/home/my/swipe-card/swipe-card-record'], resolve)
    //积分商城
const IntegralMall = resolve => require(['@/pages/home/index/integral-mall/integral-mall'], resolve)
    //我的产品
const myProduct = resolve => require(['@/pages/home/my/my-loan/my-product'], resolve)
    //借贷中心
const loanCenter = resolve => require(['@/pages/home/my/my-loan/loan-center'], resolve)
    //我的金豆
const Imazamox = resolve => require(['@/pages/home/my/my-loan/imazamox'], resolve)
    //我的金币
const Gold = resolve => require(['@/pages/home/my/my-loan/gold'], resolve)
    //投诉中心
const Complaint = resolve => require(['@/pages/home/my/my-complaint/complaint'], resolve)
    //会员充值
const Cash = resolve => require(['@/pages/home/my/my-loan/loan-buy'], resolve)
    //个人贷款详情
const PersonLoan = resolve => require(['@/pages/home/creditCircle/credit-loan/person-detail'], resolve)
    //点击率购买
const ClickBuy = resolve => require(['@/pages/home/my/my-loan/click-buy'], resolve)
    //借贷人员入驻
const EnterLoan = resolve => require(['@/pages/home/my/set/enter-loan'], resolve)
    //发布产品
const PushProduct = resolve => require(['@/pages/home/my/my-loan/push-product'], resolve)
    //我的收藏
const MyStar = resolve => require(['@/pages/home/my/my-star/my-star'], resolve)
    //我的帖子
const MyPost = resolve => require(['@/pages/home/my/my-post/my-post'], resolve)
    //信贷圈  我的消息详情
const MyPostDetail = resolve => require(['@/pages/home/my/my-post/my-post-detail'], resolve)
    //更多热门
const MoreHot = resolve => require(['@/pages/home/index/more-hot/more-hot.vue'], resolve)
    //我的需求
const MyNeed = resolve => require(['@/pages/home/my/my-need/my-need.vue'], resolve)
    //更改手机号
const ChangeTel= resolve => require(['@/pages/home/changeTelephone/changeTelephone.vue'], resolve)
//我的信贷圈
const MyCircle= resolve => require(['@/pages/home/creditCircle/my-credit-circle.vue'], resolve)
//我的信贷卡
const CreditCardDetail = resolve=>require(['@/pages/home/index/credit-card/credit-card-detail.vue'],resolve)
//webview
const CardThird = resolve=>require(['@/pages/home/index/cardThird.vue'],resolve)
//我要办卡
const OfficeCard = resolve=>require(['@/pages/home/index/officecard/officecard.vue'],resolve)
//关于我i门
const AboutUs = resolve=>require(['@/pages/home/my/set/aboutus.vue'],resolve)

//隐私条款
const Privacy = resolve=>require(['@/pages/home/index/privacy.vue'],resolve)

//我要还款
//const  Repayment=resolve=>require(['@/pages/home/index/repayment/repayment.vue'],resolve)
//我要收款
//const  Receivables=resolve=>require(['@/pages/home/index/receivables/receivables.vue'],resolve)
//我的客户
///const  MyClient=resolve=>require(['@/pages/home/index/receivables/myclient/myclient.vue'],resolve)
//我的利润
//const  MyProfit=resolve=>require(['@/pages/home/index/receivables/myProfit/myProfit.vue'],resolve)
//推广赚钱
//const  MakeMoney=resolve=>require(['@/pages/home/index/receivables/makemoney/makemoney.vue'],resolve)
//交易明细
const collectMoneybill=resolve=>require(['@/pages/home/kbb/collectMoneybill.vue'],resolve);

//交易明细
const billDetails=resolve=>require(['@/pages/home/kbb/billDetails.vue'],resolve);

//代理中心
const myClient=resolve=>require(['@/pages/home/kbb/myClient.vue'],resolve);
//结算卡
const debitCard=resolve=>require(['@/pages/home/kbb/debitCard.vue'],resolve);
//添加银行卡
const addBank=resolve=>require(['@/pages/home/kbb/addBank.vue'],resolve);
//刷卡收款
const CreditCardReceipts=resolve=>require(['@/pages/home/kbb/CreditCardReceipts.vue'],resolve)
//付款方式
const  Payway=resolve=>require(['@/pages/home/kbb/payway.vue'],resolve)
//支付方式
const NocardPayment=resolve=>require(['@/pages/home/kbb/nocardPayment.vue'],resolve)
//输入验证码
const yzmcode=resolve=>require(['@/pages/home/kbb/code.vue'],resolve)
//支付结果
const payresult=resolve=>require(['@/pages/home/kbb/payresult.vue'],resolve)
//添加借贷卡方式
const  AddCreditCard=resolve=>require(['@/pages/home/kbb/addCreditCard.vue'],resolve)
//付款放肆
const RepayMent=resolve=>require(['@/pages/home/kbb/repayMent.vue'],resolve)
//付款
const payWeb=resolve=>require(['@/pages/home/kbb/payweb.vue'],resolve)
//付款
const payGold=resolve=>require(['@/pages/home/kbb/paygold.vue'],resolve)
//repay还款
const Repay=resolve=>require(['@/pages/home/kbb/repay.vue'],resolve)
//还款计划
const NewTask=resolve=>require(['@/pages/home/kbb/newTask.vue'],resolve)
//设置日期
const setDate=resolve=>require(['@/pages/home/kbb/setDate.vue'],resolve)
//任务日期
const taskDate=resolve=>require(['@/pages/home/kbb/taskDate.vue'],resolve)
//还款任务
const seeProgram=resolve=>require(['@/pages/home/kbb/seeProgram.vue'],resolve)
//分享提成
const joinPartner=resolve=>require(['@/pages/home/kbb/joinPartner.vue'],resolve)
//提成比率
const rate=resolve=>require(['@/pages/home/kbb/rate.vue'],resolve)
//我的客户分享
const sharing=resolve=>require(['@/pages/home/kbb/sharing.vue'],resolve)
//我的利润 
const myProfit=resolve=>require(['@/pages/home/kbb/myProfit.vue'],resolve)
//我的钱包
const myWallet=resolve=>require(['@/pages/home/kbb/wallet.vue'],resolve)
//我的钱包提现
const withdrawal=resolve=>require(['@/pages/home/kbb/withdrawal.vue'],resolve)
//提现记录
const withdrawalLog = resolve => require(['@/pages/home/kbb/withdrawalLog.vue'], resolve)
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
            // new navigation.
            // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}; 
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: __dirname,
    scrollBehavior,
    routes: [{
            path: "/",
            redirect: "/index",
            name: "home",
            component: home,
            children: [
                {
                    path: "/index",
                    name: "index",
                    component: index
                }, {
                    path: "/creditCircle",
                    name: "creditCircle",
                    component: creditCircle,
                    children:[],
                    meta: {
                        auth: true
                    }
                },
               
                {
                    path: "/my",
                    name: "my",
                    component: my,
                    children:[],
                    meta: {
                        auth: true
                    }
                }, {
                    path: "/share",
                    name: "share",
                    component: share,
                    children:[]
                    
                }

            ]
        },
        {
            path: "/index/scanning",
            name: "scanning",
            component: scanning
        },{
            path: "/order",
            name: "order",
            component: order,
            meta: {
                auth: true
            }
        },{
            path: "/index/location",
            name: "location",
            component: location
        },{
            path: "/my/orderall/:type",
            name: "orderall",
            component: orderall,
            meta: {
                auth: true
            }
        },
        {
            path: "/order/orderdetail",
            name: "orderdetail",
            component: orderdetail
        }, 
        {
            path: "/post",
            name: "post",
            component: post,
            meta: {
                auth: true
            }
        },{
            path: "/my/order/orderdetails",
            name: "orderdetails",
            component: orderdetails
        }, {
            path: "/my/my-product",
            name: "product",
            component: myProduct
        },
        {
            path: "/my/login",
            name: "login",
            component: login
        }, {
            path: "/my/login/regist",
            name: "regist",
            component: regist
        },
        {
            path: "/my/login/forgetPassword",
            name: "forgetPassword",
            component: forgetPassword
        },
        {
            path: "/my/set",
            name: "set",
            component: set,
            meta: {
                auth: true
            }
        },
        {
            path: "/my/my-name",
            name: "my-name",
            component: myName,
            meta: {
                auth: true
            }
        }, {
            path: "/my/my-account",
            name: "my-account",
            component: myAccount,
            meta: {
                auth: true
            }
        }, {
            path: "/my/help-center",
            name: "help-center",
            component: helpCenter
        }, {
            path: "/credit/credit-loan",
            name: "credit-loan",
            component: creditLoan
        }, {
            path: "/my/my-invitation",
            name: "my-invitation",
            component: myInvitation
        }, {
            path: "/index/credit-card",
            name: "index-credit",
            component: CreditCard
        }, {
            path: "/index/brush",
            name: "index-brush",
            component: Brush
        }, {
            path: "/my/active-center",
            name: "active-center",
            component: ActiveCenter
        }, {
            path: "/my/my-bankcard",
            name: "my-bankcard",
            component: BankCard
        }, {
            path: "/my/my-bank",
            name: "my-bank",
            component: Bank,
            meta: {
                auth: true,
            }
        }, {
            path: "/my/swipe-card/swipe-card",
            name: "swipe-card",
            component: SwipeCard
        }, {
            path: "/my/swipe-card/swipe-card0",
            name: "swipe-card0",
            component: SwipeCardO
        }, {
            path: "/my/swipe-card/swipe-card-record",
            name: "swipe-card-record",
            component: SwipeCardRecord,
            meta: {
                auth: true,
            }
        }, {
            path: "/index/integral-mall/integral-mall",
            name: "integral-mall",
            component: IntegralMall,
            meta: {
                auth: true,
            }
        },
        {
            path: "/index/article-list",
            name: "articleList",
            component: articleList
        }, {
            path: "/index/article-list/article-details",
            name: "articleDetails",
            component: articleDetails
        },
        {
            path: "/post/post-content",
            name: "postContent",
            component: postContent
        }, {
            path: "/post/post-detail",
            name: "postDetail",
            component: PostDetail
        },
        {
            path: "/my/loan-center",
            name: "loan",
            component: loanCenter
        },
        {
            path: "/my/imazamox",
            name: "Imazamox",
            component: Imazamox
        },
        {
            path: "/my/gold",
            name: "gold",
            component: Gold
        },
        {
            path: "/my/complaint",
            name: "complaint",
            component: Complaint
        }, {
            path: "/myloan/buy",
            name: "buy",
            component: Cash
        }, {
            path: "/credit/credit-detail",
            name: "creditdetail",
            component: creditdetail
        }, {
            path: "/credit/person-detail",
            name: "persondetail",
            component: PersonLoan
        }, {
            path: "/loan/click-buy",
            name: "clickbuy",
            component: ClickBuy
        }, {
            path: "/set/loan-enter",
            name: "loanenter",
            component: EnterLoan,
            meta: {
                auth: true
            }
        }, {
            path: "/loan/push-product",
            name: "push",
            component: PushProduct
        },
        {
            path: "/creditCircle/creditCirclePost",
            name: "creditCirclePost",
            component: creditCirclePost
        },
        {
            path: '/post/post-content-manager',
            name: 'post-content-manager',
            component: PostContentManager
        },
        {
            path: '/my/my-star',
            name: 'my-star',
            component: MyStar,
            meta: {
                auth: true,
            }
        },
        {
            path: '/my/my-post',
            name: 'my-post',
            component: MyPost
        },
        {
            path: '/my/my-post-detail',
            name: 'my-post-detail',
            component: MyPostDetail
        }, {
            path: '/index/more-hot',
            name: 'more-hot',
            component: MoreHot
        },
        {
            path: '/my/my-need',
            name: 'my-need',
            component: MyNeed,
            meta: {
                auth: true,
            }
        },
        {
            path:'/loan/car-loan',
            name :'car-loan',
            component:CarLoan,
        },{
            path:'/loan/car-loan-detail',
            name :'car-loan-detail',
            component:CarLoanDetail,
        },{
            path:'/index/changetel',
            name :'change-telephone',
            component:ChangeTel,
        },{
            path:'/index/go-loan',
            name :'go-loan',
            component:GoLoan
        },{
            path:'/my/my-credit-circle',
            name:'my-credit-circle',
            component:MyCircle
        },{
            path:'/index/credit-card-detail',
            name:'credit-card-detail',
            component:CreditCardDetail
         },{
             path:'/index/officecard',
             name:'officecard',
             component:OfficeCard
        //},{
        //     path:'/index/repayment',
        //     name:'repayment',
        //     component:Repayment
         },{
            path:'/index/cardThird',
            name:'cardThird',
            component:CardThird
         },{
            path:'/my/aboutus',
            name:'aboutUs',
            component:AboutUs
         },{
            path:'/index/privacy',
            name:'privacy',
            component:Privacy
         },
         {
            path:'/kbb/collectMoney/bill',
            name:'collectMoney',
            component:collectMoneybill
         },
         {
            path:'/kbb/collectMoney/billDetails',
            name:'billDetails',
            component:billDetails
         },
         {
            path:'/kbb/myclient',
            name:'myClient',
            component:myClient
         },
         {
            path:'/kbb/debitCard',
            name:'debitCard',
            component:debitCard
         },
         {
            path:'/kbb/addBank',
            name:'addBank',
            component:addBank
         },{
             path:'/kbb/CreditCardReceipts',
             name:'CreditCardReceipts',
             component:CreditCardReceipts,
             meta: {
                 auth: true
             }
         },{
            path:'/kbb/payway',
            name:'payway',
            component:Payway
        },{
            path:'/kbb/nocardPayment',
            name:'nocardPayment',
            component:NocardPayment
        },{
            path:'/kbb/code',
            name:'yzmcode',
            component:yzmcode
		},{ 
			path:'/kbb/payresult',
			name:'payresult',
			component:payresult
			
        },{
            path:'/kbb/addCreditCard',
            name:'AddCreditCard',
            component:AddCreditCard
        },{
            path:'/kbb/repayMent',
            name:'RepayMent',
            component:RepayMent,
            meta: {
                auth: true
            }
        },{
            path:'/kbb/payWeb',
            name:'payWeb',
            component:payWeb
        },{
            path:'/kbb/payGold',
            name:'payGold',
            component:payGold
        },{
            path:'/kbb/repay',
            name:'repay',
            component:Repay
        },{
            path:'/kbb/newTask',
            name:'newTask',
            component:NewTask
        },{
            path:'/kbb/setDate',
            name:'setDate',
            component:setDate
        },{
            path:'/kbb/taskDate',
            name:'taskDate',
            component:taskDate
        },{
            path:'/kbb/seeProgram',
            name:'seeProgram',
            component:seeProgram
        },{
            path:'/kbb/joinPartner',
            name:'joinPartner',
            component:joinPartner
        },{
            path:'/kbb/rate',
            name:'rate',
            component:rate
        },{
            path:'/kbb/sharing',
            name:'sharing',
            component:sharing
        },{
            path:'/kbb/myProfit',
            name:'myProfit',
            component:myProfit
        },{
            path:'/kbb/myWallet',
            name:'myWallet',
            component:myWallet
        },{
            path:'/kbb/withdrawal',
            name:'withdrawal',
            component:withdrawal
        },{
            path:'/kbb/withdrawalLog',
            name:'withdrawalLog',
            component:withdrawalLog
        }
        

        // 
        //,{ 
        //     path:'/index/receivables/makemoney',
        //     name:'makemoney',
        //     component:MakeMoney,
        // },,{ 
        //     path:'/index/receivables/myclient',
        //     name:'myclient',
        //     component:MyClient
        // }
    ]
});


export default router