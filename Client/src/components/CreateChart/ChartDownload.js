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
    switch (selectValue) {
      case 'png':
        domtoimage
          .toBlob(document.getElementById('node-to-convert'))
          .then((blob) => {
            fileDownload(
              blob,
              fileName && fileName !== ''
                ? `${fileName}.png`
                : 'dataVisualization.png',
            )
          })
        break
      case 'jpeg':
        domtoimage
          .toJpeg(document.getElementById('node-to-convert'), {quality: 0.95})
          .then(function (dataUrl) {
            var link = document.createElement('a')
            link.download =
              fileName && fileName !== ''
                ? `${fileName}.jpeg`
                : 'dataVisualization.jpeg'
            link.href = dataUrl
            link.click()
          })
        break
      case 'svg':
        domtoimage
          .toSvg(document.getElementById('node-to-convert'), {quality: 0.95})
          .then((dataUrl) => {
            console.log(dataUrl)
          })
        break
      default:
        console.log('file format like that doesnt exist')
    }
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
          placeholder="Choose type"
          onChange={handleSelectChange}
          style={{fontWeight: 'bold'}}
          className="download-form__input"
        >
          <Option value="png">PNG</Option>
          <Option value="jpeg">JPEG</Option>
        </Select>
        <Input
          placeholder="Filename"
          value={fileName || ''}
          onChange={handleInputChange}
          className="download-form__input"
        />
        <Button
          disabled={!selectValue}
          onClick={handleSaveClick}
          className="download-form__input"
        >
          Download
        </Button>
      </div>
    </>
  )
}

export default ChartDownload
