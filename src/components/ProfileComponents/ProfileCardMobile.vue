<template>
  <v-card light class="transparent" flat>
    <v-img
      :src="
        user.coverPic
          ? user.coverPic
          : 'https://tokystorage.s3.amazonaws.com/images/default-cover.png'
      "
      height="400px"
      class="d-flex justify-center align-center"
    >
      <v-sheet class="d-flex flex-column align-center transparent">
        <v-avatar size="220" class="justify-space-around">
          <img
            :src="
              user.profilePic
                ? user.profilePic
                : 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
            "
            :alt="user.name"
          />
        </v-avatar>
        <v-btn fab class="mt-n10 primary" @click="uploadProfilePic">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
        <input
          type="file"
          accept="image/png, image/jpeg, image/bmp"
          ref="profilePicInput"
          @change="onProfilePicPicked"
          style="display:none"
        />
      </v-sheet>
      <v-card class="mt-12 transparent" flat light>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            tile
            class="d-flex align-start"
            color="primary"
            @click="uploadCoverPic"
          >
            <v-icon left>mdi-camera</v-icon> Upload
          </v-btn>
          <input
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            ref="coverPicInput"
            @change="onCoverPicPicked"
            style="display: none"
          />
        </v-card-actions>
      </v-card>
    </v-img>
    <v-container>
      <v-card-title class="display-1 font-weight-bold text-uppercase">
        {{ user.name }}
      </v-card-title>
      <v-card-text class="subtitle-1 text-uppercase">{{
        user.role
      }}</v-card-text>
      <v-card-actions>
        <SettingsDialog />
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import SettingsDialog from "./SettingsDialog";

import backend from "../../Service";

export default {
  data: () => ({
    user: {}
  }),
  methods: {
    // Cover pic section
    // Upload button clicked
    uploadCoverPic() {
      this.$refs.coverPicInput.click();
    },
    // Uploads cover pic
    async onCoverPicPicked(event) {
      const files = event.target.files;
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.addEventListener("load", async () => {
        const temp = fileReader.result;
        const response = await backend.changeCover(temp);
        alert(response.message);
        location.reload();
      });
    },

    // Profile pic section
    // Upload button clicked
    uploadProfilePic() {
      this.$refs.profilePicInput.click();
    },
    // Uploads profile pic
    async onProfilePicPicked(event) {
      const files = event.target.files;
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.addEventListener("load", async () => {
        const temp = fileReader.result;
        const response = await backend.changeProfile(temp);
        alert(response.message);
        location.reload();
      });
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

<style></style>
