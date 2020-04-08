import React, { useState, useEffect } from "react";
import SelectedTable from "./SelectedTable";
import SelectedTableColumns from "./SelectedTableColumns";
import { useAuth0 } from "../../react-auth0-spa";
import axios from "axios";
import ChartPreview from "./ChartPreview";
import ChartSelect from "./ChartSelect";
import ChartCustomization from "./ChartCustomization";

//ant d
import { Row } from "antd";

const CreateChart = () => {
  const [indicator, setIndicator] = useState();
  const [chartType, setChartType] = useState();
  const [chartNameField, setChartNameField] = useState();
  const [showChart, setShowChart] = useState(false);
  const [tableNames, setTableNames] = useState();
  const [selectedChart, setSelectedChart] = useState();

  const handleNames = (names) => {
    setTableNames(names);
  };

  const handlePreview = () => {
    setShowChart(true);
  };

  const handleChartType = (name) => {
    setChartType(name);
  };

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
          setIndicator={setIndicator}
          indicator={indicator}
          chartNameField={chartNameField}
          setChartNameField={setChartNameField}
          setChartType={setChartType}
          chartType={chartType}
          handlePreview={handlePreview}
          handleNames={handleNames}
        />
        <section id="chart-customization">
          {showChart && (
            <div className="customization-container">
              <Row>
                <ChartCustomization />
                <ChartPreview
                  indicator={indicator}
                  chartNameField={chartNameField}
                  chartType={chartType}
                  tableColumns={tableNames}
                />
              </Row>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default CreateChart;
