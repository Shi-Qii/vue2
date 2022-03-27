class getField {

    setFieldProfitability(data) {
        console.log('data', data)

        let value = data;
        let tableItemsArr = []
        let tableFieldsArr = []
        let itemsObj1 = {}
        let itemsObj2 = {}
        let itemsObj3 = {}
        let itemsObj4 = {}
        let itemsObj5 = {}
        let itemsObj6 = {}
        let itemsObj7 = {}
        let itemsObj8 = {}
        let itemsObj9 = {}
        let itemsObj10 = {}
        let itemsObj11 = {}
        let itemsObj12 = {}
        let itemsObj13 = {}
        let itemsObj14 = {}
        let fieldsObj1 = {}
        value.forEach(f => {


            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date'] = '營業毛利率'
            itemsObj2['date'] = '營業利益率'
            itemsObj3['date'] = '稅前淨利率'
            itemsObj4['date'] = '稅後淨利率'
            itemsObj5['date'] = '稅後淨利率(母公司)'
            itemsObj6['date'] = '損益總額淨利率'
            itemsObj7['date'] = '損益總額淨利率(母公司)'
            itemsObj8['date'] = '每股稅前盈餘(元)'
            itemsObj9['date'] = '每股稅後盈餘(元)'
            itemsObj10['date'] = '每股淨值(元)'
            itemsObj11['date'] = '股東權益報酬率(季累計)'
            itemsObj12['date'] = '股東權益報酬率(年預估)'
            itemsObj13['date'] = '資產報酬率(季累計)'
            itemsObj14['date'] = '資產報酬率(年預估)'


            itemsObj1[dateformat] = Math.round((f['Operating_gross_margin'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Operating_profit_margin'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Pre_tax_income'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Net_income_margin'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Net_income_margin_pa'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Profit_margin'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Profit_margin_pa'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Pre_tax_EPS'] + Number.EPSILON) * 100) / 100;
            itemsObj9[dateformat] = Math.round((f['EPS'] + Number.EPSILON) * 100) / 100;
            itemsObj10[dateformat] = Math.round((f['NAVPS'] + Number.EPSILON) * 100) / 100;
            itemsObj11[dateformat] = Math.round((f['ROE'] + Number.EPSILON) * 100) / 100;
            itemsObj12[dateformat] = Math.round((f['ROE_year'] + Number.EPSILON) * 100) / 100;
            itemsObj13[dateformat] = Math.round((f['ROA'] + Number.EPSILON) * 100) / 100;
            itemsObj14[dateformat] = Math.round((f['ROA_year'] + Number.EPSILON) * 100) / 100;

            let fieldsObj2 = {
                key: null,
                label: null,
                thClass: 'text-center',
                tdClass: 'text-center',
                sortable: true
            }
            fieldsObj2['key'] = dateformat
            fieldsObj2['label'] = dateformat
            tableFieldsArr.push(fieldsObj2)

            fieldsObj1['key'] = 'date'
            fieldsObj1['label'] = '獲利能力'
            fieldsObj1['thClass'] = 'text-center text-danger'
            fieldsObj1['tdClass'] = 'text-center '
            fieldsObj1['sortable'] = true
            fieldsObj1['stickyColumn'] = true
        })

        tableItemsArr.push(itemsObj1)
        tableItemsArr.push(itemsObj2)
        tableItemsArr.push(itemsObj3)
        tableItemsArr.push(itemsObj4)
        tableItemsArr.push(itemsObj5)
        tableItemsArr.push(itemsObj6)
        tableItemsArr.push(itemsObj7)
        tableItemsArr.push(itemsObj8)
        tableItemsArr.push(itemsObj9)
        tableItemsArr.push(itemsObj10)
        tableItemsArr.push(itemsObj11)
        tableItemsArr.push(itemsObj12)
        tableItemsArr.push(itemsObj13)
        tableItemsArr.push(itemsObj14)

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldEarningsQuarterlyGrowthRate(data) {

        let value = data;
        let tableItemsArr = []
        let tableFieldsArr = []
        let itemsObj1 = {}
        let itemsObj2 = {}
        let itemsObj3 = {}
        let itemsObj4 = {}
        let itemsObj5 = {}
        let itemsObj6 = {}
        let itemsObj7 = {}
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date'] = '營收年成長率'
            itemsObj2['date'] = '毛利年成長率'
            itemsObj3['date'] = '營業利益年成長率'
            itemsObj4['date'] = '稅前淨利年成長率'
            itemsObj5['date'] = '稅後淨利年成長率'
            itemsObj6['date'] = '稅後淨利年成長率(母公司)'
            itemsObj7['date'] = '每股稅後盈餘年成長率'


            itemsObj1[dateformat] = Math.round((f['Revenue_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Gross_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Profit_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Pre_tax_income_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Net_income_margin_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Net_income_margin_pa_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['EPS_YoY'] + Number.EPSILON) * 100) / 100;
            let fieldsObj2 = {
                key: null,
                label: null,
                thClass: 'text-center',
                tdClass: 'text-center',
                sortable: true
            }
            fieldsObj2['key'] = dateformat
            fieldsObj2['label'] = dateformat
            tableFieldsArr.push(fieldsObj2)

            fieldsObj1['key'] = 'date'
            fieldsObj1['label'] = '獲利季成長率'
            fieldsObj1['thClass'] = 'text-center  '
            fieldsObj1['tdClass'] = 'text-center text-danger'
            fieldsObj1['sortable'] = true
            fieldsObj1['stickyColumn'] = true
        })
        tableItemsArr.push(itemsObj1)
        tableItemsArr.push(itemsObj2)
        tableItemsArr.push(itemsObj3)
        tableItemsArr.push(itemsObj4)

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }
}

export default new getField();