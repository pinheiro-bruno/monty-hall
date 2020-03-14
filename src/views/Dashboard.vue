<template>
  <div>
    <div>Dashboard</div>

    <GChart
      type="PieChart"
      :data="changedChartData"
      :options="changedChartOptions"
    />

    <GChart
      type="PieChart"
      :data="keptChartData"
      :options="keptChartOptions"
    />

    Trocou e ganhou: {{ result.CHANGE_WON }} <br>
    Trocou e perdeu: {{ result.CHANGE_LOST }} <br>
    Manteve e ganhou:  {{ result.KEEP_WON }} <br>
    Manteve e perdeu: {{ result.KEEP_LOST }} <br>

  </div>
</template>

<script>
import { db } from '@/firebase/firebaseConfig'
import { GChart } from 'vue-google-charts'

export default {
  name: 'Dashboard',
  data () {
    return {
      result: {},
      changedChartOptions: {
        title: 'Pessoas que escolheram trocar',
        pieHole: 0.4
      },
      keptChartOptions: {
        title: 'Pessoas que escolheram manter',
        pieHole: 0.4
      }
    }
  },
  computed: {
    changedChartData () {
      return [
        ['Resultado', 'Total'],
        ['Ganhou', this.result.CHANGE_WON],
        ['Perdeu', this.result.CHANGE_LOST]
      ]
    },
    keptChartData () {
      return [
        ['Resultado', 'Total'],
        ['Ganhou', this.result.KEEP_WON],
        ['Perdeu', this.result.KEEP_LOST]
      ]
    }
  },
  components: {
    GChart
  },
  firestore: {
    result: db.collection('results').doc('alpha')
  }
}
</script>

<style scoped>

</style>
