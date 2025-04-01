import { useState } from "react";

function Master() {
  const [selectedId, setSelectedId] = useState("");

  interface InputChangeEvent {
    target: {
      value: string;
    };
  }

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

        <input
          type="text"
          placeholder="Enter ID"
          value={selectedId}
          onChange={handleInputChange}
        />
      </div>

      <div className="container mt-4">
        <div className="row text-center">
          <div className="col">
            <h3>Collaborative Filtering</h3>
            <p>List of recs for {selectedId}</p>
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
    </>
  );
}

export default Master;
