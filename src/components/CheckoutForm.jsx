import React, { useEffect, useState } from "react";
import { getAllTools } from "../firebase/tools";

const default_form_state = {
    tool: ""
}

const CheckoutForm = () => {
  const [tools, setTools] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
	handleToolUpdate();
  }, [])

  const handleToolUpdate = async () => {
	const tempTools = await getAllTools();
	setTools(tempTools.map((tool) => tool.name));
  }
  // Handle change in dropdown
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    alert(`You selected: ${selectedItem}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedItem} onChange={handleChange}>
        <option value="">-- Please choose an option --</option>
        {tools.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button type="submit" disabled={!selectedItem}>Submit</button>
    </form>
  );
}

export default CheckoutForm;
