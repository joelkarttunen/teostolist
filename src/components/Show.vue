<template>
  <div>
    <b> {{ show.performer.performerName }}</b>
    <p> Kappaleet: {{ getSongs() }} </p>
  </div>
</template>

<script>
import axios from 'axios'

const apiUrl = 'http://api.teosto.fi/2015'

export default {
  name: 'show',
  props: ['id'],
  data () {
    return {
      show: {},
      works: []
    }
  },
  async created () {
    axios.get(apiUrl + '/show?id=' + this.id)
      .then(result => {
        this.show = result.data.show

        this.fetchWorks()
      })
  },
  methods: {
    fetchWorks: function () {
      axios.get(this.show.works.url)
        .then(result => {
          this.works = result.data.works
        })
    },
    getSongs: function () {
      return this.works.map(w => w.title).join(',')
    }
  }
}
</script>