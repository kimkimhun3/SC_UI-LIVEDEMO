<template>
  <v-span>
    <v-btn icon small @click="editDevice = true">
      <v-icon color="grey lighten-1">mdi-settings</v-icon>
    </v-btn>
    <v-dialog v-model="editDevice" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title font-weight-regular">Edit device</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="deviceName"
            label="Enter a new device name"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editDevice = false">Cancel</v-btn>
          <v-btn text @click="editDeviceName()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-span>
</template>

<script>
import io from "socket.io-client";

const DEVICE_SERVER = process.env.VUE_APP_DEVICE_SERVER;

export default {
  data: () => ({
    editDevice: false,
    deviceName: "",
    socket: io(DEVICE_SERVER)
  }),
  props: {
    device: Object
  },
  methods: {
    editDeviceName() {
      this.socket.emit("changeName", {
        deviceId: this.device.deviceId,
        deviceName: this.deviceName
      });
      this.editDevice = false;
    }
  },
  created() {
    this.deviceName = this.device.deviceName;
  }
};
</script>

<style></style>
