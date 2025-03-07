import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import * as d3 from "d3";
import { RiDeleteBin6Line } from "react-icons/ri";
import { setStores, addStore, deleteStore, updateStore } from "../Store/storeSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const Stores = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stores.stores);
  const lastLength = data.length;
  // Add a new row using Redux
  const handleAddRow = () => {
    const label = window.prompt("Enter Label:");
    if (!label) return;

    const city = window.prompt("Enter City:");
    if (!city) return;

    const state = window.prompt("Enter State:");
    if (!state) return;

    const newRow = {
      id: data.length + 1, // Ensuring unique ID
      Seq: lastLength + 1,
      Label: label,
      City: city,
      State: state,
    };

    dispatch(addStore(newRow));
  };

  // Delete a row using Redux
  const handleDeleteRow = (id: number) => {
    dispatch(deleteStore(id));
  };

  // Update store when a cell value changes
  const handleUpdateStore = (params: any) => {
    const updatedRow = {
      ...params.data,
      [params.colDef.field]: params.newValue,
    };
    dispatch(updateStore(updatedRow));
  };
  const columns: ColDef[] = [
    {
      headerName: "",
      field: "delete",
      width: 50,
      cellRenderer: (params) => (
        <RiDeleteBin6Line
          className="h-full cursor-pointer text-red-500"
          onClick={() => handleDeleteRow(params.data.id)}
        />
      ),
    },
    {
      headerName: "",
      field: "drag",
      rowDrag: true,
      width: 50,
    },
    { headerName: "Seq No.", field: "Seq", editable: false, width: 100 },
    {
      headerName: "Store",
      field: "Label",
      editable: true,
      onCellValueChanged: handleUpdateStore,
    },
    {
      headerName: "City",
      field: "City",
      editable: true,
      onCellValueChanged: handleUpdateStore,
    },
    {
      headerName: "State",
      field: "State",
      editable: true,
      onCellValueChanged: handleUpdateStore,
    },
  ];

  // Load CSV data on mount and store it in Redux
  useEffect(() => {
    d3.csv("/store.csv")
      .then((loadedData) => {
        const formattedData = loadedData.map((row, index) => ({
          id: index + 1, // Assigning a unique ID
          Seq: index + 1,
          Label: row.Label,
          City: row.City,
          State: row.State,
          rowDrag: true,
        }));
        dispatch(setStores(formattedData));
      })
      .catch((error) => {
        console.error("Error loading the CSV file:", error);
      });
  }, [dispatch]);

  

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-gray-100 flex-1 text-black ag-theme-alpine">
        <AgGridReact
          columnDefs={columns}
          rowData={data}
          modules={[AllCommunityModule]}
          rowDragManaged={true}
          animateRows={true}
          getRowId={(params) => params.data.id}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleAddRow}
          className="bg-red-300 font-medium py-2 px-4 rounded-lg"
        >
          ADD STORE
        </button>
      </div>
    </div>
  );
};

export default Stores;
