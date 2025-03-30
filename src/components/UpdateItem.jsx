// Removed duplicate declaration of UpdateItem

import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "" });

    useEffect(() => {
        if (!itemId) {
            setError("Invalid item ID");
            setLoading(false);
            return;
        }

        const fetchItem = async () => {
            try {
                const response = await axios.get(`${API_URI}/${itemId}`);
                setItem(response.data);
                setFormData({ name: response.data.name, price: response.data.price });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Failed to load item.");
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_URI}/${itemId}`, formData);
            setItem(response.data); // Update UI with the new data
            alert("Item updated successfully!");
        } catch (err) {
            console.error("Error updating item:", err);
            setError("Failed to update item.");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URI}/${itemId}`);
            setItem(null); // Remove item from UI
            alert("Item deleted successfully!");
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!item) return <p>Item deleted.</p>;

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-bold">Edit Item</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white p-2 rounded ml-2"
                >
                    Delete
                </button>
            </form>
        </div>
    );
};

UpdateItem.propTypes = {
    itemId: PropTypes.number.isRequired,
};

export default UpdateItem;
