import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function AreaChartBox({ data, xKey }) {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Area
                        dataKey="value"
                        stroke="#f97316"
                        fill="#fed7aa"
                        strokeWidth={2}
                    />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AreaChartBox;
