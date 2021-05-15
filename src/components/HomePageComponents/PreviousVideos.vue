<template>
  <v-card flat class="transparent">
    <v-card-title>
      Previous videos by lecturers
    </v-card-title>
    <v-sheet
      class="mx-auto transparent"
      max-width="900px"
      v-if="lecturerVideos.length !== 0"
    >
      <v-slide-group>
        <v-slide-item v-for="stream in lecturerVideos" :key="stream.id">
          <Thumbnail
            type="large"
            :stream="stream"
            :id="stream.id"
            v-if="$vuetify.breakpoint.mdAndUp"
          />
          <Thumbnail type="mobile" :stream="stream" v-else />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-sheet
      class="d-flex flex-column justify-center align-center transparent my-10"
      max-width="100%"
      v-else
    >
      <v-card class="transparent title text--secondary" flat
        >There is no previous lectures at the moment...</v-card
      >
      <v-card class="transparent text-center text--secondary" flat
        >Check again later!
      </v-card>
    </v-sheet>
  </v-card>
</template>

<script>
import Thumbnail from "../Reusables/Thumbnail";

export default {
  data: () => {
    return {
      lecturerVideos: [],
    };
  },
  components: {
    Thumbnail,
  },
  props: {
    videos: Object,
  },
};
</script>

<style></style>
