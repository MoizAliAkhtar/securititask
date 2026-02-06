import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BarChartBox({ data, xKey }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartBox;
