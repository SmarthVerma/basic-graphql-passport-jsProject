export const Navbar = () => {
    return (
        <div className="md:hidden bg-blue-600 text-white w-full p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="flex gap-3">
                <button className="text-sm bg-blue-700 px-3 py-1 rounded hover:bg-blue-800">Rooms</button>
                <button className="text-sm bg-blue-700 px-3 py-1 rounded hover:bg-blue-800">Add a Room</button>
                <button className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </div>
        </div>
    );
};