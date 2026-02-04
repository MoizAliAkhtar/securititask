import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PieChartBox({ data }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartBox;
