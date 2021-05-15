<template>
  <v-container>
    <v-sheet
      class="transparent"
      light
      v-if="$vuetify.breakpoint.mdAndUp"
      flat
      width="100%"
    >
      <v-card-title class="font-weight-bold title  pb-5"
        >Viewing history</v-card-title
      >
      <v-slide-group v-if="viewingHistory.length !== 0">
        <v-slide-item
          class="mx-3"
          v-for="stream in viewingHistory"
          :key="stream._id"
          :id="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>
      <v-sheet
        class="d-flex flex-column justify-center align-center transparent"
        max-width="100%"
        height="160px"
        v-else
      >
        <v-card class="transparent title font-weight-bold" flat
          >Oh no...</v-card
        >
        <v-card class="transparent text-center" flat
          >Your viewing history is empty ( ͡° ͜ʖ ͡°) . Go to
          <strong>Home</strong> to start viewing or click
          <strong>Go Live</strong> to start streaming!</v-card
        >
      </v-sheet>

      <v-card-title class="font-weight-bold title pt-10 pb-5"
        >Previous streams</v-card-title
      >
      <v-slide-group v-if="previousStreams.length !== 0">
        <v-slide-item
          class="mx-3"
          v-for="stream in previousStreams"
          :key="stream._id"
          :id="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>
      <v-sheet
        class="d-flex flex-column justify-center align-center transparent"
        max-width="100%"
        height="160px"
        v-else
      >
        <v-card class="transparent title font-weight-bold" flat>Uh oh!</v-card>
        <v-card class="transparent text-center" flat
          >You've never streamed before... Click <strong>Go Live</strong> to
          start streaming!</v-card
        >
      </v-sheet>
    </v-sheet>

    <v-sheet light class="transparent" v-else>
      <v-card-title class="font-weight-bold title pt-10 pb-5"
        >Viewing history</v-card-title
      >
      <v-slide-group>
        <v-slide-item
          class="mx-3"
          v-for="stream in viewingHistory"
          :key="stream._id"
          :id="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>

      <v-card-title class="font-weight-bold title pt-10 pb-5"
        >Previous streams</v-card-title
      >
      <v-slide-group>
        <v-slide-item
          class="mx-3"
          v-for="stream in previousStreams"
          :key="stream._id"
        >
          <Thumbnail type="history" :stream="stream" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import Thumbnail from "../Reusables/Thumbnail";

export default {
  components: {
    Thumbnail
  },
  data: () => ({
    user: {},
    tab: null,
    previousStreams: [],
    viewingHistory: []
  }),
  mounted() {
    this.user = this.$store.getters.user;
    (this.previousStreams = this.user.history.filter(
      x => x.action === "Started a stream"
    )).reverse(),
      (this.viewingHistory = this.user.history.filter(
        x => x.action === "Joined a stream"
      )).reverse();
  }
};
</script>

<style></style>
