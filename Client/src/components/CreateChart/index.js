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

//context
import { useSelectedTableValue } from "../../context";

const CreateChart = () => {
  const { selectedTable } = useSelectedTableValue();
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
        <div className="container">
          <SelectedTable />
        </div>
      </section>
      {selectedTable && (
        <section id="chart-select" className="dark">
          <div className="container">
            <ChartSelect
              handleChartType={handleChartType}
              chartType={chartType}
            />
          </div>
        </section>
      )}
      <section id="dimension-select">
        <div className="container">
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
        </div>
      </section>
      {(indicator && chartNameField) || (chartNameField && multiIndicator) ? (
        <>
          <section id="chart-customization" className="dark">
            <div className="container">
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
            <div className="container">
              <ChartDownload />
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default CreateChart;
