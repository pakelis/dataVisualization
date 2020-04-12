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

//TODO fix custom tool tip!!!!

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

        let fixedDateData = parseDateColumn(res.data)
        // console.log(fixedDateData)

        let chart = fixedDateData.map((val) => {
          if (chartType != 'pieChart') {
            return {
              name: val[chartNameField],
              [indicator]: parseInt(val[indicator]),
              year: val.Metai,
            }
          } else {
            let arr = indicator.map((indVal, index) => {
              return {
                name: indVal,
                value: parseInt(val[indVal]),
              }
            })
            return arr
          }
        })

        setCustomTooltipData(fixedDateData.map((val) => val.Metai))

        setDataMax(
          Math.max(...fixedDateData.map((val) => val[indicator])) + 100,
        )

        setChartData(chart)
      })
      .catch((err) => console.log(err))
  }

  //we need to change format of our date column values, because we get YYYY-MM-DTH:m:s.SSSZ format
  // fixes date column from array of objects [{}{}{}..]
  const parseDateColumn = (arrayOfObject) => {
    if (arrayOfObject != null) {
      let newResData = arrayOfObject.map((row, index) => {
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
          } else {
            return {...row}
          }
        }
      })
      return newResData
      // setResponseData(newResData);
    }
  }

  return (
    <Col span={16} style={{display: 'flex', flexWrap: 'wrap'}}>
      {chartType === 'barChart' ? (
        <Barchart
          dataMax={dataMax}
          chartData={chartData}
          indicator={indicator}
          chartNameField={chartNameField}
          customTooltipData={customTooltipData}
        />
      ) : chartType === 'columnChart' ? (
        <Columnchart
          dataMax={dataMax}
          chartData={chartData}
          indicator={indicator}
          chartNameField={chartNameField}
          customTooltipData={customTooltipData}
        />
      ) : chartData != null && chartType === 'pieChart' ? (
        chartData.map((obj, index) => (
          <Piechart
            key={index}
            chartData={chartData[index]}
            indicator={indicator}
            chartNameField={chartNameField}
          />
        ))
      ) : null}
    </Col>
  )
}

export default ChartPreview
