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

    Changed and won: {{ result.CHANGE_WON }} <br>
    Changed and lost: {{ result.CHANGE_LOST }} <br>
    Kept and won:  {{ result.KEEP_WON }} <br>
    Kept and lost: {{ result.KEEP_LOST }} <br>

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
        title: 'People that chose to change',
        pieHole: 0.4
      },
      keptChartOptions: {
        title: 'People that chose to keep',
        pieHole: 0.4
      }
    }
  },
  computed: {
    changedChartData () {
      return [
        ['Result', 'Total'],
        ['Won', this.result.CHANGE_WON],
        ['Lost', this.result.CHANGE_LOST]
      ]
    },
    keptChartData () {
      return [
        ['Result', 'Total'],
        ['Won', this.result.KEEP_WON],
        ['Lost', this.result.KEEP_LOST]
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
