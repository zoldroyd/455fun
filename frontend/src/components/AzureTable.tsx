import React, { useEffect, useState } from "react";

interface AzureTableProps {
  selectedId: string;
}

const AzureTable: React.FC<AzureTableProps> = ({ selectedId }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const endpoint =
    "http://a51ac870-e3ca-4a21-918b-990b835235e2.eastus2.azurecontainer.io/score";
  const apiKey = "<YOUR_API_KEY_HERE>"; // <-- paste your real key

  useEffect(() => {
    if (!selectedId || !apiKey) return;

    setLoading(true);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        // 🔁 UPDATE this based on what your model expects
        id: selectedId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Azure ML Response:", data);

        // 🔁 Adjust this based on the format your endpoint returns
        const recs: string[] = data.recommended_ids || [];

        setRecommendations(recs.slice(0, 5));
      })
      .catch((err) => {
        console.error("Azure call failed:", err);
      })
      .finally(() => setLoading(false));
  }, [selectedId]);

  if (loading) return <div>Loading Azure Recommendations...</div>;

  return (
    <div className="container mt-3">
      <div className="row mb-2 text-center fw-bold">
        <div className="col-auto">Selected ID:</div>
        <div className="col-auto">{selectedId}</div>
      </div>
      <div className="row text-center">
        {recommendations.map((id, idx) => (
          <div key={idx} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rec {idx + 1}</h5>
                <p className="card-text">{id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AzureTable;
