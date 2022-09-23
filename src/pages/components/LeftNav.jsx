import React from "react";
import "./leftNav.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteToken } from "../../redux/tokenActions";
import { deleteUser } from "../../redux/userActions";
import { resetDb } from "../../redux/dbAction";

function LeftNav() {
  const dispatch = useDispatch();

  async function resetDatabase() {
    await axios({
      method: "post",
      baseURL: `${process.env.REACT_APP_API_BASE}/reset`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
      },
    });
    dispatch(resetDb())
  }

  function logOut() {
    dispatch(deleteUser());
    dispatch(deleteToken());
  }

  return (
    <div className="leftNav">
      <div className="listElements navItems">
        <div className="section">
          <h2>Overview</h2>
        </div>
        <ul>
          <Link to="/">
            <li>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="DashboardIcon"
              >
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
              </svg>
              Dashboard
            </li>
          </Link>
        </ul>
        <div className="section second-section">
          <h2>Data CRUD</h2>
        </div>
        <ul>
          <Link to="/users">
            <li>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="SupervisorAccountIcon"
              >
                <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path>
              </svg>
              Users
            </li>
          </Link>
          <Link to="/products">
            <li>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="SellIcon"
              >
                <path d="m21.41 11.41-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5 7.33 8 6.5 8z"></path>
              </svg>
              Products
            </li>
          </Link>
          <Link to="/categories">
            <li>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="CategoryIcon"
              >
                <path d="m12 2-5.5 9h11z"></path>
                <circle cx="17.5" cy="17.5" r="4.5"></circle>
                <path d="M3 13.5h8v8H3z"></path>
              </svg>
              Categories
            </li>
          </Link>
          <Link to="/orders">
            <li>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ReceiptIcon"
              >
                <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path>
              </svg>
              Orders
            </li>
          </Link>
        </ul>
      </div>
      <div className="buttons">
        <button className="btn-reset my-2 p-2" onClick={() => resetDatabase()}>
          Reset database
        </button>
        <button className="btn-main my-2 p-2" onClick={() => logOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default LeftNav;
