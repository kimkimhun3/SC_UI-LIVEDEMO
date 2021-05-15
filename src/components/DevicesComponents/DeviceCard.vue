<template>
  <v-col lg="4" md="6" sm="12">
    <v-card dense class="px-2" :id="device.deviceId">
      <v-list two-line class="pa-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1 font-weight-black">
              {{ device.deviceName }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="px-0">
            <v-btn icon small @click="rebootDevice(device.deviceId)">
              <v-icon>mdi-power</v-icon>
            </v-btn>
            <EditDeviceDialog :device="device" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-text class="py-0 caption">
        <span class="font-weight-bold">
          Device Id
        </span>
        <p class="text-uppercase overline">
          {{ device.deviceId}}
        </p>
      </v-card-text>
      <v-card-text class="py-0 caption">
        <span class="font-weight-bold">
          Camera
        </span>
        <p class="text-uppercase overline">
          {{ device.cameraPlugged ? "Connected" : "Not connected" }}
        </p>
      </v-card-text>
      <v-card-text class="py-0 caption">
        <span class="font-weight-bold">
          Streaming
        </span>
        <p class="text-uppercase overline">
          {{ device.streaming ? "Currently streaming" : "Not streaming" }}
        </p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-icon left small :class="device.online ? 'online' : 'offline'"
          >mdi-record</v-icon
        >
        <span :class="'overline ' + (device.online ? 'online' : 'offline')">
          {{ device.online ? "online" : "offline" }}
        </span>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import EditDeviceDialog from "./EditDeviceDialog";

export default {
  components: {
    EditDeviceDialog
  },
  methods: {
    rebootDevice(id) {
      console.log("Rebooting " + id);
    }
  },
  props: {
    device: Object
  }
};
</script>

<style scoped>
.online {
  color: #008800;
}

.offline {
  color: #96281b;
}
</style>
