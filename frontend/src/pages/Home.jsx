
import BookCard from "../components/BookCard";
import { Rooms } from "../dummy";
export const Home = () => {
    const limitedRooms = Rooms.slice(0, 3);
    console.log({ limitedRooms })

    return (
        <div className="min-h-screen w-full border border-red-700 bg-gray-50">
            {/* Header */}
            <header className="bg-blue-600 text-white py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Hostel Room Booking</h1>
                    <p className="mt-2 text-lg">Find and Book Available Hostel Rooms</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                <section className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Available Rooms</h2>
                    <p className="text-lg mb-6">
                        Browse through the list of available hostel rooms in your college.
                        Book a room or check when rooms will be available next.
                    </p>
                </section>

                {/* Available Rooms Section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                    {limitedRooms.map(data => (
                        <div key={data.id}>
                            <BookCard data={data} />
                        </div>
                    ))}

                </section>

                {/* Availability Section */}
                <section className="bg-gray-100 py-6 rounded-lg shadow-md mb-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">When Will Rooms Be Available?</h2>
                        <p className="text-lg mb-6">
                            If no rooms are currently available, check back later for the availability dates.
                        </p>

                        <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl mx-auto">
                            <h3 className="text-xl font-semibold text-gray-800">Room 104</h3>
                            <p className="text-sm text-gray-600">Available from Jan 15th</p>
                            <p className="text-lg mt-2">Location: Block D</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
            </main>
            <footer className="bg-blue-600 border border-lime-500 text-white w-full py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Hostel Room Booking. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};
