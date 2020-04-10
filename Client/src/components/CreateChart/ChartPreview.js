import React, {useState, useEffect} from 'react'
import {useAuth0} from '../../react-auth0-spa'
import Barchart from './Diagrams/Barchart'
import Columnchart from './Diagrams/Columnchart'
import Piechart from './Diagrams/Piechart'

//moment
import moment from 'moment'

//ant-d
import {Col, Row} from 'antd'

//react-responsive
import {useMediaQuery} from 'react-responsive'

//libs
import axios from 'axios'

//context
import {useSelectedTableValue} from '../../context'

const ChartPreview = ({indicator, chartNameField, chartType, tableColumns}) => {
  const {selectedTable} = useSelectedTableValue()
  const {getTokenSilently} = useAuth0()
  const [responseData, setResponseData] = useState()
  const [chartData, setChartData] = useState()
  const [dataMax, setDataMax] = useState()
  const [customTooltipData, setCustomTooltipData] = useState()

  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})

  useEffect(() => {
    getData()
  }, [indicator, chartNameField])

  /* useEffect(() => {
    getData();
  }, [selectedTable, chartNameField, indicator, chartType]); */

  const getData = async () => {
    const token = await getTokenSilently()

    let res = await axios
      .get('/admin/api/selectedtable', {
        params: {
          tableName: selectedTable,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setResponseData(res.data)

        parseDateColumn()

        let chart = responseData.map((val) => {
          return {
            name: val[chartNameField],
            value: parseInt(val[indicator]),
            year: val.Metai,
          }
        })

        setCustomTooltipData(res.data.map((val) => val.Metai))

        setDataMax(Math.max(...res.data.map((val) => val[indicator])) + 100)

        setChartData(chart)
      })
      .catch((err) => console.log(err))
  }

  console.log(
    responseData != null
      ? moment(responseData[0].date, moment.ISO_8601, true).isValid()
      : null,
  )

  //we need to change format of our date column values, because we get YYYY-MM-DTH:m:s.SSSZ format
  const parseDateColumn = () => {
    if (responseData != null) {
      let newResData = responseData.map((row, index) => {
        for (let i = 0; i < tableColumns.length; i++) {
          // console.log(row[tableColumns[i]]); // each object value
          if (
            moment(row[tableColumns[i]], 'YYYY-MM-DTH:m:s.SSSZ', true).isValid()
          ) {
            let objectValue = row[tableColumns[i]]
            // return moment(objectValue).format('YYYY/MM/DD')
            return {
              ...row,
              [tableColumns[i]]: moment(objectValue).format('YYYY/MM/DD'),
            }
          }
        }
      })
      // console.log(newResData)
      setResponseData(newResData)
    }
  }

  return (
    <Col span={16}>
      {chartType === 'barChart' ? (
        <Barchart
          dataMax={dataMax}
          chartData={chartData}
          customTooltipData={customTooltipData}
        />
      ) : chartType === 'columnChart' ? (
        <Columnchart
          dataMax={dataMax}
          chartData={chartData}
          customTooltipData={customTooltipData}
        />
      ) : chartType === 'pieChart' ? (
        <Piechart chartData={chartData} />
      ) : null}
    </Col>
  )
}

export default ChartPreview
