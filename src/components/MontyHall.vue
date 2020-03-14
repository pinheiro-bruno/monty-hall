<template>
  <b-container fluid class="table-top">
    <b-row id="wood-border" class="shadow ">
      <b-col>
        <div class="result"> {{ result }}</div>
      </b-col>
    </b-row>

    <b-row>
      <card class="offset-lg-3 offset-xl-3"
            :id="cards[0].id"
            :selected="cards[0].selected"
            :content="cards[0].content"
            :revealed="cards[0].revealed"
            @cardSelect="selectCard($event)"
      >
      </card>
      <card :id="cards[1].id"
            :selected="cards[1].selected"
            :content="cards[1].content"
            :revealed="cards[1].revealed"
            @cardSelect="selectCard($event)"
      >
      </card>
      <card :id="cards[2].id"
            :selected="cards[2].selected"
            :content="cards[2].content"
            :revealed="cards[2].revealed"
            @cardSelect="selectCard($event)"
      >
      </card>
    </b-row>

    <b-row class="deal-buttons text-center">
      <b-col>
        <b-button class="btn-primary" v-show="isDealStep" @click="keep()">Manter minha carta</b-button>
        <b-button class="btn-primary" v-show="isDealStep" @click="change()">Mudar minha carta</b-button>
        <b-button class="btn-primary" v-show="isEndStep" @click="restart()">Recomeçar</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from 'underscore'
import Card from './Card'
import { alphaResults, FieldValue } from '@/firebase/firebaseConfig'

let CAR = 'car'
let GOAT = 'goat'

export default {
  name: 'MontyHall',
  components: { Card },
  data () {
    return {
      currentStep: 1,
      changed: false,
      won: false,
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

      this.won = false
      this.changed = false
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
        card.selected = card.id === id
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
    sendResult () {
      this.won = this.carCard.selected
      let key = this.changed ? 'CHANGE' : 'KEEP'
      key += this.won ? '_WON' : '_LOST'
      alphaResults.update(key, FieldValue.increment(1))
    },
    showResult () {
      this.sendResult()
      if (this.carCard.selected) {
        this.result = 'Parabéns, você ganhou!'
      } else {
        this.result = 'Você perdeu, quem sabe da próxima vez'
      }
      this.currentStep = 4
    },
    keep () {
      this.changed = false
      this.revealAll()
      this.showResult()
    },
    change () {
      this.changed = true
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
<style>
  .deal-buttons {
    margin-top: 40px;
  }

  .table-top{
    min-height: 100%;
    height: 100%;
    background-image: url('../assets/texture-green.jpg');
    background-repeat: repeat;
  }

  .btn-primary{
    background-color: #135eae;
  }

  .btn-primary:hover{
    background-color: #0a4cae;
  }

  #wood-border{
    height: 100px;
    background-image: url('../assets/wood.jpeg');
    background-repeat: repeat;
    line-height: 100px;
    margin-bottom: 40px;
    font-size: 20px;
    color: white;
  }

  .container-fluid{
    padding: 0;
  }
</style>
