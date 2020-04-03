import React, {useState, useEffect} from 'react'
import SelectedTable from './SelectedTable'
import SelectedTableColumns from './SelectedTableColumns'
import {useAuth0} from '../../react-auth0-spa'
import axios from 'axios'
import ChartPreview from './ChartPreview'

const CreateChart = () => {
  const [indicator, setIndicator] = useState()
  const [chartType, setChartType] = useState()
  const [chartNameField, setChartNameField] = useState()
  const [showChart, setShowChart] = useState(false)
  const [tableNames, setTableNames] = useState()

  const handleNames = names => {
    setTableNames(names)
  }

  const handlePreview = () => {
    setShowChart(true)
  }

  return (
    <div>
      <SelectedTable />
      <SelectedTableColumns
        setIndicator={setIndicator}
        indicator={indicator}
        chartNameField={chartNameField}
        setChartNameField={setChartNameField}
        setChartType={setChartType}
        chartType={chartType}
        handlePreview={handlePreview}
        handleNames={handleNames}
      />
      {showChart && (
        <ChartPreview
          indicator={indicator}
          chartNameField={chartNameField}
          chartType={chartType}
          tableColumns={tableNames}
        />
      )}
    </div>
  )
}

export default CreateChart
