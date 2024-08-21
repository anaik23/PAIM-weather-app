import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
    // State to keep track of the currently selected search result
    const [search, setSearch] = useState(null);

    // Function to load options from the backend server
    const loadOptions = async (inputValue) => {
        // Construct the URL for the backend server query with the city name
        const backendUrl = `/weather?city=${encodeURIComponent(inputValue)}`;

        try {
            // Fetch data from the backend server
            const response = await fetch(backendUrl);
            const data = await response.json();

            if (response.ok) {
                // Map the received data to the format required by the select component
                return {
                    options: data.map((city) => ({
                        value: `${city.coord.lat} ${city.coord.lon}`, // Value to be used for selected option
                        label: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}` // Display label
                    }))
                };
            } else {
                throw new Error(data.error || 'Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return { options: [] }; // Return an empty options array on error
        }
    };

    // Handle selection change in the dropdown
    const handleOnChange = (searchData) => {
        setSearch(searchData); // Update the state with the selected search data
        onSearchChange(searchData); // Trigger the callback with the selected search data
    };

    // Custom styles to make the dropdown menu scrollable
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            maxHeight: '200px', // Set the maximum height of the dropdown menu
            overflowY: 'auto'    // Enable vertical scrolling if content exceeds max height
        })
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"  // Placeholder text for the input field
            debounceTimeout={600}          // Delay before the search request is made
            value={search}                 // Controlled value of the input field
            onChange={handleOnChange}      // Handler for when a selection is made
            loadOptions={loadOptions}      // Function to load options based on input value
            styles={customStyles}          // Apply custom styles to the dropdown menu
        />
    );
};

export default Search;
