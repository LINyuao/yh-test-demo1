import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import { localStorage } from "@/storage";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    meta: {
      tltle: "登陆页面",
      showtabbar: false,
      isLogin: false //需要登录才能进入isLogin设置为true
    },
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: {
      tltle: "注册页面",
      showtabbar: false
    },
    component: () => import("../views/register")
  },
  {
    path: "/forgetpwd",
    name: "forgetpwd",
    meta: {
      tltle: "找回密码页面",
      showtabbar: false
    },
    component: () => import("../views/forgetpwd")
  },
  {
    path: "/app",
    name: "app",
    component: () => import("../views/layout"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          showtabbar: true,
          tltle: "校贝通首页",
          changecolor: 1,
          pdb50: true
        },
        component: () => import("../views/home")
      },
      {
        path: "/communication",
        name: "communication",
        meta: {
          showtabbar: true,
          tltle: "交流",
          changecolor: 1,
          pdb50: true
        },
        component: () => import("../views/communication")
      },
      {
        path: "/mine",
        name: "mine",
        meta: {
          showtabbar: true,
          tltle: "我的",
          changecolor: 1,
          pdb50: true
        },
        component: () => import("../views/mine")
      },
      {
        path: "/shopmarket",
        name: "shopmarket",
        meta: {
          showtabbar: true,
          tltle: "校贝通商城",
          changecolor: 1,
          pdb50: true
        },
        component: () => import("../views/shopmarket")
      },
      {
        path: "/noticeDetail/:id",
        name: "noticeDetail",
        meta: {
          showtabbar: false,
          tltle: "通知详情"
        },
        component: () => import("../views/notice/noticeDetail")
      },
      {
        path: "/taskDetail/:id",
        name: "taskDetail",
        meta: {
          showtabbar: false,
          tltle: "已发布作业"
        },
        component: () => import("../views/detail/taskdetail")
      },
      {
        path: "/approvalDetail/:id",
        name: "approvalDetail",
        meta: {
          showtabbar: false,
          tltle: "发起审批"
        },
        component: () => import("../views/approval/approvaldetail")
      },
      {
        path: "/task",
        name: "task",
        meta: {
          showtabbar: false,
          tltle: "家庭作业"
        },
        component: () => import("../views/task")
      },
      {
        path: "/location",
        name: "location",
        meta: {
          showtabbar: false,
          tltle: "学生定位"
        },
        component: () => import("../views/location")
      },
      {
        path: "/classes",
        name: "classes",
        meta: {
          showtabbar: false,
          relay: true,
          tltle: "班级通知"
        },
        component: () => import("../views/classes")
      },
      {
        path: "/diligence",
        name: "diligence",
        meta: {
          showtabbar: false,
          history: true,
          tltle: "班级考勤"
        },
        component: () => import("../views/diligence")
      },
      {
        path: "/mstatistics",
        name: "mstatistics",
        meta: {
          showtabbar: false,
          rstatistics: true,
          tltle: "月统计"
        },
        component: () => import("../views/diligence/mstatistics")
      },
      {
        path: "/rstatistics",
        name: "rstatistics",
        meta: {
          showtabbar: false,
          tltle: "日统计"
        },
        component: () => import("../views/diligence/rstatistics")
      }
    ]
  },
  {
    path: "/childlayout",
    name: "childlayout",
    component: () => import("../views/layout/indexnext.vue"),
    children: [
      {
        path: "/uploadwork",
        name: "uploadwork",
        meta: {
          showtabbar: false,
          tltle: "发布作业"
        },
        component: () => import("../views/upload/work.vue")
      },
      {
        path: "/buttonlayout",
        name: "buttonlayout",
        meta: {
          showtabbar: false,
          tltle: "家庭作业"
        },
        component: () => import("../views/buttonlayout"),
        children: [
          {
            path: "/notice",
            name: "notice",
            meta: {
              showtabbar: false,
              relay: true,
              tltle: "通知公共"
            },
            component: () => import("../views/notice")
          },
          {
            path: "/classpay",
            name: "classpay",
            meta: {
              showtabbar: false,
              tltle: "班级缴费",
              pdb50: true
            },
            component: () => import("../views/classpay")
          },
          {
            path: "/uploadpay",
            name: "uploadapay",
            meta: {
              showtabbar: false,
              tltle: "发布缴费"
            },
            component: () => import("../views/upload/pay.vue")
          },
          {
            path: "/uploadleave",
            name: "uploadleave",
            meta: {
              showtabbar: false,
              tltle: "发布请假"
            },
            component: () => import("../views/upload/leave.vue")
          },
          {
            path: "/approval",
            name: "approval",
            meta: {
              showtabbar: false,
              tltle: "办公审批"
            },
            component: () => import("../views/approval")
          },
          {
            path: "/leave",
            name: "leave",
            meta: {
              showtabbar: false,
              tltle: "班级请假"
            },
            component: () => import("../views/leave")
          },
          {
            path: "/uploadapprove",
            name: "uploadapprove",
            meta: {
              showtabbar: false,
              tltle: "发布审批"
            },
            component: () => import("../views/upload/approve.vue")
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

let token = localStorage.loadFromLocal("token");
router.beforeEach((to, from, next) => {
  //如果登录标志存在且为isLogin，即用户已登录
  console.log(to);
  if (token === "isLogin") {
    //设置vuex登录状态为已登录
    store.state.isLogin = true;
    next();

    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      next({
        name: "home"
      });
    }

    //如果登录标志不存在，即未登录
  } else {
    //用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: "/login"
      });
      //用户进入无需登录的界面，则跳转继续
    } else {
      next();
    }
  }
});

export default router;
