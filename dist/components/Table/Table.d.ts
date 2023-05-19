import React from "react";
export interface TableRow {
    [key: string]: any;
    ID: string;
    Email: string;
    Name?: string;
    "Room Name"?: "Deluxe A-" | "Deluxe B-" | "Deluxe C-" | "Deluxe D-";
    Number?: string;
    Status?: string;
    Description?: string;
    Contact?: string;
    IMG: string;
}
interface TableProps {
    initialData: TableRow[];
    onRowClick?: (row: TableRow) => void;
    onDelete: (row: TableRow) => void;
    route?: string;
}
declare const Table: React.FC<TableProps>;
export default Table;
