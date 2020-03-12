<template>
  <b-col cols="4" sm="4" md="4" lg="2" xl="2">
    <div class="card" @click="select" :class="{ selected: selected }">
      <div class="card-background"></div>
      <div v-show="revealed" class="content">{{ content }}</div>
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
  .card {
    background-image: url('../assets/playing-card-back.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .card-background{
    padding-top: 150%
  }

  .selected {
    border: 1px green solid;
  }
</style>
