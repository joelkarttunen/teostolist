<template>
  <p>Osoite: {{ place.address.streetAddress}} {{ place.address.zipCode}} {{ place.address.postOffice}}</p> 
</template>

<script>

export default {
  name: 'VenueAddress',
  props: ['place']
}
</script>