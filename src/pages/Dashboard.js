import React, { useEffect, useState } from "react";
import Header from "../components/Header/header";
import PieChartBox from "../components/Charts/piechart";
import LineChartBox from "../components/Charts/linechart";
import { fetchDashboardData } from "../services/api";
import BarChartBox from "../components/Charts/barchart";
import AreaChartBox from "../components/Charts/areachart";
import "./dashboard.css";
import {
    FaChartPie,
    FaChartLine,
    FaFileAlt,
    FaBell,
    FaPlug,
    FaCog,
    FaQuestionCircle,
    FaUser,
} from "react-icons/fa";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [range, setRange] = useState(30);
    const [refreshing, setRefreshing] = useState({
        users: false,
        logins: false,
        queries: false,
        response: false,
        firewall: false,
    });

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
        const now = new Date("2024-01-30");
        return data.filter((item) => {
            const itemDate = new Date(item.date);
            const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
            return diff <= days;
        });
    };

    // Function to refresh a specific chart
    const refreshChart = async (chartName) => {
        setRefreshing(prev => ({ ...prev, [chartName]: true }));
        try {
            const result = await fetchDashboardData();
            setData(result);
        } catch (err) {
            console.error(`Failed to refresh ${chartName} chart.`);
        } finally {
            setRefreshing(prev => ({ ...prev, [chartName]: false }));
        }
    };

    // Small refresh icon component
    const RefreshIcon = ({ onClick, isLoading }) => (
        <button
            className="btn btn-sm btn-outline-primary ms-auto"
            style={{ fontSize: "0.8rem" }}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
            ) : (
                <i className="bi bi-arrow-clockwise"></i>
            )}
        </button>
    );

    // Calculate total from chart data
    const getTotal = (arr) => {
        if (!arr || arr.length === 0) return 0;

        return arr.reduce((sum, item) => sum + item.value, 0);
    };

    const getAverage = (arr) => {
        if (!arr || arr.length === 0) return 0;

        return (
            arr.reduce((sum, item) => sum + item.value, 0) /
            arr.length
        ).toFixed(1);
    };

    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <aside className="sidebar">

                {/* Logo */}
                <div className="sidebar-logo">
                    A
                </div>

                {/* Menu */}
                <ul className="sidebar-menu">

                    <li className="sidebar-item active">
                        <FaChartPie />
                        <span>Dashboard</span>
                    </li>

                    <li className="sidebar-item">
                        <FaChartLine />
                        <span>Analytics</span>
                    </li>

                    <li className="sidebar-item">
                        <FaFileAlt />
                        <span>Reports</span>
                    </li>

                    <li className="sidebar-item">
                        <FaBell />
                        <span>Alerts</span>
                    </li>

                    <li className="sidebar-item">
                        <FaPlug />
                        <span>Integrations</span>
                    </li>

                </ul>

                {/* Bottom */}
                <div className="sidebar-bottom">

                    <div className="sidebar-item">
                        <FaCog />
                        <span>Settings</span>
                    </div>

                    <div className="sidebar-item">
                        <FaUser />
                        <span>Profile</span>
                    </div>

                </div>

            </aside>

            {/* Main content */}
            <div className="flex-grow-1 p-4 bg-light">
                <Header onRefresh={loadData} range={range} onRangeChange={setRange} />

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

                <div className="container-fluid mt-3">
                    <div className="row g-4">

                        {/* Users */}
                        <div className="col-md-6">
                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card"
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div>
                                        <h6 className="mb-0">Users</h6>

                                        <small className="text-muted">
                                            Total:{" "}
                                            {data &&
                                                getTotal(filterByDays(data.users, range))}
                                        </small>
                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("users")}
                                        isLoading={refreshing.users}
                                    />

                                </div>
                                <div style={{ height: "200px" }}>
                                    {data && <LineChartBox data={filterByDays(data.users, range)} xKey="date" />}
                                </div>
                            </div>
                        </div>

                        {/* Logins */}
                        <div className="col-md-6">
                            <div className="card p-3 shadow-sm d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div>
                                        <h6 className="mb-0">Logins</h6>

                                        <small className="text-muted">
                                            Total:{" "}
                                            {data &&
                                                getTotal(filterByDays(data.logins, range))}
                                        </small>
                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("logins")}
                                        isLoading={refreshing.logins}
                                    />

                                </div>

                                <div style={{ height: "200px" }}>
                                    {data && (
                                        <BarChartBox
                                            data={filterByDays(data.logins, range)}
                                            xKey="date"
                                        />
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* Queries */}
                        <div className="col-md-6 offset-md-3">
                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card"
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div>
                                        <h6 className="mb-0">Queries</h6>

                                        <small className="text-muted">
                                            Total:{" "}
                                            {data && getTotal(data.queries)}
                                        </small>
                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("queries")}
                                        isLoading={refreshing.queries}
                                    />

                                </div>

                                <div style={{ height: "240px" }}>
                                    {data && <PieChartBox data={data.queries} />}

                                </div>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="col-md-6">
                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card"
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div>
                                        <h6 className="mb-0">Response Time</h6>

                                        <small className="text-muted">
                                            Avg:{" "}
                                            {data && getAverage(data.response)} ms
                                        </small>
                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("response")}
                                        isLoading={refreshing.response}
                                    />

                                </div>

                                <div style={{ height: "250px" }}>
                                    {data && (
                                        <AreaChartBox
                                            data={data.response}
                                            xKey="date"
                                        />
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* Firewall Calls */}
                        <div className="col-md-6">
                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card"
                            >
                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div>
                                        <h6 className="mb-0">Firewall Calls</h6>

                                        <small className="text-muted">
                                            Total:{" "}
                                            {data && getTotal(data.firewall)}
                                        </small>
                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("firewall")}
                                        isLoading={refreshing.firewall}
                                    />

                                </div>

                                <div style={{ height: "250px" }}>
                                    {data && <LineChartBox data={data.firewall} xKey="day" />}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
