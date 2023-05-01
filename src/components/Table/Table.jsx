import React, { useState, useEffect } from "react";
import { StyledTable } from "./StyledTable";
import { Link, useHistory } from "react-router-dom";

const Table = ({
  initialData,
  onRowClick,
  onDelete,
  renderCustomColumns,
  onToggleAction,
  onEdit,
  route,
}) => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    toggleModal();
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedRow);
    setShowModal(false);
  };

  // Add a conditional check for data before accessing its properties
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]).filter(
    (col) => col !== "Password" && col !== "IMG" && col !== "ID"
  );

  const renderNameIdImageColumn = (row) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {row.IMG && (
        <img
          src={row.IMG}
          alt="Profile"
          style={{
            marginRight: "10px",
            width: "50px",
            borderRadius: "10px",
            border: "1px solid white",
          }}
        />
      )}
      <div>
        <Link
          to={`/users/${row.ID}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          {row.Name}
          <br />
          {row.ID}
        </Link>
      </div>
    </div>
  );

  const columnName = columns.find((col) => col === "Contact");

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ textAlign: "center" }}>
                {col === "Name" && route === "users" ? "Name" : col}
              </th>
            ))}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                if (route === "users" && col === "Name") {
                  return (
                    <td
                      key={colIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      <Link
                        to={`/users/${row.ID}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {renderNameIdImageColumn(row)}
                      </Link>
                    </td>
                  );
                } else if (col === "ID" || col === "Image") {
                  return null;
                } else {
                  const cellContent = row[col];
                  return (
                    <td
                      key={colIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {cellContent}
                    </td>
                  );
                }
              })}
              <td>
                <button onClick={() => handleDeleteClick(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: "white",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <p>Are you sure you want to delete this user?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button onClick={toggleModal}>Cancel</button>
            <button onClick={handleDeleteConfirm}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
