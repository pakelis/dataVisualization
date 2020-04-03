import React, {useState} from 'react'

//ant d

import {Select, Button} from 'antd'

const {Option} = Select

function handleChange(value, placeholder) {
  console.log(`selected ${value}`)
}

const IndicatorSelect = props => {
  const {
    columns,
    setIndicator,
    setChartType,
    indicator,
    chartNameField,
    setChartNameField,
    chartType,
    handlePreview,
  } = props
  // console.log(columns);

  return (
    <>
      <Select
        placeholder="Select indicator"
        onChange={value => setIndicator(value)}
        style={{width: 200}}
      >
        {columns.map((row, i) =>
          row.data_type != 'character varying' ? (
            <Option value={row.column_name} key={i}>
              {row.column_name}
            </Option>
          ) : null,
        )}
      </Select>
      <Select
        placeholder="Chart Name Field"
        onChange={value => setChartNameField(value)}
        style={{width: 150}}
      >
        {columns.map((row, i) =>
          row.data_type === 'character varying' ? (
            <Option value={row.column_name} key={i}>
              {row.column_name}
            </Option>
          ) : null,
        )}
      </Select>
      <Select
        placeholder="Chart type"
        onChange={value => setChartType(value)}
        style={{width: 150}}
      >
        <Option value="columnChart">Column chart</Option>
        <Option value="barChart">Bar chart</Option>
        <Option value="pieChart">Pie chart</Option>
      </Select>
      {indicator && chartNameField && chartType && (
        <Button onClick={handlePreview}>Chart preview</Button>
      )}
    </>
  )
}

export default IndicatorSelect
