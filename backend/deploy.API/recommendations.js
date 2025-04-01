import { useEffect, useState } from "react";

function Recommendations() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/recommendations")  // Connect to .NET API
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h2>Recommended Items</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Recommendations;
