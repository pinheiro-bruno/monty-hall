<template>
  <b-col md="2" :class="{ selected: selected }" class="card" @click="select">
    <div v-show="revealed" class="content">{{ content }}</div>
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
    height: 270px;
    line-height: 270px;
    margin-right: 20px;
    margin-left: 20px;
  }

  .selected {
    border: 1px green solid;
  }
</style>
