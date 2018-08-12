import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import VenueList from '@/components/VenueList'
import Venue from '@/components/Venue'
import SongList from '@/components/SongList'
import Song from '@/components/Song'
import VenueEvent from '@/components/VenueEvent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/venues',
      name: 'venues',
      component: VenueList
    },
    {
      path: '/venues/:venueId',
      name: 'venue',
      component: Venue
    },
    {
      path: '/songs',
      name: 'songs',
      component: SongList
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: Song
    },
    {
      path: '/event/:eventId',
      name: 'event',
      component: VenueEvent
    }
  ]
})
