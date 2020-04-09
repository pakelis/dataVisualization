import React, {useState, useEffect} from 'react'
import CustomTooltip from './CustomTooltip'
import {useAuth0} from '../../react-auth0-spa'

//ant-d
import {Col, Row} from 'antd'

//react-responsive
import {useMediaQuery} from 'react-responsive'

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
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts'

//libs
import axios from 'axios'

//context
import {useSelectedTableValue} from '../../context'

const sampleData = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
  {
    name: 'Group E',
    value: 278,
  },
  {
    name: 'Group F',
    value: 189,
  },
]

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
  }, [selectedTable, chartNameField, indicator, chartType])

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

        let chart = res.data.map((val) => {
          return {
            name: val[chartNameField],
            [indicator]: val[indicator],
            year: val.Metai,
          }
        })

        setCustomTooltipData(res.data.map((val) => val.Metai))

        setDataMax(Math.max(...res.data.map((val) => val[indicator])) + 100)

        // setChartData(chart)

        setChartData(chart.slice(0, 10))
      })
      .catch((err) => console.log(err))
  }

  return (
    <Col span={16}>
      {chartType === 'barChart' ? (
        <ResponsiveContainer width="95%" height={1800}>
          <BarChart
            width={850}
            height={1800}
            data={chartData}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis type="number" domain={[0, dataMax]} />
            <YAxis
              type="category"
              dataKey="name"
              width={isTabletOrMobile ? 0 : 340}
              interval={0}
            />
            {/* interval on axis shows all categories */}
            <Tooltip content={<CustomTooltip payload={customTooltipData} />} />
            {/* <CustomTooltip /> */}
            <Legend />
            <Bar dataKey={indicator} fill="#1DA57A" />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
      {chartType === 'columnChart' ? (
        <ResponsiveContainer width="95%" height={850}>
          <BarChart width={1850} height={850} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis
              dataKey="name"
              angle={-90}
              interval={0}
              height={isTabletOrMobile ? 0 : 340}
              textAnchor="end"
            />
            <YAxis domain={[0, dataMax]} />
            {/* interval on axis shows all categories */}
            <Tooltip content={<CustomTooltip payload={customTooltipData} />} />
            {/* <CustomTooltip /> */}
            <Legend />
            <Bar dataKey={indicator} fill="#1DA57A" />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
      {chartType === 'pieChart' ? (
        <>
          <ResponsiveContainer width="95%" height={350}>
            <PieChart width={730} height={250}>
              <Pie
                data={chartData}
                dataKey={indicator}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
            </PieChart>
          </ResponsiveContainer>
          {/* <ResponsiveContainer width="95%" height={350}> 
            <PieChart width={730} height={250}>
              <Pie
                data={sampleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
            </PieChart>
          </ResponsiveContainer> */}
        </>
      ) : null}
    </Col>
  )
}

export default ChartPreview
