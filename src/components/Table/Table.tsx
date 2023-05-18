import React, { useState, useEffect } from "react";
import { StyledTable, Modal } from "./StyledTable";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

interface TableRow {
  [key: string]: any; // this allows for flexibility with the data properties, modify as per your data structure
  ID: string;
  IMG?: string;
  Name?: string;
  "Room Name": "Deluxe A-" | "Deluxe B-" | "Deluxe C-" | "Deluxe D-";
  Number?: string;
  Guest?: string;
  Offer: number;
  Rate?: number;
  Status?: string;
  Description?: string;
  Contact?: string;
  Action?: string;
}

interface TableProps {
  initialData: TableRow[];
  onRowClick?: (row: TableRow) => void;
  onDelete: (row: TableRow) => void;
  route?: string;
}

// interface IRow {
//   ID: string;
//   Name?: string;
//   IMG?: string;
//   "Room Name": "Deluxe A-" | "Deluxe B-" | "Deluxe C-" | "Deluxe D-";
//   Number: string;
//   Guest: string | undefined;
//   Offer: number;
//   Action: "Publish" | "Archive";
//   // ... include all other properties of a row object here
// }

const Table: React.FC<TableProps> = ({
  initialData,
  onRowClick,
  onDelete,
  route,
}) => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteClick = (row: TableRow) => {
    setSelectedRow(row);
    toggleModal();
  };

  const handleDeleteConfirm = () => {
    if (selectedRow !== null) {
      onDelete(selectedRow);
      setShowModal(false);
    }
  };

  // Add a conditional check for data before accessing its properties
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]).filter(
    (col) =>
      col !== "Password" &&
      col !== "IMG" &&
      col !== "ID" &&
      col !== "UserIMG" &&
      col !== "price" &&
      col !== "facilities" &&
      col !== "Number" &&
      col !== "Stars" && // Add this line
      !(route === "contacts" && (col === "Telephone" || col === "Mail"))
  );

  const renderNameIdImageColumn = (row: TableRow) => (
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

  const renderRoomIdImageColumn = (row: TableRow) => (
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
          to={`/rooms/${row.ID}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <p style={{ color: "white" }}>
            {row["Room Name"]}
            {row.Number}
          </p>

          <br />
          <p style={{ color: "gray", fontSize: "10px" }}>{row.ID}</p>
        </Link>
      </div>
    </div>
  );

  const renderGuestColumn = (row: TableRow) => (
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
          to={`/bookings/${row.ID}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          {row.Guest}
          <br />
          <p style={{ color: "gray", fontSize: "10px" }}>{row.ID}</p>
        </Link>
      </div>
    </div>
  );

  const renderRateColumn = (row: TableRow) => {
    const roomMap = {
      "Deluxe A-": { bedType: "Single", price: 100 },
      "Deluxe B-": { bedType: "Double", price: 200 },
      "Deluxe C-": { bedType: "Double Deluxe", price: 300 },
      "Deluxe D-": { bedType: "Suite", price: 400 },
    };

    const roomInfo = roomMap[row["Room Name"]];
    if (!roomInfo) {
      throw new Error(`No room found for name "${row["Room Name"]}"`);
    }
    const originalRate = roomInfo.price;
    const offerPercentage: number = row.Offer;
    const discountedRate: number = originalRate * (1 - offerPercentage / 100);

    return (
      <div>
        {offerPercentage > 0 ? (
          <>
            <span
              style={{
                textDecoration: "line-through",
                marginRight: "10px",
                color: "gray",
              }}
            >
              ${originalRate.toFixed(2)} / night
            </span>
            <span>${discountedRate.toFixed(2)} / night</span>
          </>
        ) : (
          <span>${originalRate.toFixed(2)} / night</span>
        )}
      </div>
    );
  };

  const renderOfferColumn = (row: TableRow) => {
    return row.Offer > 0 ? <div>{row.Offer}%</div> : <div></div>;
  };

  const getStatusStyle = (status: string) => {
    if (status === "Active") {
      return { color: "lightgreen", letterSpacing: "1.5px" };
    } else if (status === "Inactive") {
      return { color: "red", letterSpacing: "1.5px" };
    } else if (status === "Available") {
      return { color: "lightgreen", letterSpacing: "1.5px" };
    } else if (status === "Booked") {
      return { color: "red", letterSpacing: "1.5px" };
    } else if (status === "Check In") {
      return { color: "lightgreen", letterSpacing: "1.5px" };
    } else if (status === "Check Out") {
      return { color: "red", letterSpacing: "1.5px" };
    } else if (status === "Progress") {
      return { color: "yellow", letterSpacing: "1.5px" };
    }
    return {};
  };

  const getDescriptionWrapperStyle = (): React.CSSProperties => {
    return {
      maxHeight: "3.6em",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
    };
  };

  const handlePageChange = (newPage: number) => {
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
              border: "2px solid #424242",
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

  const getActionStyle = (action: string) => {
    if (action === "Archive") {
      return { color: "red", letterSpacing: "1.5px" };
    } else {
      return { color: "lightgreen", letterSpacing: "1.5px" };
    }
  };

  const handleToggleAction = (event: React.MouseEvent, row: TableRow) => {
    event.stopPropagation();
    const updatedRow = {
      ...row,
      Action: row.Action === "Publish" ? "Archive" : "Publish",
    };
    setData(
      data.map((item) => (item.ID === updatedRow.ID ? updatedRow : item))
    );
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ textAlign: "center" }}>
                {col}
              </th>
            ))}
            {route !== "contacts" && <th>Delete</th>}
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
                } else if (route === "bookings" && col === "Guest") {
                  return (
                    <td
                      key={colIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {renderGuestColumn(row)}
                    </td>
                  );
                } else if (route === "contacts" && col === "Guest") {
                  return (
                    <td
                      key={colIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {renderGuestColumn(row)}
                    </td>
                  );
                } else if (col === "ID" || col === "Image") {
                  return null;
                } else if (col === "Room Name" && route === "rooms") {
                  return (
                    <td
                      key={colIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      <Link
                        to={`/rooms/${row.ID}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {renderRoomIdImageColumn(row)}
                      </Link>
                    </td>
                  );
                } else if (col === "Rate" && route === "rooms") {
                  return <td key={colIndex}>{renderRateColumn(row)}</td>;
                } else if (col === "Offer" && route === "rooms") {
                  return <td key={colIndex}>{renderOfferColumn(row)}</td>;
                } else {
                  const cellContent = row[col];
                  return (
                    <td
                      key={colIndex}
                      onClick={
                        onRowClick && route !== "contacts"
                          ? () => onRowClick(row)
                          : undefined
                      }
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
                      ) : col === "Action" ? (
                        <button
                          style={{
                            ...getActionStyle(cellContent),
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={(event) => handleToggleAction(event, row)}
                        >
                          {cellContent}
                        </button>
                      ) : (
                        cellContent
                      )}
                    </td>
                  );
                }
              })}
              {route !== "contacts" && (
                <td>
                  <button
                    className="delete__button"
                    onClick={() => handleDeleteClick(row)}
                  >
                    Delete
                  </button>
                </td>
              )}
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
