import React, { useState, useEffect } from "react";
import SelectedTable from "./SelectedTable";
import SelectedTableColumns from "./SelectedTableColumns";
import { useAuth0 } from "../../react-auth0-spa";
import axios from "axios";
import ChartPreview from "./ChartPreview";
import ChartSelect from "./ChartSelect";
import ChartCustomization from "./ChartCustomization";
import ChartDownload from "./ChartDownload";

//ant d
import { Row } from "antd";
import ChartView from "./ChartView";

const CreateChart = () => {
  const [indicator, setIndicator] = useState();
  const [chartType, setChartType] = useState();
  const [chartNameField, setChartNameField] = useState();
  const [showChart, setShowChart] = useState(false);
  const [tableNames, setTableNames] = useState();
  const [selectedChart, setSelectedChart] = useState();
  const [multiIndicator, setMultiIndicator] = useState();

  const handleNames = (names) => {
    setTableNames(names);
  };

  const handlePreview = () => {
    setShowChart(true);
  };

  const handleChartType = (name) => {
    setChartType(name);
  };

  console.log(
    `indicator - ${indicator} multiIndicator - ${multiIndicator} chartNameField - ${chartNameField}`
  );

  return (
    <div className="section-wrapper">
      <section id="load-tables">
        <SelectedTable />
      </section>
      <section id="chart-select">
        <ChartSelect handleChartType={handleChartType} chartType={chartType} />
      </section>
      <section id="dimension-select">
        <SelectedTableColumns
          multiIndicator={multiIndicator}
          setMultiIndicator={setMultiIndicator}
          setIndicator={setIndicator}
          indicator={indicator}
          chartNameField={chartNameField}
          setChartNameField={setChartNameField}
          setChartType={setChartType}
          chartType={chartType}
          handlePreview={handlePreview}
          handleNames={handleNames}
        />
      </section>
      {(indicator && chartNameField) || (chartNameField && multiIndicator) ? (
        <>
          <section id="chart-customization">
            <div className="customization-container">
              <ChartView
                multiIndicator={multiIndicator}
                indicator={indicator}
                chartNameField={chartNameField}
                chartType={chartType}
                tableColumns={tableNames}
              />
            </div>
          </section>
          <section id="chart-download">
            <div className="download-container">
              <ChartDownload />
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default CreateChart;
