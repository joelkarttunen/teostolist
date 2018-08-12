<template>
  <div class="container-fluid mt-4">
    <h1>{{ event.name }}</h1>
    <h2>{{ event.venue.name }}</h2>
    
    <p>Ajankohta {{ event.startDate }} - {{ event.endDate }}</p>
    <p>Esiintyjiä {{ event.shows.count }} kpl </p>

    <div v-for="show in shows">
      <show :id="show.id"></show>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Show from './Show.vue'

const apiUrl = 'http://api.teosto.fi/2015'

export default {
  name: 'VenueEvent',
  data () {
    return {
      event: {},
      shows: []
    }
  },
  async created () {
    axios.get(apiUrl + '/event?id=' + this.$route.params.eventId)
      .then(result => {
        this.event = result.data.event

        this.fetchShows()
      })
  },
  methods: {
    fetchShows: function () {
      axios.get(this.event.shows.url)
        .then(result => {
          this.shows = result.data.shows
        })
    }
  },
  components: {
    Show
  }
}
</script>