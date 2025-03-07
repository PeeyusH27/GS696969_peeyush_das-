import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";
import * as d3 from "d3";

const Chart = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Promise.all([
      d3.csv("/store.csv"),
      d3.csv("/skus.csv"),
      d3.csv("/calculations.csv"),
    ])
      .then(([storeData, _, calculations]) => {
        if (storeData.length > 0) {
          setStores(storeData.map((store) => store.Label));
          processChartData(calculations, storeData[0].Label);
          setSelectedStore(storeData[0].Label);
        }
      })
      .catch((error) => console.error("Error loading CSVs:", error));
  }, []);

  const processChartData = (calculations, storeLabel) => {
    const filteredData = calculations.filter((row) => row.Store === storeLabel);
    
    let weekData = {};
    filteredData.forEach((row) => {
      const week = row.Week;
      const salesDollars = parseFloat(row["Sales Dollars"]) || 0;
      const gmDollars = parseFloat(row["GM Dollars"]) || 0;
      
      if (!weekData[week]) {
        weekData[week] = { week, salesDollars: 0, gmDollars: 0 };
      }
      
      weekData[week].salesDollars += salesDollars;
      weekData[week].gmDollars += gmDollars;
    });

    let sortedChartData = Object.values(weekData)
      .map((entry) => ({
        week: entry.week,
        gmDollars: entry.gmDollars,
        gmPercent: entry.salesDollars ? (entry.gmDollars / entry.salesDollars) * 100 : 0,
      }))
      .sort((a, b) => a.week.localeCompare(b.week)); // Ensures weeks are sorted

    setChartData(sortedChartData);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
    d3.csv("/calculations.csv").then((calculations) => {
      processChartData(calculations, event.target.value);
    });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-gray-100 flex-1 p-2 text-black ag-theme-alpine">
      <label className="mr-2">Select Store:</label>
      <select value={selectedStore} onChange={handleStoreChange} className="border p-1">
        {stores.map((store) => (
          <option key={store} value={store}>{store}</option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: "GM %", angle: -90, position: "insideRight" }} />
          <Tooltip />
          <Legend />

          <Bar yAxisId="left" dataKey="gmDollars" name="GM Dollars" fill="#82ca9d" />
          <Line yAxisId="right" type="monotone" dataKey="gmPercent" name="GM %" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <div className="flex gap-4">
        <button
          // onClick={addRow}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg"
        >
          ADD ROW
        </button>
      </div>
    </div>
  );
};

export default Chart;
