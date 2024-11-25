/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

export const BookCard = ({ data }) => {
    const { roomNumber, status, location } = data;
    const authenticated = true; // Assume this value comes dynamically from context or state
    const navigate = useNavigate();

    // Handle booking button click
    const handleBookNow = () => {
        if (!authenticated) {
            navigate('/login');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-200">
            <h3 className="text-xl font-semibold text-gray-800">Room {roomNumber}</h3>
            <p className="text-sm text-gray-600">{status}</p>
            <p className="text-lg mt-2">Location: {location}</p>
            <button
                onClick={handleBookNow} // Attach the click handler
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
                Book Now
            </button>
        </div>
    );
}

