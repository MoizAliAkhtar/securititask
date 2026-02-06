import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  FaSlack,
  FaMicrosoft,
  FaAws,
  FaGoogle,
  FaEnvelope,
} from "react-icons/fa";

function PieChartBox({ data }) {
  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f97316",
    "#a855f7",
    "#ef4444",
  ];

  // Map platform to icons
  const iconMap = {
    Slack: <FaSlack color="#3b82f6" />,
    Teams: <FaMicrosoft color="#22c55e" />,
    AWS: <FaAws color="#f97316" />,
    Google: <FaGoogle color="#a855f7" />,
    Gmail: <FaEnvelope color="#ef4444" />,
  };

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="d-flex h-100">

      {/* Chart */}
      <div style={{ width: "60%", height: "100%" }}>
        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `${value} queries`}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + Icons */}
      <div className="ps-3 d-flex flex-column justify-content-center">

        {data.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center mb-2"
          >

            {/* Icon */}
            <span className="me-2 fs-5">
              {iconMap[item.name]}
            </span>

            {/* Color dot */}
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor:
                  COLORS[index % COLORS.length],
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
            ></span>

            {/* Label */}
            <span className="me-auto">
              {item.name}
            </span>

            {/* Value */}
            <strong>{item.value}</strong>

          </div>
        ))}

      </div>
    </div>
  );
}

export default PieChartBox;
