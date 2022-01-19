<template>
  <div>
    <b-table
        :items="items"
        :fields="fields1"
        responsive="sm"
    >

    </b-table>
  </div>
</template>

<script>
import GetStockData from '../services/getStockData';

export default {
  mounted() {
    GetStockData.getUserBoard().then(res => {
      console.log('res', res.data)
      this.items=res.data;
    })
  },
  data() {
    return {
      items: [

      ],
      fields1: [
        {key: 'dealer', label: 'ID'},
        {key: 'foreign_investors', label: 'Type 1'},
        {key: 'investment_trust', label: 'Type 2A'},
        {key: 'market_type', label: 'Type 2B'},
        {key: 'processing_date', label: 'Type 2C'},
        {key: 'stock_num', label: 'Type 3'},
        {key: 'total_buysell', label: 'Type 3'}
      ]
    }
  }
}
</script>