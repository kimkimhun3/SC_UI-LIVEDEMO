<template>
  <span>
    <v-navigation-drawer
      class="secondary"
      v-model="$store.state.navDrawer"
      app
      temporary
      clipped
    >
      <template v-slot:prepend>
        <v-card class="d-flex flex-column text-center pa-5 transparent" flat>
          <v-card-text class="">
            <v-avatar size="62">
              <img
                :src="
                  user.profilePic
                    ? user.profilePic
                    : 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
                "
                :alt="user.name"
              />
            </v-avatar>
          </v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle class="caption text-uppercase">{{
                user.role
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-divider></v-divider>
        <v-list dense class="mt-5 text-center">
          <v-list-item-group color="primary">
            <v-list-item router to="/home">
              <v-list-item-content>
                <v-list-item-title v-text="'Home'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/profile">
              <v-list-item-content>
                <v-list-item-title v-text="'Profile'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/devices" v-if="user.role !== 'Student'">
              <v-list-item-content>
                <v-list-item-title
                  v-text="'Device Manager'"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              router
              to="/user-management"
              v-if="user.role === 'Admin'"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="'User Management'"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              router
              to="/stream-management"
              v-if="user.role === 'Admin'"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="'Stream Management'"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    user: {}
  }),
  methods: {
    // async getUser() {
    //   this.user = await this.$store.getters.user;
    // }
  },

  computed: {
    ...mapState(["navDrawer"])
  },
  mounted() {
    this.user = this.$store.getters.user;
  }
};
</script>

<style></style>
