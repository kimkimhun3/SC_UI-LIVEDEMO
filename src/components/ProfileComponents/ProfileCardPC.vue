<template>
  <v-card flat tile light class="transparent">
    <!-- Cover picture component -->
    <v-img
      :src="
        user.coverPic
          ? user.coverPic
          : 'https://tokystorage.s3.amazonaws.com/images/default-cover.png'
      "
      height="410px"
      class="d-flex justify-center align-center"
    >
      <!-- Profile pic card -->
      <v-card
        height="100%"
        class="d-flex align-center justify-space-around transparent"
        flat
      >

        <v-card flat class="transparent">
          <v-sheet class="d-flex flex-column transparent">
            <v-avatar size="220" >
              <img 
                :src="
                  user.profilePic
                    ? user.profilePic
                    : 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
                "
                :alt="user.name"
        
              />
            </v-avatar>
            <v-card-actions class="justify-space-around">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    class="mt-n10 primary"
                    @click="uploadProfilePic"
                    v-on="on"
                  >
                    <v-icon>mdi-camera</v-icon>
                  </v-btn>
                </template>
                <span>Change profile picture</span>
              </v-tooltip>

              <input
                type="file"
                accept="image/png, image/jpeg, image/bmp"
                ref="profilePicInput"
                @change="onProfilePicPicked"
                style="display:none"
              />
            </v-card-actions>
          </v-sheet>
        </v-card>


        <!-- Profile details card -->
        <v-card
          flat
          :width="$vuetify.breakpoint.lgAndUp ? '680px' : '520px'"
          class="px-10 py-5 transparent ml-n12"
        >
        </v-card>
        <!-- Upload button card -->
        <v-card height="344px" class="py-5 transparent ml-10 d-flex" flat>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="uploadCoverPic"
                tile
                class="align-self-end"
                color="primary"
                v-on="on"
              >
                <v-icon left>mdi-camera</v-icon> Upload
              </v-btn>
            </template>
            <span>Change cover picture</span>
          </v-tooltip>

          <input
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            ref="coverPicInput"
            @change="onCoverPicPicked"
            style="display: none"
          />
        </v-card>
      </v-card>
    </v-img>
    <v-container class="pt-5">
      <v-card-title class="display-2 font-weight-bold">
        <span style="letter-spacing: 0.05em">
          {{ user.name }}
        </span>
      </v-card-title>
      <v-card-text class="title text-uppercase">{{ user.role }}</v-card-text>
      <v-card-actions>
        <SettingsDialog />
      </v-card-actions>
    </v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card class="text-center pb-1">
        <v-card-title class="title font-weight-bold">Alert</v-card-title>
        <v-card-text class="font-weight-bold">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="reload">
            <v-icon left small>mdi-reload</v-icon>
            Reload</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <!-- error dialog displays any potential error messages -->
    <v-dialog v-model="errorDialog" persistent max-width="400px">
      <v-card class="text-center pb-1">
        <v-card-title class="title font-weight-bold">Alert</v-card-title>
        <v-card-text class="font-weight-bold">
          {{ errorText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="reload">
            <v-icon left small>mdi-reload</v-icon>
            Reload</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

      
  </v-card>
</template>

<script>
import SettingsDialog from "./SettingsDialog";

import backend from "../../Service";

export default {
  data: () => ({
    user: {},
    message: "",
    loading: false,
    dialog: false,
    maxSize: 1024,
    errorDiallog: false
  }),
  methods: {
    reload() {
      location.reload();
    },
    // Cover pic section
    // Upload button clicked
    uploadCoverPic() {
      this.$refs.coverPicInput.click();
    },
    // Uploads cover pic
    async onCoverPicPicked(event) {
      this.loading = true;
      const files = event.target.files;
      const selectedFile = files[0];
      let size = selectedFile.size / this.maxSize / this.maxSize
      const fileReader = new FileReader();
      if (!selectedFile.type.match('image.*')){
        this.errorDialog = true
        this.errorText = 'Please choose an image file'
      }
      else if( size > 1){
        // check whether the size is greater than the size limit
        this.errorDialog = true
        this.errorText = 'Your file is too big! Please select an image under 1MB'
      }else{
      fileReader.readAsDataURL(selectedFile);
      fileReader.addEventListener("load", async () => {
        const temp = fileReader.result;
        const response = await backend.changeCover(temp);
        this.loading = false;
        this.message = response.message;
        this.dialog = true;
      });
      }
    },

    // Profile pic section
    // Upload button clicked
    uploadProfilePic() {
      this.$refs.profilePicInput.click();
    },
    // Uploads profile pic
    async onProfilePicPicked(event) {
      this.loading = true;
      const files = event.target.files;
      const selectedFile = files[0];
      let size = selectedFile.size / this.maxSize / this.maxSize
      const fileReader = new FileReader();
      if (!selectedFile.type.match('image.*')){
        this.errorDialog = true
        this.errorText = 'Please choose an image file'
      }
      else if( size > 1){
        // check whether the size is greater than the size limit
        this.errorDialog = true
        this.errorText = 'Your file is too big! Please select an image under 1MB'
      }else{
      fileReader.readAsDataURL(selectedFile);
      
      fileReader.addEventListener("load", async () => {
        const temp = fileReader.result;
        const response = await backend.changeProfile(temp);
        this.loading = false;
        this.message = response.message;
        this.dialog = true;
      });
      }

    }
  },
  components: {
    SettingsDialog
  },
  created() {
    // Uses getter to get user details
    this.user = this.$store.getters.user;
  }
};
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  filter: blur(1px);
  -webkit-filter: blur(1px);
}
</style>
