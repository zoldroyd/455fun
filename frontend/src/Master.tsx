import { useState, useEffect } from "react";
import CsvTable from "./CsvTable";

function Master() {
  const [selectedId, setSelectedId] = useState("");
  const [idOptions, setIdOptions] = useState<string[]>([]);

  interface InputChangeEvent {
    target: {
      value: string;
    };
  }

  useEffect(() => {
    fetch("/collaborative_recommendations.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n");
        const headers = lines[0].split(",");
        const id = headers.findIndex(h => h.trim() === "id");
        const ids = new Set<string>();
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",");
          if (cols[id]) {
            ids.add(cols[id].trim());
          }
        }
        setIdOptions(Array.from(ids));
      });
  }, []);

  const handleInputChange = (e: InputChangeEvent): void => {
    setSelectedId(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Welcome to our website!!</h1>
        <h2>
          Please enter an ID and we will give you some article recommendations
        </h2>
        <br />
        <select value={selectedId} onChange={handleInputChange}>
          <option value="">-- Select an ID --</option>
          {idOptions.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      {selectedId && (
        <div className="container mt-4">
          <div className="row text-center">
            <div className="col">
              <h3>Collaborative Filtering</h3>
              <p>List of recs for {selectedId}</p>
              <CsvTable selectedId={selectedId} />
            </div>
            <div className="col">
              <h3>Content Filtering</h3>
              <p>List of recs for {selectedId}</p>
            </div>
            <div className="col">
              <h3>Azure</h3>
              <p>List of recs for {selectedId}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Master;
