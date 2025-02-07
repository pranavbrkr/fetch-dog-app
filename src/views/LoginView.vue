<template>
  <div class="login-background">
    <v-card class="login-card pa-5" style="width: 400px; max-width: 90%;">
      <!-- <v-card-title class="text-h5">Login</v-card-title> -->
      <v-card-text>
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
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="primary"
          class="bold-black-btn"
          @click="handleLogin"
        >
          Login
        </v-btn>
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
      if (!this.name || !this.email) {
        alert('Please provide both name and email.')
        return
      }
      try {
        await axios.post(
          'https://frontend-take-home-service.fetch.com/auth/login',
          { name: this.name, email: this.email },
          { withCredentials: true }
        )
        this.$router.push('/dogs')
      } catch (error) {
        console.error('Login error:', error)
        alert('Login failed. Check console for details.')
      }
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
  background-color: #cb7132 !important;
  border-radius: 12px;
}

.white-outlined ::v-deep .v-field {
  background-color: #fff !important;
  border-radius: 8px !important;
}

.white-outlined ::v-deep .v-field__outline {
  border-color: #777 !important;
  border-width: 2px !important;
}

.bold-black-btn ::v-deep .v-btn__content {
  color: black !important;
  font-weight: 700 !important;
}
</style>
