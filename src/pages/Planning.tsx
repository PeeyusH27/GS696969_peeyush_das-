import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import * as d3 from "d3";

const Planning = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Load and process data from CSV files
    Promise.all([
      d3.csv("/store.csv"),
      d3.csv("/skus.csv"),
      d3.csv("/planning.csv"),
      d3.csv("/calender.csv"),
      d3.csv("/calculations.csv"),
    ])
      .then(([stores, skus, planning, calendar, calculations]) => {
        // Parse SKU price and cost as numbers
        skus.forEach((sku) => {
          sku.Price = parseFloat(sku.Price.replace("$", "")) || 0;
          sku.Cost = parseFloat(sku.Cost.replace("$", "")) || 0;
        });

        // Create a cross join of Stores and SKUs
        let gridData = [];
        stores.forEach((store) => {
          skus.forEach((sku) => {
            gridData.push({
              Store: store.Label,
              SKU: sku.Label,
              Price: sku.Price,
              Cost: sku.Cost,
            });
          });
        });

        // Merge planning data into gridData
        planning.forEach((plan) => {
          let row = gridData.find(
            (r) => r.Store === plan.Store && r.SKU === plan.SKU
          );
          if (row) {
            row[plan.Week] = parseInt(plan["Sales Units"]) || 0;
          }
        });

        // Perform calculations using calculations.csv
        gridData.forEach((row) => {
          calendar.forEach((week) => {
            let weekField = week["Week"];
            let salesUnits = row[weekField] || 0;
            let price = row.Price || 0;
            let cost = row.Cost || 0;
            let salesDollars = salesUnits * price;
            let gmDollars = salesDollars - salesUnits * cost;
            let gmPercent = salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;

            row[`${weekField}_SalesDollars`] = salesDollars.toFixed(2);
            row[`${weekField}_GMDollars`] = gmDollars.toFixed(2);
            row[`${weekField}_GMPercent`] = gmPercent.toFixed(2);
          });
        });

        setData(gridData);

        // Create column definitions with Weeks grouped under Months
        let groupedColumns = [];
        let months = [...new Set(calendar.map((c) => c["Month Label"]))];
        months.forEach((month) => {
          let weeks = calendar.filter((c) => c["Month Label"] === month);
          groupedColumns.push({
            headerName: month,
            children: weeks.flatMap((week) => [
              {
                headerName: week["Week Label"],
                field: week["Week"],
                editable: true,
                valueFormatter: (params) => params.value || 0,
              },
              {
                headerName: "Sales $",
                field: `${week["Week"]}_SalesDollars`,
                valueFormatter: (params) => `$${params.value}`,
                editable: false,
              },
              {
                headerName: "GM $",
                field: `${week["Week"]}_GMDollars`,
                valueFormatter: (params) => `$${params.value}`,
                editable: false,
              },
              {
                headerName: "GM %",
                field: `${week["Week"]}_GMPercent`,
                valueFormatter: (params) => `${params.value}%`,
                editable: false,
                cellStyle: (params) => {
                  let value = parseFloat(params.value);
                  if (value >= 40) return { backgroundColor: "green", color: "white" };
                  if (value >= 10) return { backgroundColor: "yellow" };
                  if (value > 5) return { backgroundColor: "orange" };
                  return { backgroundColor: "red", color: "white" };
                },
              },
            ]),
          });
        });

        setColumns([
          { headerName: "Store", field: "Store", pinned: "left" },
          { headerName: "SKU", field: "SKU", pinned: "left" },
          ...groupedColumns,
        ]);
      })
      .catch((error) => console.error("Error loading CSVs:", error));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
      <AgGridReact
        columnDefs={columns}
        rowData={data}
        defaultColDef={{ flex: 1, resizable: true }}
        modules={[AllCommunityModule]}
      />
    </div>
  );
};

export default Planning;
