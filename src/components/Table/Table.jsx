import React, { useState, useEffect } from "react";
import { StyledTable, Modal } from "./StyledTable";
import { Link, useHistory } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
            marginRight: "30px",
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
          <p style={{ color: "gray", fontSize: "10px" }}>{row.ID}</p>
        </Link>
      </div>
    </div>
  );

  const columnName = columns.find((col) => col === "Contact");

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return { color: "lightgreen", letterSpacing: "1.5px" };
    } else if (status === "Inactive") {
      return { color: "red", letterSpacing: "1.5px" };
    }
    return {};
  };

  const getDescriptionWrapperStyle = () => {
    return {
      maxHeight: "3.6em",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
    };
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div
        className="pagination"
        style={{ margin: "50px 30px", marginLeft: "42%" }}
      >
        {pages.map((page) => (
          <button
            style={{
              margin: "30px 30px",
              padding: "10px 15px",
              background: "#202020",
              border: "1px solid #b189d9",
              borderRadius: "10px",
              color: "white",
            }}
            key={page}
            className={`page-button ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {paginatedData.map((row, rowIndex) => (
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
                      style={
                        col === "Status" ? getStatusStyle(cellContent) : {}
                      }
                    >
                      {col === "Description" ? (
                        <div style={getDescriptionWrapperStyle()}>
                          {cellContent}
                        </div>
                      ) : col === "Contact" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LocalPhoneIcon
                            fontSize="small"
                            style={{ marginRight: "4px" }}
                          />
                          {cellContent}
                        </div>
                      ) : (
                        cellContent
                      )}
                    </td>
                  );
                }
              })}
              <td>
                <button
                  className="delete__button"
                  onClick={() => handleDeleteClick(row)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {data.length > itemsPerPage && renderPagination()}
      {showModal && (
        <Modal>
          <p style={{ letterSpacing: "1.5px" }}>
            Are you sure you want to delete this user?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button className="cancel__button" onClick={toggleModal}>
              <p style={{ letterSpacing: "1.5px" }}>Cancel</p>
            </button>
            <button className="confirm__delete" onClick={handleDeleteConfirm}>
              <p style={{ letterSpacing: "1.5px" }}>Delete</p>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Table;
