import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store/index";
import NProgress from "../utils/progress";

// TODO 此处无法通过引用 import { useStore } from 'vuex'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "../components/NotFound.vue"),
    meta: {
      title: "404",
      main: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// const childrenPath = ['webpack-app', 'map-app', 'form-app', 'table-app']
// 获取子模块路由前缀 判断是否为子路由
const childrenPath = store.state.systemList.map((item: any) => {
  return item.systemId;
});
console.log(childrenPath, "childrenPath");

router.beforeEach((to, _from, next) => {
  NProgress.start();

  console.log(store.state.systemList, "----useStore----");
  if (to.path === "/login" || to.path === "/init-password") {
    next();
    return false;
  }
  if (!localStorage.getItem("token")) {
    next("/login");
    return false;
  }
  if (to.name) {
    next();
    return false;
  }
  if (childrenPath.some((item) => to.path.includes(item))) {
    next();
    console.log("child");

    return false;
  }
  // 如果找不到路由跳转到404
  next("/404");
  return false;
});

// 页面进入之后
router.afterEach(() => {
  NProgress.done();
});

export default router;
