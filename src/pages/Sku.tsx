import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as d3 from 'd3';
import { RiDeleteBin6Line } from 'react-icons/ri';

ModuleRegistry.registerModules([AllCommunityModule]);

// Define a TypeScript interface for SKUs
interface SkuType {
  Label: string;
  Price: string;
  Cost: string;
}

const Sku = () => {
  const [data, setData] = useState<SkuType[]>([]);

  useEffect(() => {
    d3.csv('/skus.csv')
      .then((loadedData) => {
        setData(loadedData as unknown as SkuType[]);
      })
      .catch((error) => {
        console.error('Error loading the CSV file:', error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        headerName: '',
        field: 'delete',
        width: 50,
        cellRenderer: () => <RiDeleteBin6Line className="h-full cursor-pointer" />,
      },
      { headerName: 'SKU', field: 'Label', editable: true },
      { headerName: 'Price', field: 'Price', editable: true },
      { headerName: 'Cost', field: 'Cost', editable: true },
    ],
    []
  );

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="ag-theme-alpine flex-1">
        <AgGridReact columnDefs={columns} rowData={data}  />
      </div>
      <button className="bg-red-300 font-medium py-2 px-4 w-fit rounded-lg">NEW SKU</button>
    </div>
  );
};

export default Sku;
