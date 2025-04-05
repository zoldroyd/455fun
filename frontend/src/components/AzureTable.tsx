import React, { useEffect, useState } from "react";
import IDsNeeded from "./IDsNeeded";

interface AzureTableProps {
  selectedId: string;
}

const AzureTable: React.FC<AzureTableProps> = ({ selectedId }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const endpoint = "http://localhost:5000/api/azure-recommendations";

  const data = {
    Inputs: {
      input1: IDsNeeded().map((id) => ({
        personId: parseInt(selectedId),
        contentId: id,
        eventRating: 5,
        timestamp: "2025-04-04T12:00:00Z",
        userClient:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.3632",
        userCountry: "US",
      })),
    },
  };

  useEffect(() => {
    if (!selectedId) return;

    setLoading(true);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("Azure ML Response:", data);

        // 🔁 Adjust this based on your model output
        // Example: assuming your proxy returns:
        // { Results: { output1: [ { recommended_ids: "id1,id2,id3,id4,id5" } ] } }

        const raw = data?.Results?.output1?.[0]?.recommended_ids;
        const recs = raw ? raw.split(",").map((id: string) => id.trim()) : [];

        setRecommendations(recs.slice(0, 5));
      })
      .catch((err) => {
        console.error("Azure call failed:", err);
        setRecommendations([]);
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
