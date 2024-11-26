/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';

export const RenderModal = ({ closeModal, roomNumber }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // handle the form submission (e.g., close modal or send data to server)
        closeModal(); // Close the modal after submission if desired
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-gray-800">Book Room {roomNumber}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Enter your details</label>

                        <input
                            type="text"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                            placeholder="Your Name"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                            placeholder="Phone Number"
                            {...register('phoneNumber', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone number must be 10 digits',
                                }
                            })}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                        <input
                            type="text"
                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                            placeholder="Roll Number"
                            {...register('rollNumber', { required: 'Roll number is required' })}
                        />
                        {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>}
                    </div>

                    <div className="mt-4 flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};