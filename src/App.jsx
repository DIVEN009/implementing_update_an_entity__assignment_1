import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import axios from "axios";
import './styles.css'

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
    const [itemId, setItemId] = useState(null);

    useEffect(() => {
        // Fetch the first available item ID
        const fetchItems = async () => {
            try {
                const response = await axios.get(API_URI);
                if (response.data.length > 0) {
                    setItemId(response.data[0].id); // Set the first available item ID
                } else {
                    setItemId(null);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Update Item</h1>
            <input
                type="number"
                value={itemId || ""}
                onChange={(e) => setItemId(Number(e.target.value))}
                className="border p-2 mb-4"
                placeholder="Enter item ID"
            />
            {itemId ? <UpdateItem itemId={itemId} /> : <p>No items available.</p>}
        </div>
    );
}

export default App;
