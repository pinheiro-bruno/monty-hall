<template>
    <div class="card">
        content: {{ content }} <br>
        selected: {{ selected }}
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['content', 'selected']
}
</script>

<style scoped>
  .card{
    margin-bottom: 20px;
  }
</style>
