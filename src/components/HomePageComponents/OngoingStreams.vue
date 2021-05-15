<template>
  <v-card flat class="transparent "  >
    <v-card-title class="font-weight-black"
      ><h3>Ongoing streams</h3>
      <v-spacer></v-spacer>
      <v-btn text small @click="getcurrentlyStreaming(20)" outlined style="border: 0.5px solid pink"
        >Refresh</v-btn
      >
    </v-card-title>
    <v-sheet 
      v-if="streams.length !== 0"
    >
      <v-row >
        <v-col v-for="stream in streams" :key="stream.id" :id="stream.id" cols="4" >
          <Thumbnail
            type="large"
            :stream="stream"
            :id="stream.id"
            v-if="$vuetify.breakpoint.mdAndUp"
            
          />
          <Thumbnail type="mobile" :stream="stream" :id="stream.id" v-else />
        </v-col>
      </v-row>
      
      
    </v-sheet>
    <v-sheet
      class="d-flex flex-column justify-center align-center transparent my-10"
      max-width="100%"
      v-else
    >
      <v-img
        src="../../assets/ongoing_stream.svg"
        width="294px"
        class="justify-center align-center"
        style="opacity: 0.5"
      >
      </v-img>
      <v-card class="transparent title text--secondary" flat>Uh oh!</v-card>
      <v-card class="transparent text-center text--secondary" flat
        >There are no streams on at the moment... Click
        <strong>Go Live</strong> to start streaming.</v-card
      >
    </v-sheet>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import Thumbnail from "../Reusables/Thumbnail";

import backend from "../../Service";
export default {
  data: () => {
    return {
      streams: [],
      loading: false,
      timer: ''
    };
  },
  components: {
    Thumbnail,
  },
  methods: {
    async getcurrentlyStreaming(limit) {
      // this.loading = true;
      const streams = await backend.getCurrentlyStreaming(limit, true);
      this.streams = [];
      if (streams.data) {
        streams.data.forEach((stream) => {
          this.streams.push({
            id: stream.streamCode,
            title: stream.streamTitle,
            description: stream.description,
            isPrivate: stream.isPrivate,
            author: stream.owner.name,
            profile: stream.owner.profilePic,
            date: stream.date,
            thumbnail: stream.thumbnail,
          });
        });
      }
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    
  },
  async mounted(){
    console.log(this.$store.state.user.user)
    this.streams = []
    await setTimeout(() => this.getcurrentlyStreaming(), 500)
  },
  async created() {
    await this.getcurrentlyStreaming();
   this.timer = await setInterval(this.getcurrentlyStreaming, 3000)
  },
};
</script>

<style></style>
