import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const default_form_state = {
    name: "",
    time: "",
    user: "",
}

const CheckoutForm = () => {
	// Define the state for each input field
	const [formData, setFormData] = useState(default_form_state);
    const db = getFirestore();
	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		
        try {
            const docRef = await addDoc(collection(db, "tools"), formData)
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e)
        }

        setFormData(default_form_state)
		// You could also send this data to a backend here
	};

	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div>
			<h2>Checkout Form</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</label>
				<br />

				<label>
					Tool:
					<input
						type="text"
						name="tool"
						value={formData.tool}
						onChange={handleChange}
						required
					/>
				</label>
				<br />

				<label>
					Time:
					<input
						type="text"
						name="time"
						value={formData.time}
						onChange={handleChange}
						required
					/>
				</label>
				<br />

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default CheckoutForm;
