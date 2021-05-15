<template>
  <span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="ma-2"
          tile
          color="primary"
          @click="dialog = true"
          v-on="on"
        >
          <v-icon left>mdi-account</v-icon> Settings
        </v-btn>
      </template>
      <span>Change your username or password</span>
    </v-tooltip>

    <v-dialog max-width="900px" v-model="dialog">
      <v-card class="px-3 py-2">
        <v-card-title class="font-weight-bold mb-2">Settings</v-card-title>
        <v-card-text>
          <ChangeUsername />
          <ChangePassword />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false" color="primary">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";

export default {
  data: () => ({
    dialog: false
  }),
  components: {
    ChangeUsername,
    ChangePassword
  }
};
</script>

<style></style>
