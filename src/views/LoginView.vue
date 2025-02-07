<template>
  <div class="login-background">
    <v-card class="login-card pa-5" style="width: 400px; max-width: 90%;">
      <!-- <v-card-title class="text-h5">Login</v-card-title> -->
      <v-card-text>
        <!-- Using variant="outlined" for a full rectangular border -->
        <v-text-field
          v-model="name"
          label="Name"
          variant="outlined"
          class="white-outlined"
          required
        />
        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          class="white-outlined"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="handleLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginView',
  data() {
    return {
      name: '',
      email: '',
    }
  },
  methods: {
    async handleLogin() {
      // ...
    },
  },
}
</script>

<style scoped>
.login-background {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/login-bg.jpg') center center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background-color: #eeb48b !important;
  border-radius: 12px;
}

/* 
  Use a deep selector so we can style Vuetify internals.
  This ensures the text field has a full white background 
  and a rounded outline on all sides.
*/
.white-outlined ::v-deep .v-field {
  background-color: #fff !important;  /* full white box */
  border-radius: 8px !important;      /* rounded corners */
}

/* OPTIONAL: if you want a custom border color or thicker outline, you can also target .v-field__outline */
.white-outlined ::v-deep .v-field__outline {
  border-color: #777 !important; /* Example border color */
  border-width: 2px !important;  /* Thicker border if desired */
}
</style>
