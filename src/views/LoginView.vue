<template>
  <div class="login-background">
    <v-card class="pa-5" style="width: 400px; max-width: 90%;">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          required
        />
        <v-text-field
          v-model="email"
          label="Email"
          outlined
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
  /* Fill the viewport */
  height: 100vh;
  width: 100vw;
  /* Background image */
  background: url('@/assets/login-bg.jpg') center center no-repeat;
  background-size: cover;
  /* Use flex to center the card horizontally & vertically */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>