<template>
  <v-container class="py-12">
    <v-card
      class="transparent"
      flat
      v-if="user.role === 'Admin' || user.role === 'Lecturer'"
    >
      <v-dialog v-model="dialog" max-width="300">
          <v-card>
            <v-container>
                <v-form @submit.prevent="addDevice">
                  <v-text-field placeholder="device id" v-model="deviceId"></v-text-field>
                  <v-btn type="submit" color="primary" dark>add</v-btn>
                </v-form>
            </v-container>
          </v-card>

      </v-dialog>
      <v-card-title class="title font-weight-bold">
        Device Management <v-btn class="ml-2" @click="openDialog">add</v-btn>
      </v-card-title>
      <DeviceCard
        v-for="device in devices"
        :device="device"
        :key="device.deviceId"
      />
    </v-card>
    <v-card class="text-center transparent" flat v-else>
      <h1 class="title font-weight-bold">Unauthorized access</h1>
      <p>This route is for <strong>Admininstrators</strong> only.</p>
    </v-card>
  </v-container>
</template>

<script>
import DeviceCard from "../components/DevicesComponents/DeviceCard";
import backend from "../Service"
import io from "socket.io-client"
export default {
  name: "device-manager",
  components: {
    DeviceCard
  },
  data() {
    return {
      dialog:false,
      deviceId:"",
      devices: [],
      socket:io.connect(process.env.VUE_APP_DEVICE_SERVER)
    };
  },
  methods: {
    getDevices() {
      this.socket.on("info", device_info => {
        this.devices = device_info;
        console.log(this.devices);
      });
    },
    openDialog(){
      this.dialog = true
    },
    async addDevice(){
      const response = await backend.addDevice(this.deviceId)
      alert(response.msg)
      this.dialog = response.success?false:true
    }
  },
  created() {
    this.getDevices();
    this.socket.emit("here", "hiii");
  },
  props: {
    user: Object
  }
};
</script>
