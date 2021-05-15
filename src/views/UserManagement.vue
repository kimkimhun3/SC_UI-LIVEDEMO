<template>
  <v-container class="py-12">
    <v-card flat class="transparent" width="100%" v-if="user.role === 'Admin'">
      <v-card-title class="font-weight-black ">
        User Management
        <v-spacer></v-spacer>
        <v-text-field
          class="mx-5"
          label="Search"
          v-model="searchUser"
          append-icon="mdi-magnify"
        ></v-text-field>
        <v-btn small outlined @click="getAllUsers">
          <v-icon small left>mdi-reload</v-icon>
          Refresh
        </v-btn>
      </v-card-title>
      <v-data-table
        :items="users"
        :headers="userHeaders"
        class="transparent"
        :search="searchUser"
      >
        <template v-slot:item="props">
          <tr @click="onUserClick(props.item)">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.role }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-card class="text-center transparent" flat v-else>
      <h1 class="title font-weight-bold">Unauthorized access</h1>
      <p>This route is for <strong>Admininstrators</strong> only.</p>
    </v-card>

    <v-dialog v-model="editUserModal" max-width="500px" class="px-10">
      <v-card>
        <v-card-title>Edit a user</v-card-title>
        <v-card-text>
          <v-text-field 
          label="Username" 
          disabled
          v-model="userName">
          </v-text-field>
          <v-text-field
            label="Email"
            v-model="userEmail"
            disabled
          ></v-text-field>
          <v-select
            label="Role"
            :items="['Student', 'Lecturer', 'Admin']"
            v-model="userRole"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onUserSave()">Cancel</v-btn>
          <v-btn text @click="onUserSave()">Delete</v-btn>
          <v-btn text class="font-weight-bold" @click="onUserSave()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import backend from "../Service";
export default {
  name: "user-management",
  data: () => {
    return {
      searchUser: "",
      userName: "",
      userEmail: "",
      userRole: "",
      editUserModal: false,
      userHeaders: [
        { text: "Username", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" }
      ],
      user: {},
      users: []
    };
  },
  methods: {
    // On User Click
    onUserClick(user) {
      this.userName = user.name;
      (this.userEmail = user.email), (this.userRole = user.role);
      this.editUserModal = true;
    },

    // On User Save
    async onUserSave() {
      const result = await backend.changeRole(this.userEmail, this.userRole);
      if (result.errCode) {
        alert(result.message);
      } else {
        this.userName = this.userEmail = this.userRole = "";
        this.getAllUsers();
        this.editUserModal = false;
      }
    },

    // Get All User
    async getAllUsers() {
      //this.users = await backend.getAllUsers().data
      let _users = await backend.getAllUsers();
      _users = _users.data;
      this.users = [..._users].filter(_user => _user.role !== "Device");
    },
    async refresh() {
      this.getAllUsers();
    }
  },
  created() {
    this.getAllUsers();
    this.user = this.$store.getters.user;
  }
};
</script>

<style></style>
