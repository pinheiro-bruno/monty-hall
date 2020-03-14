<template>
  <b-col cols="4" sm="4" md="4" lg="2" xl="2">
    <div class="scene">
      <div class="card" @click="select" :class="{ selected: selected, revealed: revealed}">
        <div class="card-face card-face-back">
          <div class="card-background"></div>
        </div>
        <div class="card-face card-face-front" :class="{car: showCar, goat: showGoat}">
          <div class="card-background"></div>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'Card',
  props: ['id', 'selected', 'content', 'revealed'],
  computed: {
    showCar () {
      return this.revealed && this.content === 'car'
    },
    showGoat () {
      return this.revealed && this.content === 'goat'
    }
  },
  methods: {
    select () {
      this.$emit('cardSelect', this.id)
    }
  }
}
</script>

<style scoped>
  .card{
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .card-background{
    padding-top: 150%
  }

  .card-face-back {
    background-image: url('../assets/playing-card-back.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .card-face-back{
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
  }

  .card-face-front.goat{
    background-image: url('../assets/goat-playing-card.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .card-face-front.car{
    background-image: url('../assets/car-playing-card.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .card.revealed{
    transform: rotateY( 180deg );
  }

  .card.selected {
    transform: scale(1.1)
  }

  .card.revealed.selected{
    transform: scale(1.1) rotateY( 180deg );
  }
</style>
