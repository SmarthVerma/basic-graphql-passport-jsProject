import { BookCard } from '../components/'
import { Rooms } from '../dummy/index'; // Import room data

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-12 text-center tracking-wider">
                Available Rooms
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Rooms.map((room) => (
                    <div key={room.id}>
                        <BookCard data={room} />
                    </div> 
                ))}
            </div>
        </div>
    );
};

export default Dashboard;