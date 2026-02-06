import React from "react";
import { FaSyncAlt, FaCalendarAlt } from "react-icons/fa";

function Header({ onRefresh, range, onRangeChange }) {
  return (
    <div className="dashboard-header">

      {/* Left Section */}
      <div>
        <h4 className="mb-0 fw-bold">Analytics Dashboard</h4>
        <small className="text-muted" style={{marginLeft:"-53px"}}>
          Monitor system performance
        </small>
      </div>

      {/* Right Section */}
      <div className="header-controls">

        {/* Date Range */}
        <div className="range-select">

          <FaCalendarAlt className="me-2 text-primary" />

          <span className="me-2 fw-semibold">
            Time Range:
          </span>

          <select
            value={range}
            onChange={(e) => onRangeChange(e.target.value)}
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>

        </div>

        {/* Refresh Button */}
        <button
          className="refresh-btn"
          onClick={onRefresh}
        >
          <FaSyncAlt className="me-2" />
          Refresh Data
        </button>

      </div>

    </div>
  );
}

export default Header;
