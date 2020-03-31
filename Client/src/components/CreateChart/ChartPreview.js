import React, { useState, useEffect } from "react";

import { useSelectedTableValue } from "../../context";

const ChartPreview = ({ indicator, order, chartType, tableNames }) => {
  const { selectedTable } = useSelectedTableValue();

  return <div>Chart preview</div>;
};

export default ChartPreview;
