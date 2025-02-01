<template>
  <v-container class="my-5">
    <v-card class="pa-5 mx-auto" max-width="400">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="handleLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
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
        // Make sure to include credentials for the cookie
        const response = await axios.post(
          'https://frontend-take-home-service.fetch.com/auth/login',
          { name: this.name, email: this.email },
          { withCredentials: true }
        )
        // If successful, the server sets an HttpOnly cookie in the response.
        // The browser will automatically send it with subsequent requests.
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
/* local styles here */
</style>
