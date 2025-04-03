import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface MatrixTableProps {
  selectedId: string;
  csvPath: string;
}

const MatrixTable: React.FC<MatrixTableProps> = ({ selectedId, csvPath }) => {
  const [topRecs, setTopRecs] = useState<string[]>([]);

  useEffect(() => {
    fetch(csvPath)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse<string[]>(csvText, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            const rows = result.data as string[][];
            const headers = rows[0].slice(1); // Skip the first cell

            const targetRow = rows.find((row) => row[0].trim() === selectedId);
            if (!targetRow) return;

            const scores = targetRow.slice(1).map((val, idx) => ({
              id: headers[idx],
              score: parseFloat(val),
            }));

            const topIds = scores
              .filter((entry) => entry.id !== selectedId) // exclude self
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((entry) => entry.id);

            setTopRecs(topIds);
          },
        });
      });
  }, [selectedId, csvPath]);

  if (topRecs.length === 0) return <div>Loading Content Filtering...</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            {topRecs.map((_id, idx) => (
              <th key={idx}>Rec {idx + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedId}</td>
            {topRecs.map((id, idx) => (
              <td key={idx}>{id}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MatrixTable;
