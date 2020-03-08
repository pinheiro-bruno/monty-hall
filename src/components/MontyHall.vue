<template>
  <b-container class="monty-hall">
    <b-row>
      <b-col>
        <div class="result"> {{ result }}</div>
      </b-col>
    </b-row>

    <b-row flex>
      <card class="card"
            v-for="card in cards"
            :key="card.id"
            :id="card.id"
            :selected="card.selected"
            :content="card.content"
            :revealed="card.revealed"
            @cardSelect="selectCard($event)"
      >
      </card>
    </b-row>

    <b-row class="deal-buttons text-center">
      <b-col>
        <b-button v-show="isDealStep" @click="keep()">Keep</b-button>
        <b-button v-show="isDealStep" @click="change()">Change</b-button>
        <b-button v-show="isEndStep" @click="restart()">Restart</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from 'underscore'
import Card from './Card'

let CAR = 'car'
let GOAT = 'goat'

export default {
  name: 'MontyHall',
  components: { Card },
  data () {
    return {
      currentStep: 1,
      result: '',
      cards: [
        {
          id: 1,
          selected: false,
          content: GOAT,
          revealed: false
        },
        {
          id: 2,
          selected: false,
          content: GOAT,
          revealed: false
        },
        {
          id: 3,
          selected: false,
          content: CAR,
          revealed: false
        }
      ]
    }
  },
  computed: {
    isSelectionStep () {
      return this.currentStep === 1
    },
    isRevealStep () {
      return this.currentStep === 2
    },
    isDealStep () {
      return this.currentStep === 3
    },
    isEndStep () {
      return this.currentStep === 4
    },
    carCard () {
      return this.cards.filter(card => {
        if (card.content === CAR) {
          return card
        }
      })[0]
    },
    selectedCard () {
      return this.cards.filter(card => {
        if (card.selected) {
          return card
        }
      })[0]
    },
    notSelectedCard () {
      let notSelectedCard = this.cards.filter(card => {
        if (!card.selected && !card.revealed) {
          return card
        }
      })

      if (notSelectedCard.length > 1) {
        console.log('should raise exception')
      }

      return notSelectedCard[0]
    }
  },
  methods: {
    restart () {
      this.cards.forEach(card => {
        card.selected = false
        card.revealed = false
      })

      this.result = ''
      this.cards = _.shuffle(this.cards)
      this.currentStep = 1
    },
    shuffleCards () {
      this.cards = _.shuffle(this.cards)
    },
    selectCard (id) {
      if (!this.isSelectionStep) {
        return
      }

      this.cards.forEach(card => {
        card.selected = false
        if (card.id === id) {
          card.selected = true
        }
      })

      this.currentStep = 2
      this.revealGoatCard()
    },
    revealGoatCard () {
      if (!this.isRevealStep) {
        return
      }

      let availableGoats = this.cards.filter(card => {
        if (!card.selected && card.content === GOAT) {
          return card
        }
      })

      let revealedCard = _.shuffle(availableGoats)[0]
      revealedCard.revealed = true

      this.currentStep = 3
    },
    revealAll () {
      this.cards.forEach(card => {
        card.revealed = true
      })
    },
    showResult () {
      if (this.carCard.selected) {
        this.result = 'Congratulation you are a winner.'
      } else {
        this.result = 'Maybe on the next time.'
      }
      this.currentStep = 4
    },
    keep () {
      this.revealAll()
      this.showResult()
    },
    change () {
      let notSelectedCard = this.notSelectedCard

      this.selectedCard.selected = false
      notSelectedCard.selected = true

      this.revealAll()
      this.showResult()
    }
  },
  beforeMount () {
    this.shuffleCards()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .deal-buttons {
    margin-top: 20px;
  }

  .result {
    height: 20px;
    margin-bottom: 40px;
  }
</style>
