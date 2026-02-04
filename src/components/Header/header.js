import React from "react";

function Header({ onRefresh, range, onRangeChange }) {

  return (
    <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm">

      <div>
        <h4 className="mb-0">Analytics</h4>
        <small className="text-muted">Last 30 Days</small>
      </div>

      <div className="d-flex gap-2">

        <select
          className="form-select"
          value={range}
          onChange={(e) => onRangeChange(e.target.value)}
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>


        <button className="btn btn-primary" onClick={onRefresh}>
          Refresh
        </button>


      </div>

    </div>
  );
}

export default Header;
