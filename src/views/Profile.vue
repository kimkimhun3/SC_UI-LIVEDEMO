<template>
  <v-card flat tile dark class="transparent">
    <ProfileCardPC v-if="$vuetify.breakpoint.mdAndUp" />
    <ProfileCardMobile v-else />
    <ProfileHistory />
  </v-card>
</template>

<script>
import ProfileCardPC from "../components/ProfileComponents/ProfileCardPC";
import ProfileCardMobile from "../components/ProfileComponents/ProfileCardMobile";
import ProfileHistory from "../components/ProfileComponents/ProfileHistory";

export default {
  data: () => ({
    user: {}
  }),
  components: {
    ProfileCardPC,
    ProfileCardMobile,
    ProfileHistory
  },
  mounted() {
    this.user = this.$store.getters.user;
  }
};
</script>

<style></style>
