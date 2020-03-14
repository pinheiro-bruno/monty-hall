<template>
  <b-col cols="4" sm="4" md="4" lg="2" xl="2">
    <div class="scene">
      <div class="card" @click="select" :class="{ selected: selected, revealed: revealed }">
        <div class="card-face card-face-back">
          <div class="card-background"></div>
        </div>
        <div class="card-face card-face-front">
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

  .card-face-front {
    background-image: url('../assets/playing-card-back.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .card-face-front{
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
  }

  .card-face-back{
    transform: rotateY( 180deg );
  }

  .card.revealed{
    transform: rotateY( 180deg );
  }

  .card-background{
    padding-top: 150%
  }

  .selected {
    border: 1px green solid;
  }
</style>
