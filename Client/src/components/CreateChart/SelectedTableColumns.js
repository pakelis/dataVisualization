import React, {useState, useEffect} from 'react'
import {useAuth0} from '../../react-auth0-spa'
import {useSelectedTableValue} from '../../context'

//libs
import axios from 'axios'

//antd
import {List, Typography} from 'antd'
import IndicatorSelect from './IndicatorSelect'

const SelectedTableColumns = ({
  setIndicator,
  indicator,
  chartNameField,
  setChartNameField,
  chartType,
  setChartType,
  handlePreview,
  handleNames,
}) => {
  const [data, setData] = useState()
  const [selectedTableColumns, setSelectedTableColumns] = useState()
  const {getTokenSilently} = useAuth0()
  const {selectedTable} = useSelectedTableValue()

  const getTableColums = async () => {
    const token = await getTokenSilently()

    let res = axios
      .get('/admin/api/tablecolumns', {
        params: {
          tableName: selectedTable,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        let columnNames = res.data.map(row => row.column_name)
        handleNames(columnNames)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (selectedTable != null) {
      getTableColums()
    }
  }, [selectedTable])

  return (
    <>
      <List
        size="large"
        header={selectedTable !== '' ? <div>{selectedTable}</div> : null}
        bordered
        dataSource={data}
        renderItem={item => <List.Item>{item.column_name}</List.Item>}
        locale={{emptyText: "You haven't selected any table yet"}}
      ></List>
      {data && (
        <IndicatorSelect
          columns={data}
          setIndicator={setIndicator}
          indicator={indicator}
          chartNameField={chartNameField}
          setChartNameField={setChartNameField}
          setChartType={setChartType}
          chartType={chartType}
          handlePreview={handlePreview}
        />
      )}
    </>
  )
}

export default SelectedTableColumns
