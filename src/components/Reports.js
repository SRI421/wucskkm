import React from "react";
import DataTable from "react-data-table-component";
// import "./Reports.css";

const Reports = () => {
  // Data for each table
  const salesData = [
    { date: "2025-01-10", region: "North", sales: "$12,400", growth: "+5%" },
    { date: "2025-01-11", region: "South", sales: "$9,300", growth: "+3%" },
    { date: "2025-01-12", region: "West", sales: "$11,500", growth: "+4%" },
    { date: "2025-01-13", region: "East", sales: "$10,200", growth: "+2%" },
  ];

  const userData = [
    { date: "2025-01-10", users: "120", platform: "Web", status: "Active" },
    { date: "2025-01-11", users: "140", platform: "iOS", status: "Active" },
    { date: "2025-01-12", users: "160", platform: "Android", status: "Active" },
    { date: "2025-01-13", users: "130", platform: "Web", status: "Active" },
  ];

  const ticketData = [
    { id: "#1010", date: "2025-04-01", subject: "Login Issue", status: "Open" },
    { id: "#1011", date: "2025-04-02", subject: "UI Bug", status: "Closed" },
    { id: "#1012", date: "2025-04-03", subject: "Report Missing", status: "Pending" },
    { id: "#1013", date: "2025-04-04", subject: "Performance", status: "Open" },
  ];

  const inventoryData = [
    { product: "Widget A", stock: "100", reserved: "20", available: "80" },
    { product: "Widget B", stock: "200", reserved: "50", available: "150" },
    { product: "Widget C", stock: "150", reserved: "30", available: "120" },
    { product: "Widget D", stock: "250", reserved: "60", available: "190" },
  ];

  // Columns for each table
  const salesColumns = [
    { name: "Date", selector: row => row.date, sortable: true },
    { name: "Region", selector: row => row.region },
    { name: "Sales", selector: row => row.sales },
    { name: "Growth", selector: row => row.growth },
  ];

  const userColumns = [
    { name: "Date", selector: row => row.date, sortable: true },
    { name: "Users", selector: row => row.users },
    { name: "Platform", selector: row => row.platform },
    { name: "Status", selector: row => row.status },
  ];

  const ticketColumns = [
    { name: "ID", selector: row => row.id },
    { name: "Date", selector: row => row.date, sortable: true },
    { name: "Subject", selector: row => row.subject },
    { name: "Status", selector: row => row.status },
  ];

  const inventoryColumns = [
    { name: "Product", selector: row => row.product },
    { name: "In Stock", selector: row => row.stock },
    { name: "Reserved", selector: row => row.reserved },
    { name: "Available", selector: row => row.available },
  ];

  const tableProps = {
    pagination: true,
    paginationPerPage: 4,
    noHeader: true,
    highlightOnHover: true,
    dense: true,
  };

  return (
    <div className="reports-flex">
      {/* Row 1 */}
      <div className="row vh-45 g-2 p-2">
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              Sales Report
            </div>
            <div className="card-body overflow-auto">
              <DataTable
                columns={salesColumns}
                data={salesData}
                {...tableProps}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-header bg-success text-white">
              User Registrations
            </div>
            <div className="card-body overflow-auto">
              <DataTable
                columns={userColumns}
                data={userData}
                {...tableProps}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="row vh-45 g-2 p-2">
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-header bg-warning text-dark">
              Support Tickets
            </div>
            <div className="card-body overflow-auto">
              <DataTable
                columns={ticketColumns}
                data={ticketData}
                {...tableProps}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 h-100">
          <div className="card h-100">
            <div className="card-header bg-info text-white">
              Inventory
            </div>
            <div className="card-body overflow-auto">
              <DataTable
                columns={inventoryColumns}
                data={inventoryData}
                {...tableProps}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
