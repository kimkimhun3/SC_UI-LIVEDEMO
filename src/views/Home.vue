<template>
  <v-container class="py-12" >
    <OngoingStreams />
    <!-- <PreviousVideos :videos="this.videos" /> -->
    <!-- <CommunityVideos :videos="this.videos" /> -->
  </v-container>
</template>

<script>
import io from "socket.io-client";
import OngoingStreams from "../components/HomePageComponents/OngoingStreams";
const DEVICE_SERVER = process.env.VUE_APP_DEVICE_SERVER;

// I disabled these because it is not implemented as of right now

// import PreviousVideos from "../components/HomePageComponents/PreviousVideos";
// import CommunityVideos from "../components/HomePageComponents/CommunityVideos";

export default {
  data: () => ({
    socket: io(DEVICE_SERVER),
    videos: {},
  }),
  components: {
    OngoingStreams,
    // PreviousVideos,
    // CommunityVideos,
  },
  methods: {
    async getUser() {
      this.user = this.$store.getters.user;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style></style>
