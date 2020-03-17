import React, { useState, useEffect } from "react";
import SelectedTable from "./SelectedTable";
import SelectedTableColumns from "./SelectedTableColumns";
import { useAuth0 } from "../../react-auth0-spa";
import axios from "axios";

const CreateChart = () => {
  return (
    <div>
      <SelectedTable />
      <SelectedTableColumns />
    </div>
  );
};

export default CreateChart;
