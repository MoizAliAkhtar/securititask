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
        if (!data || data.length === 0) return [];

        const now = new Date();

        return data.filter((item) => {

            let itemDate;

            // Case 1: Full date (2024-01-01)
            if (/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
                itemDate = new Date(item.date);
            }

            // Case 2: Month-Year (Jan-24)
            else if (/^[A-Za-z]{3}-\d{2}$/.test(item.date)) {
                const [mon, yr] = item.date.split("-");
                itemDate = new Date(`20${yr}-${mon}-01`);
            }

            // Case 3: Week / Day / Other → Don't filter
            else {
                return true;
            }

            if (isNaN(itemDate)) return true;

            const diff = (now - itemDate) / (1000 * 60 * 60 * 24);

            return diff <= days;
        });
    };


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

    const getActiveInactiveUsers = (arr) => {
        if (!arr || arr.length === 0)
            return { active: 0, inactive: 0 };

        const total = getTotal(arr);

        const active = Math.floor(total * 0.7);
        const inactive = total - active;

        return { total, active, inactive };
    };

    return (
        <div className="d-flex min-vh-100">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="sidebar-logo">A</div>

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

            {/* Main */}
            <div className="flex-grow-1 p-4 bg-light">

                <Header
                    onRefresh={loadData}
                    range={range}
                    onRangeChange={setRange}
                />

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
                        <div className="col-md-6" style={{ width: "30%" }}>
                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card">

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div className="card-header-block">

                                        <div className="card-title-wrapper">
                                            <span className="users-indicator"></span>
                                            <h6 className="users-title mb-0">Users</h6>
                                        </div>

                                        <small className="users-subtext" style={{ marginLeft: "10px" }}>
                                           Total: {data && getTotal(data.users)}

                                        </small>

                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("users")}
                                        isLoading={refreshing.users}
                                    />
                                </div>

                                {data && (() => {
                                    const stats = getActiveInactiveUsers(data.users);


                                    return (
                                        <div className="user-stats">

                                            <div className="stat-box">
                                                <h2 className="stat-label">Total Users</h2>
                                                <h4 className="stat-value text-black">
                                                    {stats.total}
                                                </h4>
                                            </div>

                                            <div className="stat-box">
                                                <p className="stat-label">Active Users</p>
                                                <h4 className="stat-value text-black">
                                                    {stats.active}
                                                </h4>
                                            </div>

                                            <div className="stat-box">
                                                <p className="stat-label">Inactive Users</p>
                                                <h4 className="stat-value text-black">
                                                    {stats.inactive}
                                                </h4>
                                            </div>

                                        </div>
                                    );
                                })()}

                            </div>
                        </div>


                        {/* Logins */}
                        <div className="col-md-6" style={{ width: "70%" }}>

                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card">

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div className="card-header-block">

                                        <div className="card-title-wrapper">
                                            <span className="indicator indicator-blue"></span>
                                            <h6 className="card-title-bold mb-0">Logins</h6>
                                        </div>

                                        <small className="card-subtext" style={{ marginLeft: "10px" }}>
                                            Total: {data && getTotal(filterByDays(data.logins, range))}
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
                        <div className="col-md-6">

                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card">

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div className="card-header-block">

                                        <div className="card-title-wrapper">
                                            <span className="indicator indicator-purple"></span>
                                            <h6 className="card-title-bold mb-0">Queries</h6>
                                        </div>

                                        <small className="card-subtext" style={{ marginLeft: "10px" }}>
                                            Total: {data && getTotal(filterByDays(data.queries, range))}
                                        </small>

                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("queries")}
                                        isLoading={refreshing.queries}
                                    />
                                </div>

                                <div style={{ height: "240px" }}>
                                    {data && (
                                        <PieChartBox
                                            data={filterByDays(data.queries, range)}
                                        />
                                    )}
                                </div>

                            </div>
                        </div>


                        {/* Firewall */}
                        <div className="col-md-6">

                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card">

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div className="card-header-block">

                                        <div className="card-title-wrapper">
                                            <span className="indicator indicator-orange"></span>
                                            <h6 className="card-title-bold mb-0">Firewall Calls</h6>
                                        </div>

                                        <small className="card-subtext" style={{ marginLeft: "-10px" }}>
                                            Total: {data && getTotal(filterByDays(data.firewall, range))}
                                        </small>

                                    </div>

                                    <RefreshIcon
                                        onClick={() => refreshChart("firewall")}
                                        isLoading={refreshing.firewall}
                                    />

                                </div>

                                <div style={{ height: "240px" }}>
                                    {data && (
                                        <LineChartBox
                                            data={filterByDays(data.firewall, range)}
                                            xKey="day"
                                        />
                                    )}
                                </div>

                            </div>
                        </div>


                        {/* Response */}
                        <div className="col-md-6" style={{ width: "100%" }}>

                            <div className="card p-3 shadow-sm d-flex flex-column dashboard-card">

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div className="card-header-block">

                                        <div className="card-title-wrapper">
                                            <span className="indicator indicator-teal"></span>
                                            <h6 className="card-title-bold mb-0">Response Time</h6>
                                        </div>

                                        <small className="card-subtext" style={{ marginLeft: "-15px" }}>
                                            Avg: {data && getAverage(filterByDays(data.response, range))} ms
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
                                            data={filterByDays(data.response, range)}
                                            xKey="date"
                                        />
                                    )}
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
