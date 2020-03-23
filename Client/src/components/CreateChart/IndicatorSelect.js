import React from "react";

//ant d

import { Select } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const IndicatorSelect = props => {
  const { columns } = props;
  console.log(columns);

  return (
    <>
      <Select
        placeholder="Select indicator"
        onChange={handleChange}
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
        placeholder="Select order"
        onChange={handleChange}
        style={{ width: 150 }}
      >
        <Option value="ascending"> Ascending</Option>
        <Option value="descending"> Descending</Option>
      </Select>
    </>
  );
};

export default IndicatorSelect;
