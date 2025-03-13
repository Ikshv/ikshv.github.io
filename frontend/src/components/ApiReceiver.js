import React, { useEffect, useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function Api() {
    const [data, setData] = useState(null);
    console.log("API URL:", process.env.REACT_APP_API_BASE_URL);


    useEffect(() => {
        fetch(`${API_BASE_URL}/api`)
        .then(response => response.json())
        .then(data => setData(data) && console.log(data))
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>data</h1>
            <p>{data ? JSON.stringify(data) : "Loading..."}</p>
            {/* <p>{data.message} | {data.timestamp}</p> */}
        </div>
    );
}

export default Api;