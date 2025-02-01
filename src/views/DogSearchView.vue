<template>
  <v-container class="my-5">
    <v-card class="pa-5 mx-auto" max-width="1000">
      <v-card-title class="text-h5">Dog Search</v-card-title>
      <v-card-text>
        <!-- Filter & Sorting Controls -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              v-model="selectedBreed"
              :items="breeds"
              label="Filter by Breed"
              multiple
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="selectedSort"
              :items="sortOptions"
              label="Sort"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-btn color="primary" @click="searchDogs">Search</v-btn>
        
        <!-- Dogs Grid -->
        <v-row class="mt-5" v-if="dogs.length">
          <v-col
            v-for="dog in dogs"
            :key="dog.id"
            cols="12" sm="6" md="4"
          >
            <DogCard
              :dog="dog"
              :is-favorite="favoriteDogIds.includes(dog.id)"
              @toggle-favorite="toggleFavorite"
            />
          </v-col>
        </v-row>

        <!-- Pagination Controls -->
        <v-row class="d-flex justify-center mt-5" v-if="dogs.length">
          <v-btn
            :disabled="!prevQuery"
            color="primary"
            class="ma-2"
            @click="goToPage(prevQuery)"
          >
            Previous
          </v-btn>
          <v-btn
            :disabled="!nextQuery"
            color="primary"
            class="ma-2"
            @click="goToPage(nextQuery)"
          >
            Next
          </v-btn>
        </v-row>

        <!-- Favorites & Match Button -->
        <v-card class="pa-3 mt-4">
          <div>
            <strong>Favorites:</strong> {{ favoriteDogIds.join(', ') }}
          </div>
          <v-btn
            color="success"
            class="mt-2"
            :disabled="favoriteDogIds.length === 0"
            @click="fetchMatch"
          >
            Get My Match
          </v-btn>
          <div v-if="matchedDog">
            <h4 class="mt-3">Your Match is:</h4>
            <div>{{ matchedDog.name }} ({{ matchedDog.breed }})</div>
            <img :src="matchedDog.img" alt="Matched Dog" width="200"/>
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import DogCard from '@/components/DogCard.vue'

export default {
  name: 'DogSearchView',
  components: {
    DogCard,
  },
  data() {
    return {
      breeds: [],
      selectedBreed: [],
      selectedSort: 'breed:asc', // Default sort
      sortOptions: [
        'breed:asc',
        'breed:desc',
        'name:asc',
        'name:desc',
        'age:asc',
        'age:desc',
      ],
      
      // Pagination & Search Results
      dogs: [],
      nextQuery: null,
      prevQuery: null,

      // Favorites
      favoriteDogIds: [],
      matchedDog: null,
    }
  },
  async created() {
    // On load, fetch available breeds
    await this.fetchBreeds()
    // Optionally, you can do an initial search
    await this.searchDogs()
  },
  methods: {
    async fetchBreeds() {
      try {
        const response = await axios.get(
          'https://frontend-take-home-service.fetch.com/dogs/breeds',
          { withCredentials: true }
        )
        this.breeds = response.data
      } catch (error) {
        console.error('Error fetching breeds:', error)
      }
    },

    async searchDogs(customQuery) {
      try {
        // If customQuery is provided (for pagination), use it directly.
        // Otherwise build from local state filters.
        let url = customQuery
          ? `https://frontend-take-home-service.fetch.com/dogs/search${customQuery}`
          : this.buildSearchUrl()

        const { data } = await axios.get(url, { withCredentials: true })
        const { resultIds, next, prev } = data

        this.nextQuery = next || null
        this.prevQuery = prev || null

        // Now fetch the actual dog objects
        const dogsResponse = await axios.post(
          'https://frontend-take-home-service.fetch.com/dogs',
          resultIds,
          { withCredentials: true }
        )
        this.dogs = dogsResponse.data
      } catch (error) {
        console.error('Error searching dogs:', error)
        this.dogs = []
      }
    },

    buildSearchUrl() {
      // Build query params
      let params = []
      // For breed filters
      if (this.selectedBreed.length > 0) {
        this.selectedBreed.forEach((b) => {
          params.push(`breeds=${encodeURIComponent(b)}`)
        })
      }
      // For sorting
      if (this.selectedSort) {
        params.push(`sort=${this.selectedSort}`)
      }
      // Join the query
      const queryString = params.length ? `?${params.join('&')}` : ''
      return `https://frontend-take-home-service.fetch.com/dogs/search${queryString}`
    },

    goToPage(queryString) {
      // `queryString` will be something like `?breeds=...&from=...`
      // So we call searchDogs with that entire query
      this.searchDogs(queryString)
    },

    toggleFavorite(dogId) {
      if (this.favoriteDogIds.includes(dogId)) {
        this.favoriteDogIds = this.favoriteDogIds.filter((id) => id !== dogId)
      } else {
        this.favoriteDogIds.push(dogId)
      }
    },

    async fetchMatch() {
      try {
        const { data } = await axios.post(
          'https://frontend-take-home-service.fetch.com/dogs/match',
          this.favoriteDogIds,
          { withCredentials: true }
        )
        const matchedDogId = data.match

        // Retrieve matched dog's details
        const dogsResponse = await axios.post(
          'https://frontend-take-home-service.fetch.com/dogs',
          [matchedDogId],
          { withCredentials: true }
        )
        this.matchedDog = dogsResponse.data[0]
      } catch (error) {
        console.error('Error fetching match:', error)
      }
    },
  },
}
</script>

<style scoped>
</style>
