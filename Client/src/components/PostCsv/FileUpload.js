import React, {Fragment, useEffect, useState} from 'react'

import axios from 'axios'
import Papa from 'papaparse'

import {useAuth0} from '../../react-auth0-spa'

import {Upload, message, Button, Typography} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import ShowUploadedData from './ShowUploadedData'

const {Title} = Typography

const FileUpload = () => {
  const {getTokenSilently} = useAuth0()

  const [file, setFile] = useState({
    selectedFile: null,
    selectedFileList: [],
    selectedFileName: '',
  })
  const [dataRows, setDataRows] = useState({})
  const [columns, setColumns] = useState()

  const getToken = async () => {
    const token = await getTokenSilently()

    // return (props.headers.authorization = `Bearer ${token}`);
  }

  const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  function cleanUpSpecialChars(str) {
    // we need this to clean up header
    return str
      .replace(/[ĖĘ]/g, 'E')
      .replace(/[ėę]/g, 'e')
      .replace(/[č]/g, 'c')
      .replace(/[Č]/g, 'C')
      .replace(/[ą]/g, 'a')
      .replace(/[Ą]/g, 'A')
      .replace(/[į]/g, 'i')
      .replace(/[Į]/g, 'I')
      .replace(/[ųū]/g, 'u')
      .replace(/[ŲŪ]/g, 'U')
      .replace(/[Š]/g, 'S')
      .replace(/[š]/g, 's')
      .replace(/ /g, '_')
      .replace(/\./g, '')
      .replace('{', '')
      .replace('}', '')
      .replace('(', '')
      .replace(')', '')
      .replace('.', '')
      .replace('"', '')
      .replace(/[^a-zA-Z0-9_]/, '')
  }

  useEffect(() => {
    getToken()
  }, [])

  const parser = (file) => {
    let rows = {}
    console.log(file)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: (header) => {
        return cleanUpSpecialChars(header)
      },
      complete: (results) => {
        console.log(results)
        rows.data = results.data
        rows.errors = results.errors
        rows.meta = results.meta
        rows.columns = Object.keys(results.data[0]).length
      },
    })

    return rows
  }

  const beforeUpload = (file) => {
    console.log(file)
    const isType =
      file.type === 'application/vnd.ms-excel' || file.type === 'text/csv'

    if (!isType) {
      message.error('You can only upload .csv files')
      return false
    }

    const data = parser(file)

    setDataRows(data)
  }

  const onChange = (info) => {
    const nextState = {}
    switch (info.file.status) {
      case 'uploading':
        nextState.selectedFileList = [info.file]
        break
      case 'done':
        nextState.selectedFile = info.file
        nextState.selectedFileList = [info.file]
        nextState.selectedFileName = [info.file.name]
        break

      default:
        // error or removed
        nextState.selectedFile = null
        nextState.selectedFileList = []
    }
    setFile(nextState)
  }

  return (
    <div id="csv-preview">
      <div className="container">
        <div className="upload-wrapper">
          <Title level={4} style={{marginBottom: '20px'}}>
            Load your data
          </Title>
          <Upload
            fileList={file.selectedFileList}
            customRequest={dummyRequest}
            onChange={onChange}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <Button className="upload__button">
              <UploadOutlined /> Upload a file
            </Button>
          </Upload>
        </div>
        <ShowUploadedData data={dataRows} fileName={file.selectedFileName} />
      </div>
    </div>
  )
}

export default FileUpload
