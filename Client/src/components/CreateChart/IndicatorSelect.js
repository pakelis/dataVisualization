import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//ant d
import { Select, Radio, Typography, Tag, Form } from "antd";

const { Option } = Select;
const { Text } = Typography;

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
    multiIndicator,
    setMultiIndicator,
  } = props;

  const [tagCheck, setTagCheck] = useState(() => {
    let number = 0;
    if (columns != null) {
      columns.map((row, i) => {
        if (row.data_type != "character varying") {
          number++;
        }
      });
      let arr = Array(number).fill(false);
      return { ...arr };
    }
  });

  console.log(`indicator - ${indicator}`);
  console.log(`multiIndicator - ${multiIndicator}`);

  const handleTagCheck = (index, value) => {
    setTagCheck({ ...tagCheck, [index]: !tagCheck[index] });
  };

  const handleChange = (value) => {
    setMultiIndicator(value);
  };

  useEffect(() => {
    if (chartType === "pieChart") {
      setMultiIndicator(() => {
        console.log(tagCheck);
        let arr = [];
        columns.map((row, i) => {
          if (row.data_type != "character varying") {
            arr.push(row.column_name);
          }
        });
        let checked = [];
        arr.map((val, index) => {
          // console.log(tagCheck[index], val);
          if (tagCheck[index] === true) {
            checked.unshift(val);
          }
        });
        return checked;
      });
    }
  }, [tagCheck, chartType]);

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

  const clearSelected = () => {
    setIndicator(undefined);
    setChartNameField(undefined);
  };

  return (
    <>
      <div className="selectInput">
        <Select
          placeholder={placeholder(2)}
          onChange={(value) => setChartNameField(value)}
          style={{ width: 150 }}
          value={chartNameField ? chartNameField : placeholder(2)}
        >
          {columns.map((row, i) =>
            row.data_type === "character varying" ||
            row.data_type === "date" ? (
              <Option value={row.column_name} key={i}>
                {row.column_name}
              </Option>
            ) : null
          )}
        </Select>
        {chartType != "pieChart" ? (
          <Select
            placeholder={placeholder(1)}
            onChange={(value) => setIndicator(value)}
            style={{ width: 200 }}
            value={indicator ? indicator : placeholder(1)}
          >
            {columns.map((row, i) =>
              // we check if our column data type is numeric or char
              row.data_type != "character varying" ? (
                <Option value={row.column_name} key={i}>
                  {row.column_name}
                </Option>
              ) : null
            )}
          </Select>
        ) : (
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Please Select Arcs"
            onChange={handleChange}
          >
            {columns.map((row, i) =>
              row.data_type != "character varying" ? (
                <Option value={row.column_name} key={i}>
                  {row.column_name}
                </Option>
              ) : null
            )}
          </Select>
        )}
      </div>
    </>
  );
};

export default IndicatorSelect;
