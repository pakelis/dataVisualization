import React, {useState} from 'react'
import {useMediaQuery} from 'react-responsive'

//ant d
import {Select, Button, Radio, Typography, Tag} from 'antd'

const {Option} = Select
const {Text} = Typography
const {CheckableTag} = Tag

const IndicatorSelect = (props) => {
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

  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const [tagCheck, setTagCheck] = useState(() => {
    let number = 0
    columns.map((row, i) => {
      if (row.data_type != 'character varying') {
        number++
      }
    })
    let arr = Array(number).fill(false)
    return {...arr}
  })
  const [checkedValues, setCheckedValues] = useState()

  const tagNumber = () => {
    let number = 0
    columns.map((row, i) => {
      if (row.data_type != 'character varying') {
        number++
      }
    })
    let arr = Array(number).fill(false)
    return {...arr}
  }

  const handleTagCheck = (index, value) => {
    console.log(tagCheck)
    console.log(checkedValues)
    setTagCheck({...tagCheck, [index]: !tagCheck[index]})
    //TODO we need to get values that we checked!
    setCheckedValues({...checkedValues, [value]: value})
  }

  //what palceholder we should render on different chart types
  const placeholder = (whichSelect) => {
    let placeholder = {}
    if (chartType === 'barChart') {
      placeholder.firstSelect = 'Y Axis'
      placeholder.secondSelect = 'X Axis'
    } else if (chartType === 'columnChart') {
      placeholder.firstSelect = 'X Axis'
      placeholder.secondSelect = 'Y Axis'
    } else if (chartType === 'pieChart') {
      placeholder.firstSelect = 'Arcs'
      placeholder.secondSelect = 'Label'
    }
    return whichSelect === 1
      ? placeholder.firstSelect
      : placeholder.secondSelect
  }

  return (
    <>
      {/* for tablet or mobile we make basic select && for desktop we make radio button select */}
      {isTabletOrMobile ? (
        <div className="selectInput">
          <Select
            placeholder={placeholder(1)}
            onChange={(value) => setIndicator(value)}
            style={{width: 200}}
          >
            {columns.map((row, i) =>
              // we check if our column data type is numeric or char
              row.data_type != 'character varying' ? (
                <Option value={row.column_name} key={i}>
                  {row.column_name}
                </Option>
              ) : null,
            )}
          </Select>
          <Select
            placeholder={placeholder(2)}
            onChange={(value) => setChartNameField(value)}
            style={{width: 150}}
          >
            {columns.map((row, i) =>
              row.data_type === 'character varying' ||
              row.data_type === 'date' ? (
                <Option value={row.column_name} key={i}>
                  {row.column_name}
                </Option>
              ) : null,
            )}
          </Select>
        </div>
      ) : (
        <div className="selectRadio-wrapper">
          <div className="selectRadio-selectors">
            {chartType === 'pieChart' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Text type="secondary" style={{padding: '10px'}}>
                  Select {placeholder(1)} :
                </Text>
                <div>
                  {columns.map((row, i) =>
                    row.data_type != 'character varying' ? (
                      <CheckableTag
                        checked={tagCheck[i]}
                        onChange={() => handleTagCheck(i, row.column_name)}
                        key={i}
                      >
                        {row.column_name}
                      </CheckableTag>
                    ) : null,
                  )}
                </div>
              </div>
            ) : (
              <div>
                <Text type="secondary" style={{padding: '10px'}}>
                  Select {placeholder(1)} :
                </Text>
                <Radio.Group buttonStyle="solid" className="selectRadio-group">
                  {columns.map((row, i) =>
                    row.data_type != 'character varying' ? (
                      <Radio.Button
                        value={row.column_name}
                        key={i}
                        onChange={(e) => setIndicator(e.target.value)}
                      >
                        {row.column_name}
                      </Radio.Button>
                    ) : null,
                  )}
                </Radio.Group>
              </div>
            )}
          </div>
          <div className="selectRadio-selectors">
            <Text type="secondary" style={{padding: '10px'}}>
              Select {placeholder(2)} :
            </Text>
            <Radio.Group buttonStyle="solid" className="selectRadio-group">
              {columns.map((row, i) =>
                row.data_type === 'character varying' ||
                row.data_type === 'date' ? (
                  <Radio.Button
                    value={row.column_name}
                    key={i}
                    onChange={(e) => setChartNameField(e.target.value)}
                  >
                    {row.column_name}
                  </Radio.Button>
                ) : null,
              )}
            </Radio.Group>
          </div>
        </div>
      )}
    </>
  )
}

export default IndicatorSelect
