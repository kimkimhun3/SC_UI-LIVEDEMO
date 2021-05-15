<template>
  <v-container class="py-12">
    <v-card flat class="transparent" width="100%" v-if="user.role === 'Admin'">
      <v-card-title class="title font-weight-bold">
        Stream Management
        <v-spacer></v-spacer>
        <v-text-field
          class="mx-5"
          label="Search"
          v-model="searchStream"
          append-icon="mdi-magnify"
        ></v-text-field>
        <v-btn small outlined @click="refresh">
          <v-icon small left>mdi-reload</v-icon>
          Refresh
        </v-btn>
      </v-card-title>
      <v-data-table
        class="transparent"
        :items="streams"
        :headers="streamHeaders"
        :search="searchStream"
        sortBy="date"
        update: sort-desc
      >
        <template v-slot:item="props">
          <tr>
            <td @click="onStreamClick(props.item)">
              {{ props.item.streamCode }}
            </td>
            <td @click="onStreamClick(props.item)">
              {{ props.item.streamTitle }}
            </td>
            <td @click="onStreamClick(props.item)">
              {{ props.item.owner.name }}
            </td>
            <td @click="onStreamClick(props.item)">
              {{ props.item.description }}
            </td>
            <td @click="onStreamClick(props.item)">
              {{ props.item.streamFrom }}
            </td>
            <td
              @click="onStreamClick(props.item)"
              :class="props.item.isActive ? 'red--text' : 'blue--text'"
            >
              {{ props.item.isActive ? "LIVE" : "ENDED" }}
            </td>
            <td>
              <v-btn
                outlined
                v-if="props.item.isActive"
                class="red white--text"
                id="stopStreamBtn"
                @click="stopStream(props.item.streamCode)"
              >
                <v-icon left>mdi-record</v-icon>Stop Stream
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-card class="text-center transparent" flat v-else>
      <h1 class="title font-weight-bold">Unauthorized access</h1>
      <p>This route is for <strong>Admininstrators</strong> only.</p>
    </v-card>

    <v-dialog v-model="editStreamModal" max-width="600px">
    
      <v-card>
        <v-card-title>Edit a stream</v-card-title>
        <v-form v-model="valid">
        <v-card-text>
          <v-text-field 
            label="Title" 
            v-model="streamTitle" 
            required
            :rules="[
              v => v && !!v.trim() || 'Title cannot be blank',
              v => v.length < 50 || 'Letter count must be less than 50.',]"
              :maxlength="50"  
              :counter="50"  
          ></v-text-field>
          <v-text-field
            label="Description"
            v-model="description"
            required
            :rules="[
              v => v && !!v.trim() || 'Description cannot be blank',
              v => v.length < 200 || 'Letter count must be less than 200.']"
            :maxlength="200"
            :counter="200"  
          ></v-text-field>
        </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel()">Cancel</v-btn>
          <v-btn text class="font-weight-bold" :disabled="!valid" @click="onStreamSave()" 
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import backend from "../Service";
import io from "socket.io-client";
const SERVER = process.env.VUE_APP_SERVER;
export default {
  data: () => ({
    //socket: io(`https://${URL}`),
    socket2: io(SERVER),
    searchStream: "",
    streamCode: "",
    streamTitle: "",
    valid: false,
    description: "",
    editStreamModal: false,
    streamHeaders: [
      { text: "Stream Code", value: "streamCode" },
      { text: "Title", value: "streamTitle" },
      { text: "Author", value: "owner.name" },
      { text: "Description", value: "description" },
      { text: "From", value: "streamFrom" },
      { text: "Status", value: "isActive" },
      { text: "Stop Stream" }
    ],
    streams: [],
    user: {}
  }),
  methods: {
    // On Stream Click
    onStreamClick(stream) {
      this.streamTitle = stream.streamTitle;
      this.description = stream.description;
      this.streamCode = stream.streamCode;

      this.editStreamModal = true;
    },
    onCancel() {
      this.editStreamModal = false;
    },
    // On Stream Save
    async onStreamSave() {
      const result = await backend.editStream(
        this.streamCode,
        this.streamTitle,
        this.description
      );
      if (result.errCode) {
        alert(result.message);
      } else {
        this.streamTitle = this.description = this.streamCode = "";
        this.getAllStreams();
        this.editStreamModal = false;
      }
    },
    async getAllStreams() {
      const streams = await backend.getCurrentlyStreaming(0, null);
      this.streams = [];
      this.streams = streams.data;
    },
    async stopStream(streamCode) {
      this.editStreamModal = false;
      //this.socket.emit("stop", email);
      await backend.stopStream("admin", streamCode);
      this.socket2.emit("streamStop", streamCode);
      this.getAllStreams();
    },
    getUser() {
      this.user = this.$store.getters.user;
    },
    async refresh() {
      this.getAllStreams();
    }
  },
  created() {
    this.getAllStreams();
    this.getUser();
  }
};
</script>

<style></style>
