<template>
  <div class="container-fluid mt-4">
    <div class="col-md-6 centered">
      <h1>{{venue.name}}</h1>
      <venue-address :place="venue.place"></venue-address>
      <h2>Tapahtumat</h2>

      <b-row>
        <b-col>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Aloitusaika</th>
                <th>Lopetusaika</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.id">
                <td>
                  <b-nav-item :to="{ name: 'event', params: { eventId: event.id }}">{{ event.name || "Ei nimeä" }}</b-nav-item>
                </td>
                <td>
                  {{ event.startDate }}
                </td>
                <td>
                  {{ event.endDate }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <h2>Top kappaleet</h2>
      <b-row>
        <b-col>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Soittokerrat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="topWork in topWorks" :key="topWork.id">
                <td>
                  <b-nav-item :to="{ name: 'song', params: { songId: topWork.work.id }}">{{ topWork.work.title || "Ei nimeä" }}</b-nav-item>
                </td>
                <td>
                  {{ topWork.count }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </div>
  </div>
    
</template>

<script>
import axios from 'axios'
import VenueAddress from './VenueAddress.vue'

const apiUrl = 'http://api.teosto.fi/2015'

export default {
  name: 'venue',
  data () {
    return {
      venue: {},
      events: [],
      topWorks: []
    }
  },
  async created () {
    axios.get(apiUrl + '/venue?id=' + this.$route.params.venueId)
      .then(result => {
        this.venue = result.data.venue

        // propably should check if we got an actual venue before trying to fetch other items

        this.fetchEvents()
        this.fetchTopWorks()
      })
  },
  methods: {
    fetchEvents: function () {
      axios.get(this.venue.events.url)
        .then(result => {
          this.events = result.data.events
        })
    },
    fetchTopWorks: function () {
      axios.get(this.venue.topWorks.url)
        .then(result => {
          this.topWorks = result.data.topWorks
        })
    }
  },
  components: {
    VenueAddress
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.centered {
    float: none;
    margin: 0 auto;
}
</style>
