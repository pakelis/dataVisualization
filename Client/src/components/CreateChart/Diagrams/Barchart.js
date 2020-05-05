import React, {useEffect} from 'react'
import CustomTooltip from '../CustomTooltip'

//react-responsive
import {useMediaQuery} from 'react-responsive'

//recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

//context
import {useCustomizationValue} from '../../../context'

const Barchart = ({
  dataMax,
  chartData,
  customTooltipData,
  indicator,
  chartNameField,
}) => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  /*using context to get all the values we set in customization
    , I think using context on values that changes alot is bad practice
    , need to redo it later with redux */
  const {
    width,
    height,
    textSize,
    leftMargin,
    rightMargin,
  } = useCustomizationValue()

  console.log(`BarChart ${(width, height)}`)

  return (
    <ResponsiveContainer
      width={width ? width : 850}
      height={height ? height : 1800}
    >
      <BarChart
        // width={width ? width : 850}
        // height={height ? height : 1800}
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
        {/* <Tooltip content={<CustomTooltip payload={customTooltipData} />} /> */}
        <Tooltip />
        {/* <CustomTooltip /> */}
        <Legend />
        <Bar dataKey={indicator} fill="#1DA57A" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Barchart
