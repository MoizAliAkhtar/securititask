import React from "react";
import Header from "../components/Header/header";
import PieChartBox from "../components/Charts/piechart";
import LineChartBox from "../components/Charts/linechart";
import { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/api";

import {
    usersData,
    loginData,
    queryData,
    responseTimeData,
    firewallData,
} from "../data/mockdata";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [range, setRange] = useState(30);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await fetchDashboardData();
            setData(result);

        } catch (err) {
            setError("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filterByDays = (data, days) => {
        const now = new Date("2024-01-30"); // fixed for demo

        return data.filter((item) => {
            const itemDate = new Date(item.date);
            const diff =
                (now - itemDate) / (1000 * 60 * 60 * 24);

            return diff <= days;
        });
    };


    return (
        <div className="container-fluid p-4 bg-light min-vh-100">
            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary"></div>
                    <p>Loading dashboard...</p>
                </div>
            )}

            {error && (
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            )}


            {/* Page Header */}
            <Header
                onRefresh={loadData}
                range={range}
                onRangeChange={setRange}
            />


            {/* Dashboard Grid */}
            <div className="row g-4 mt-2">

                <div className="col-md-6 col-lg-4">
                    <div className="card p-3 shadow-sm">
                        <h6>Users</h6>
                        <div style={{ height: "200px" }}>{data && (
                            <LineChartBox
                                data={filterByDays(data.users, range)}
                                xKey="date"
                            />
                        )}


                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card p-3 shadow-sm">
                        <h6>Logins</h6>
                        <div style={{ height: "200px" }}>{data && (
                            <LineChartBox
                                data={filterByDays(data.logins, range)}
                                xKey="date"
                            />
                        )}

                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card p-3 shadow-sm">
                        <h6>Queries</h6>
                        <div style={{ height: "200px" }}>{data && <LineChartBox data={data.queries} xKey="name" />}

                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-6">
                    <div className="card p-3 shadow-sm">
                        <h6>Response Time</h6>
                        <div style={{ height: "250px" }}>{data && <LineChartBox data={data.response} xKey="date" />}

                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-6">
                    <div className="card p-3 shadow-sm">
                        <h6>Firewall Calls</h6>
                        <div style={{ height: "250px" }}>{data && <LineChartBox data={data.firewall} xKey="day" />}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
