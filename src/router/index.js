import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Profile from "../views/Profile";
import About from "../views/About";
import Login from "../views/Login";
import StreamRoom from "../views/StreamRoom";
import DeviceManager from "../views/DeviceManager";
import DeviceLogin from "../views/DeviceLogin";
import DeviceHome from "../views/DeviceHome";
import UserManagement from "../views/UserManagement";
import StreamManagement from "../views/StreamManagement";
import VuejsDialog from "vuejs-dialog"
Vue.use(VuejsDialog);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/stream/:streamName",
    name: "stream",
    component: StreamRoom,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/devices",
    name: "devices",
    component: DeviceManager,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/device-login",
    name: "device-login",
    component: DeviceLogin,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/device-home",
    name: "device-home",
    component: DeviceHome,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/user-management",
    name: "user-management",
    component: UserManagement,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/stream-management",
    name: "stream-management",
    component: StreamManagement,
    meta: {
      requiresAuth: true
    }
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
