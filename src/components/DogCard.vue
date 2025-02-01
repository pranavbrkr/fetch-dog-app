<template>
  <v-card>
    <v-img :src="dog.img" height="200px" class="white--text"></v-img>
    <v-card-title>{{ dog.name }}</v-card-title>
    <v-card-text>
      <div>Breed: {{ dog.breed }}</div>
      <div>Age: {{ dog.age }}</div>
      <div>Zip Code: {{ dog.zip_code }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :color="isFavorite ? 'error' : 'primary'"
        @click="onToggleFavorite"
      >
        {{ isFavorite ? 'Unfavorite' : 'Favorite' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DogCard',
  props: {
    dog: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onToggleFavorite() {
      this.$emit('toggle-favorite', this.dog.id)
    },
  },
}
</script>
