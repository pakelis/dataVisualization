import React, { useState } from "react";

//ant d

import { Select, Button } from "antd";

const { Option } = Select;

function handleChange(value, placeholder) {
  console.log(`selected ${value}`);
}

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
  } = props;
  // console.log(columns);

  //what palceholder we should render on different chart types
  const placeholder = (whichSelect) => {
    let placeholder = {};
    if (chartType === "barChart") {
      placeholder.firstSelect = "Y Axis";
      placeholder.secondSelect = "X Axis";
    } else if (chartType === "columnChart") {
      placeholder.firstSelect = "X Axis";
      placeholder.secondSelect = "Y Axis";
    } else if (chartType === "pieChart") {
      placeholder.firstSelect = "Arcs";
      placeholder.secondSelect = "Label";
    }
    return whichSelect === 1
      ? placeholder.firstSelect
      : placeholder.secondSelect;
  };

  return (
    <>
      <Select
        placeholder={placeholder(1)}
        onChange={(value) => setIndicator(value)}
        style={{ width: 200 }}
      >
        {columns.map((row, i) =>
          row.data_type != "character varying" ? (
            <Option value={row.column_name} key={i}>
              {row.column_name}
            </Option>
          ) : null
        )}
      </Select>
      <Select
        placeholder={placeholder(2)}
        onChange={(value) => setChartNameField(value)}
        style={{ width: 150 }}
      >
        {columns.map((row, i) =>
          row.data_type === "character varying" ? (
            <Option value={row.column_name} key={i}>
              {row.column_name}
            </Option>
          ) : null
        )}
      </Select>
      {indicator && chartNameField && chartType && (
        <Button onClick={handlePreview}>Chart preview</Button>
      )}
    </>
  );
};

export default IndicatorSelect;
