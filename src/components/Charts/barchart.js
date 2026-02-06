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
    <ResponsiveContainer width="100%" height="100%">

      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        barCategoryGap="30%"
      >
        <XAxis
          dataKey={xKey}
          type="category"
          interval={0}
          angle={-10}
          textAnchor="end"
          height={60}
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          barSize={6}
          radius={[6, 6, 0, 0]}
          fill="#0d6efd"
        />

      </BarChart>

    </ResponsiveContainer>
  );
}

export default BarChartBox;
