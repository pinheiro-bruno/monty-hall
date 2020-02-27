<template>
  <div class="monty-hall">
    <card v-bind:content="card.content"
      v-bind:selected="card.selected"
      v-for="card in cards"
      v-bind:key="card.id"
    ></card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import _ from 'underscore'

const GOAT = 'goat'
const CAR = 'car'

export default {
  name: 'MontyHall',
  components: {
    Card
  },
  data () {
    return {
      cards: [
        {
          id: 1,
          content: GOAT,
          selected: false
        },
        {
          id: 2,
          content: GOAT,
          selected: false
        },
        {
          id: 3,
          content: CAR,
          selected: false
        }
      ]
    }
  },
  methods: {
    shuffleCards: function () {
      this.cards = _.shuffle(this.cards)
    }
  },
  beforeMount () {
    this.shuffleCards()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
</style>
