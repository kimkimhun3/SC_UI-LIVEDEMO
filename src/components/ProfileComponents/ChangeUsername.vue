<template>
  <v-card outlined>
    <v-form v-model="valid">
      <v-card-title
        >Username
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
          label="Username"
          :maxlength="30"  
          :counter="30"
          :rules="[v => !!(v || '').match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/) ||
          'Username must contain only letter, Not allow special character and number',
           v => v.length < 30 || 'Letter count must be less than 30.'
          ]"
          :disabled="!enableEdit"
          v-model="newName"
          
        ></v-text-field>  
        <v-text-field
          label="Password"
          :rules="[v => !!v || 'Field is empty', ]"
          type="password"
          :disabled="!enableEdit"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :disabled="!valid" @click="saveUser"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-form>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="dialog" max-width="400px" persistent>
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
  </v-card>
</template>

<script>
import backend from "../../Service";

export default {
  data: () => ({
    enableEdit: false,
    newName: "",
    password: "",
    loading: false,
    valid: false,
    message: "",
    dialog: false,
    // rules: {
    //   newName: v => !!(v || '').match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/) ||
    //       'Username must contain only letter,not allow special character', 
    //     required: v => !!v || 'This field is required', 
    // }

  }),
  methods: {
    reload() {
      location.reload();
    },
    async saveUser() {
      this.loading = true;
      if (this.newName == "") {
        alert("Name can't be empty!");
      } else if (this.password == "") {
        alert("Password can't be empty");
      }else {
        const result = await backend.changeName(this.newName, this.password);
        this.loading = false;
        this.message = result.data.message;
        this.enableEdit = false; 
        this.dialog = true;
      }
    }
  }
};
</script>

<style></style>
