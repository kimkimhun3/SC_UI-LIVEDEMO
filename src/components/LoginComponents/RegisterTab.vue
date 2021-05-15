<template>
<v-container class="px-12">
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form ref="form"  @submit.prevent="register()" >
      <validation-provider
        v-slot="{ errors }"
        name="Username"
        rules="required|alpha_spaces"
      >
      <v-text-field
        label="Username"
        required
        :maxlength="30"  
        :error-messages="errors"
        :counter="30"
        v-model="register_username"
      ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
      <v-text-field
        :error-messages="errors"
        required
        label="Email"
        v-model="register_email"
      ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="password"
        rules="required|min:8"
      >
      <v-text-field
      :error-messages="errors"
        required
        label="Password"
        v-model="register_password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="[v => !!v || 'Password is required', v => v.length >= 8 || 'Min 8 characters',]"
        @click:append="showPassword = !showPassword"
        hint="At least 8 characters"
        @keydown.space.prevent
        counter
      ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="checkbox"
      >
      <v-checkbox
      :error-messages="errors"
        color="primary"
        v-model="register_checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="I agree with the Terms and Conditions."
        required
        class="mb-5 mt-6"
        value="1"
        type="checkbox"
      ></v-checkbox>
      </validation-provider>

      <v-btn
        color="primary"
        block
        height="50"
        @click="register"
        :disabled="invalid"
      >
        Register
      </v-btn>  
    </form>
        <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog max-width="400" v-model="dialog">
      <v-card>
        <v-card-title>Alert</v-card-title>
        <v-card-text class="text-center font-weight-bold">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="dialog = false">
            <v-icon left>mdi-close</v-icon>
            Close
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </validation-observer>
</v-container>
</template>


<script>
  import backend from "../../Service";
  import { required, digits, email, max, min, regex, alpha_spaces } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  setInteractionMode('eager')
  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })
  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })
  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })
  extend('min', {
    ...min,
    message: 'Password at least {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })
  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'Name must be valid Do now allow special character',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => {
    return {
      valid: false,
      loading: false,
      register_checkbox: false,
      register_username: "",
      register_email: "",
      register_password: "",
      showPassword: false,
      dialog: false,
      message: "",
    };
  },
  methods: {
    async login() {
      await backend.login(this.username, this.password);
    },
    async register() {
      this.loading = true;
      const user = await backend.signUp(
        this.register_email,
        this.register_password,
        this.register_username
      );
      const { message, errCode } = user.data;
      this.loading = false;
      if (errCode) {
        this.message = message;
        this.dialog = true;
      } else {
        this.username = this.register_email;
        this.password = this.register_password;
        this.login();
      }
    }
  }
  }
</script>

<style></style>