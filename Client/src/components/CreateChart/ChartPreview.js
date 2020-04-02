import React, {useState, useEffect} from 'react'
import {useAuth0} from '../../react-auth0-spa'

//recharts
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

//libs
import axios from 'axios'

//context
import {useSelectedTableValue} from '../../context'

const ChartPreview = ({indicator, chartNameField, chartType, tableColumns}) => {
  const {selectedTable} = useSelectedTableValue()
  const {getTokenSilently} = useAuth0()
  const [responseData, setResponseData] = useState()
  const [chartData, setChartData] = useState()

  useEffect(() => {
    getData()
  }, [selectedTable])

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
      .then(res => {
        setResponseData(res.data)
        console.log(res.data)

        let chart = res.data.map(val => {
          return {
            name: val[chartNameField],
            [indicator]: val[indicator],
          }
        })

        setChartData(chart)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {chartType === 'barChart' ? (
        <BarChart width={730} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </BarChart>
      ) : null}
    </div>
  )
}

export default ChartPreview
