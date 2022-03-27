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
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

    setFieldProfitYearGrow(data) {

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
            fieldsObj1['label'] = '獲利年成長率'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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


        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldVarAssetToTotAsset(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='現金 (%)'
            itemsObj2['date']='應收帳款 (%)'
            itemsObj3['date']='存貨 (%)'
            itemsObj4['date']='速動資產 (%)'
            itemsObj5['date']='流動資產 (%)'
            itemsObj6['date']='基金與投資 (%)'
            itemsObj7['date']='固定資產 (%)'
            itemsObj8['date']='無形資產 (%)'
            itemsObj9['date']='其他資產 (%)'


            itemsObj1[dateformat] = Math.round((f['Cash_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Receivable_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Inventory_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Quick_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Current_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Fund_invest_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Fix_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Intangible_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj9[dateformat] = Math.round((f['Other_asset_ratio'] + Number.EPSILON) * 100) / 100;
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
            fieldsObj1['label'] = '各項資產佔總資產比重'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldVarAssetQuarterGrow(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='現金季成長率'
            itemsObj2['date']='應收帳款季成長率'
            itemsObj3['date']='存貨季成長率'
            itemsObj4['date']='流動資產季成長率'
            itemsObj5['date']='基金與投資季成長率'
            itemsObj6['date']='固定資產季成長率'
            itemsObj7['date']='無形資產季成長率'
            itemsObj8['date']='其他資產季成長率'
            itemsObj9['date']='資產總額季成長率'


            itemsObj1[dateformat] = Math.round((f['Cash_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Receivable_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Inventory_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Current_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Fund_invest_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Fix_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Intangible_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Other_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj9[dateformat] = Math.round((f['Total_asset_QoQ'] + Number.EPSILON) * 100) / 100;

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
            fieldsObj1['label'] = '資產季成長率'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldVarAssetYearGrow(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='現金年成長率'
            itemsObj2['date']='應收帳款年成長率'
            itemsObj3['date']='存貨年成長率'
            itemsObj4['date']='流動資產年成長率'
            itemsObj5['date']='基金與投資年成長率'
            itemsObj6['date']='固定資產年成長率'
            itemsObj7['date']='無形資產年成長率'
            itemsObj8['date']='其他資產年成長率'
            itemsObj9['date']='資產總額年成長率'


            itemsObj1[dateformat] = Math.round((f['Cash_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Receivable_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Inventory_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Current_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Fund_invest_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Fix_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Intangible_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Other_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj9[dateformat] = Math.round((f['Total_asset_YoY'] + Number.EPSILON) * 100) / 100;


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
            fieldsObj1['label'] = '資產年成長率'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldEquityDebtToTotAsset(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='應付帳款 (%)'
            itemsObj2['date']='流動負債 (%)'
            itemsObj3['date']='長期負債 (%)'
            itemsObj4['date']='其他負債 (%)'
            itemsObj5['date']='長短期金融負債 (%)'
            itemsObj6['date']='負債總額 (%)'
            itemsObj7['date']='普通股股本 (%)'
            itemsObj8['date']='股東權益總額 (%)'

            itemsObj1[dateformat] = Math.round((f['Payable_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Current_debt_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Long_debt_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Other_debt_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['LS_financial_debt_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Total_debt_asset_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Share_capital'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Sharesholder_equity'] + Number.EPSILON) * 100) / 100;



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
            fieldsObj1['label'] = '負債&股東權益佔總資產'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldEquityDebtQuaterGrow(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='應付帳款季成長率'
            itemsObj2['date']='流動負債季成長率'
            itemsObj3['date']='長期負債季成長率'
            itemsObj4['date']='其他負債季成長率'
            itemsObj5['date']='長短期金融負債季成長率'
            itemsObj6['date']='負債總額季成長率'
            itemsObj7['date']='普通股股本季成長率'
            itemsObj8['date']='股東權益總額季成長率'

            itemsObj1[dateformat] = Math.round((f['Payable_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Current_debt_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Long_debt_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Other_debt_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['LS_financial_debt_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Total_debt_asset_ratio_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Share_capital_QoQ'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Sharesholder_equity_QoQ'] + Number.EPSILON) * 100) / 100;




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
            fieldsObj1['label'] = '負債&股東權益季增減率'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldEquityDebtYearGrow(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='應付帳款年成長率'
            itemsObj2['date']='流動負債年成長率'
            itemsObj3['date']='長期負債年成長率'
            itemsObj4['date']='其他負債年成長率'
            itemsObj5['date']='長短期金融負債年成長率'
            itemsObj6['date']='負債總額年成長率'
            itemsObj7['date']='普通股股本年成長率'
            itemsObj8['date']='股東權益總額年成長率'

            itemsObj1[dateformat] = Math.round((f['Payable_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Current_debt_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Long_debt_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Other_debt_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['LS_financial_debt_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Total_debt_asset_ratio_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Share_capital_YoY'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Sharesholder_equity_YoY'] + Number.EPSILON) * 100) / 100;




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
            fieldsObj1['label'] = '負債&股東權益年增減率'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldSolvency(data) {

        let value = data;
        let tableItemsArr = []
        let tableFieldsArr = []
        let itemsObj1 = {}
        let itemsObj2 = {}
        let itemsObj3 = {}
        let itemsObj4 = {}
        let itemsObj5 = {}
        let itemsObj6 = {}
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='現金比'
            itemsObj2['date']='速動比'
            itemsObj3['date']='流動比'
            itemsObj4['date']='利息保障倍數'
            itemsObj5['date']='現金流量比 (季累計)'
            itemsObj6['date']='現金流量比 (年預估)'


            itemsObj1[dateformat] = Math.round((f['Cash_debt_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Quik_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Current_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['TIE'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Cash_flow_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Cash_flow_ratio_year'] + Number.EPSILON) * 100) / 100;




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
            fieldsObj1['label'] = '償債能力'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
            fieldsObj1['sortable'] = true
            fieldsObj1['stickyColumn'] = true
        })
        tableItemsArr.push(itemsObj1)
        tableItemsArr.push(itemsObj2)
        tableItemsArr.push(itemsObj3)
        tableItemsArr.push(itemsObj4)
        tableItemsArr.push(itemsObj5)
        tableItemsArr.push(itemsObj6)

        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldCashflowStatement(data) {

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
        let itemsObj15 = {}
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='營業成本率'
            itemsObj2['date']='營業費用率'
            itemsObj3['date']='應收帳款週轉率 (次/年)'
            itemsObj4['date']='應收款項收現日數 (日)'
            itemsObj5['date']='應付帳款週轉率 (次/年)'
            itemsObj6['date']='應付款項付現日數 (日)'
            itemsObj7['date']='存貨週轉率 (次/年)'
            itemsObj8['date']='平均售貨日數 (日)'
            itemsObj9['date']='固定資產週轉率 (次/年)'
            itemsObj10['date']='總資產週轉率 (次/年)'
            itemsObj11['date']='淨值週轉率 (次/年)'
            itemsObj12['date']='應收帳款佔營收比率 (季累計)'
            itemsObj13['date']='應收帳款佔營收比率 (年預估)'
            itemsObj14['date']='存貨佔營收比率 (季累計)'
            itemsObj15['date']='存貨佔營收比率 (年預估)'


            itemsObj1[dateformat] = Math.round((f['Operating_cost_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Operating_expense_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Avg_collection_turnover'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Avg_collection_day'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Avg_payable_turnover'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Avg_payable_day'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Avg_inventory_turnover'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Avg_inventory_day'] + Number.EPSILON) * 100) / 100;
            itemsObj9[dateformat] = Math.round((f['Fix_asset_turnover'] + Number.EPSILON) * 100) / 100;
            itemsObj10[dateformat] = Math.round((f['Total_asset_turnover'] + Number.EPSILON) * 100) / 100;
            itemsObj11[dateformat] = Math.round((f['Net_income_turnover'] + Number.EPSILON) * 100) / 100;
            itemsObj12[dateformat] = Math.round((f['Receivable_revenue_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj13[dateformat] = Math.round((f['Receivable_revenue_ratio_year'] + Number.EPSILON) * 100) / 100;
            itemsObj14[dateformat] = Math.round((f['Inventory_revenue_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj15[dateformat] = Math.round((f['Inventory_revenue_ratio_year'] + Number.EPSILON) * 100) / 100;




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
            fieldsObj1['label'] = '現金流量狀況'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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
        tableItemsArr.push(itemsObj15)
        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

    setFieldOtherIndicators(data) {

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
        let fieldsObj1 = {}
        value.forEach(f => {

            let dateformat = (f['Year'] + '年' + f['Season'] + '季').toString();
            itemsObj1['date']='每股營業現金流量 (元)'
            itemsObj2['date']='每股投資現金流量 (元)'
            itemsObj3['date']='每股融資現金流量 (元)'
            itemsObj4['date']='每股淨現金流量 (元)'
            itemsObj5['date']='每股自由現金流量 (元)'
            itemsObj6['date']='負債對淨值比率'
            itemsObj7['date']='長期資金適合率'
            itemsObj8['date']='所得稅佔稅前淨利比率'
            itemsObj9['date']='業外損益佔營收比率'
            itemsObj10['date']='業外損益佔稅前淨利比率'
            itemsObj11['date']='獲利含金量比率'


            itemsObj1[dateformat] = Math.round((f['Per_share_CFO'] + Number.EPSILON) * 100) / 100;
            itemsObj2[dateformat] = Math.round((f['Per_share_CFI'] + Number.EPSILON) * 100) / 100;
            itemsObj3[dateformat] = Math.round((f['Per_share_CFF'] + Number.EPSILON) * 100) / 100;
            itemsObj4[dateformat] = Math.round((f['Per_share_CF'] + Number.EPSILON) * 100) / 100;
            itemsObj5[dateformat] = Math.round((f['Per_share_free_CF'] + Number.EPSILON) * 100) / 100;
            itemsObj6[dateformat] = Math.round((f['Debt_net_income_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj7[dateformat] = Math.round((f['Long_funding_adaptation_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj8[dateformat] = Math.round((f['Tax_net_profit_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj9[dateformat] = Math.round((f['Out_operating_revenue_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj10[dateformat] = Math.round((f['Out_operating_preincome_ratio'] + Number.EPSILON) * 100) / 100;
            itemsObj11[dateformat] = Math.round((f['Revenue_net_income_margin_ratio'] + Number.EPSILON) * 100) / 100;


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
            fieldsObj1['label'] = '其他指標'
            fieldsObj1['thClass'] = 'text-center  text-danger setwidth'
            fieldsObj1['tdClass'] = 'text-left '
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
        tableFieldsArr.unshift(fieldsObj1)
        let bigObj = {item: tableItemsArr, field: tableFieldsArr}
        return bigObj;
    }

}



export default new getField();