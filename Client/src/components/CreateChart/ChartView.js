import React from 'react'
import ChartCustomization from './ChartCustomization'
import ChartPreview from './ChartPreview'

//ant-d
import {Typography, Row} from 'antd'
const {Text} = Typography

const ChartView = ({indicator, chartNameField, chartType, tableColumns}) => {
  console.log(indicator)

  return (
    <>
      <div className="section__text">
        <Text strong>Customize your Visualization</Text>
      </div>
      <Row>
        <ChartCustomization />
        <ChartPreview
          indicator={indicator}
          chartNameField={chartNameField}
          chartType={chartType}
          tableColumns={tableColumns}
        />
      </Row>
    </>
  )
}

export default ChartView
