import React, {useState} from 'react'

//libs
import domtoimage from 'dom-to-image'
import fileDownload from 'js-file-download'

//ant-d
import {Typography, Button, Select, Input} from 'antd'
import {useSelectedTableValue} from '../../context'
const {Text} = Typography
const {Option} = Select

const ChartDownload = () => {
  const [selectValue, setSelectValue] = useState(null)
  const [fileName, setFileName] = useState(null)
  const handleSaveClick = () => {
    if (fileName === 'png') {
      domtoimage
        .toBlob(document.getElementById('node-to-convert'))
        .then((blob) => {
          fileDownload(
            blob,
            fileName && fileName !== '' ? fileName : 'dataVisualization.png',
          )
        })
    } else if (fileName === 'jpeg') {
      domtoimage
        .toJpeg(document.getElementById('node-to-convert'))
        .then((blob) => {
          fileDownload(
            blob,
            fileName && fileName !== '' ? fileName : 'dataVisualization.png',
          )
        })
    } else {
      domtoimage
        .toSvg(document.getElementById('node-to-convert'))
        .then((blob) => {
          fileDownload(
            blob,
            fileName && fileName !== '' ? fileName : 'dataVisualization.png',
          )
        })
    }
    setSelectValue(null)
    setFileName(null)
  }

  const handleSelectChange = (value) => {
    setSelectValue(value)
  }

  const handleInputChange = (e) => {
    setFileName(e.target.value)
  }

  return (
    <>
      <div className="section__text">
        <Text strong>Download your chart</Text>
      </div>
      <div className="download-form">
        <Select
          onChange={handleSelectChange}
          style={{width: '120px'}}
          value={selectValue}
          placeholder="Format"
        >
          <Option value="png">PNG</Option>
          <Option value="jpeg">JPEG</Option>
          <Option value="svg">SVG</Option>
        </Select>
        <Input
          placeholder="Enter file name"
          value={fileName || ''}
          onChange={handleInputChange}
          style={{width: '240px'}}
        />
        <Button disabled={!selectValue} onClick={handleSaveClick}>
          Save Chart
        </Button>
      </div>
    </>
  )
}

export default ChartDownload
