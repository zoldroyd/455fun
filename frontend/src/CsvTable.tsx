import React, { useEffect, useState } from "react";
import Papa from "papaparse";

type RowData = {
  [key: string]: string;
};

interface CsvTableProps {
  selectedId: string;
}

const CsvTable: React.FC<CsvTableProps> = ({ selectedId }) => {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    fetch("/collaborative_recommendations.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<RowData>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      });
  }, []);

  if (data.length === 0) return <div>Loading CSV...</div>;

  const headers = Object.keys(data[0]);
  const filteredData = selectedId
    ? data.filter((row) => row["id"] === selectedId)
    : data;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx}>
              {headers.map((head) => (
                <td key={head}>{row[head]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;