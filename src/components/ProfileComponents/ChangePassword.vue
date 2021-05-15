<template>
  <v-card outlined class="mt-5">
    <v-form v-model="valid">
      <v-card-title
        >Password
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-switch
              inset
              v-model="enableEdit"
              color="primary"
              v-on="on"
            ></v-switch>
          </template>
          <span>Enable edit</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Current password"
          type="password"
          :rules="[v => !!v || 'Field is empty']"
          v-model="currentPassword"
          :disabled="!enableEdit"
        ></v-text-field>
        <v-text-field
          @keydown.space.prevent
          label="New password"
          type="password"
          :rules="[
            v => !!v || 'Field is empty',
            v =>
              (v && v !== currentPassword) ||
              'New password cannot be the same as current password',
              
          ]"
          v-model="newPassword"
          :disabled="!enableEdit"
        ></v-text-field>
        <v-text-field
          @keydown.space.prevent
          label="Confirm password"
          type="password"
          :rules="[
            v => !!v || 'Field is empty',
            v =>
              (v && v === newPassword) ||
              'New password and confirm password does not match'
          ]"
          v-model="confirmPassword"
          :disabled="!enableEdit"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :disabled="!valid" @click="saveCredentials"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-form>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="text-center pb-1">
        <v-card-title class="title font-weight-bold">Alert</v-card-title>
        <v-card-text class="font-weight-bold">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="reload" >
            <v-icon left small>mdi-close</v-icon>
            Close</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import backend from "../../Service";

export default {
  data: () => ({
    enableEdit: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    valid: false,
    message: "",
    dialog: false
  }),
  methods: {
    reload() {
      location.reload();
    },
    async saveCredentials() {
      this.loading = true;
      if (this.currentPassword == "") {
        this.errorMsg = "*Please Enter Your Current Password";
      } else if (this.newPassword == "") {
        this.errorMsg = "*Please Enter Your New Password";
      } else if (this.newPassword != this.confirmPassword) {
        this.errorMsg = "*The Passwords Do Not Match";
      } else {
        const result = await backend.changePassword(
          this.currentPassword,
          this.newPassword
        );
        this.loading = false;
        this.message = result.data.message;
        this.dialog = true;
        this.errorMsg = "";
        this.enableEdit = false;
      }
    }
  }
};
</script>

<style></style>
