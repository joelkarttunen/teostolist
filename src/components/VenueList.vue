<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Paikat</h1>

    <b-row>
      <b-form-input v-model="search"
                  type="text"
                  placeholder="Hae nimellä">
                  </b-form-input>
      <b-button v-on:click="searchVenue">Hae</b-button>
    </b-row>

    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nimi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="venue in venues" :key="venue.id">
              <td>
                <b-nav-item :to="{ name: 'venue', params: { venueId: venue.id }}">{{ venue.name || "Ei nimeä" }}</b-nav-item>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

const apiUrl = 'http://api.teosto.fi/2015'

export default {
  name: 'VenueList',
  data () {
    return {
      venues: [],
      search: ''
    }
  },
  async created () {
    axios.get(apiUrl + '/venue')
      .then(result => {
        this.venues = result.data.venues
      })
  },
  methods: {
    searchVenue: function () {
      axios.get(apiUrl + '/venue?name=' + this.search.replace(' ', '+'))
        .then(result => {
          this.venues = result.data.venues
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
