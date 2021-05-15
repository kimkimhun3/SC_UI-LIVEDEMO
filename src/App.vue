<template>
  <v-app>
    <Navbar
      v-if="
        $route.name !== 'login' && $route.name !== 'device-login' && isLoaded
      "
    />
    <NavDrawer
      :user="user"
      v-if="
        $route.name !== 'login' && $route.name !== 'device-login' && isLoaded
      "
    />
    <v-content>
      <router-view :user="user" v-if="isLoaded"></router-view>
    </v-content>
    <Footer class="mt-10" v-if="$route.name !== 'login'" />
  </v-app>
</template>

<script>
import Navbar from "./layouts/Navbar";
import NavDrawer from "./layouts/NavDrawer";
import Footer from "./layouts/Footer";

// import backend from "./Service";
import auth from "./auth";
import synclog from "./synclog";
//import { mapState } from "vuex";
import { getUserInfo } from "./store/user-module/types";

export default {
  name: "App",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async getUser() {
      await this.$store.dispatch(getUserInfo);
      this.user = this.$store.getters.user;
    },
    async redirectUnauthorized() {
      if (
        window.location.pathname === "/devices" &&
        (this.user.role !== "Admin" || this.user.role !== "Admin")
      )
        window.location.replace("/");
    }
  },
  components: {
    Navbar,
    NavDrawer,
    Footer
  },
  // computed: {
  //   ...mapState(["user"])
  // },
  computed: {
    isLoaded() {
      let loaded;
      if (
        window.location.pathname == "/" ||
        window.location.pathname == "/device-login"
      )
        loaded = true;
      else if (
        window.location.pathname != "/" &&
        this.$store.getters.user.name == undefined
      )
        loaded = false;
      else loaded = true;
      return loaded;
    }
  },
  async created() {
    await this.getUser();
    this.redirectUnauthorized();
    auth();
    synclog;
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
