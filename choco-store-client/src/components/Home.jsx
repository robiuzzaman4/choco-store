import { Link, useLoaderData } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Swal from "sweetalert2";
import { useState } from "react";

const Home = () => {
    const loadedChocolates = useLoaderData();
    const [chocolates, setChocolates] = useState(loadedChocolates);

    const handleChocolateDelete = (_id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://choco-store-server-robiuzzaman4.vercel.app/chocolate/${_id}`, {
                    method: "DELETE"
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'This Chocolate has been deleted.',
                                'success'
                            )
                            const restChocolates = chocolates.filter((chocolate) => chocolate._id !== _id);
                            setChocolates(restChocolates);
                        }
                    })
            }
        })
    }

    const tbData = chocolates.map((chocolate, index) => {
        const { _id, name, country, category, price, photo } = chocolate;
        return (
            <tr key={chocolate._id}
                className={`border-b border-zinc-200 py-3 text-sm ${index === chocolates.length - 1 ? 'border-none' : ''}`}>
                <td className="px-6 py-3">
                    <img className="w-12 h-12 rounded-lg object-cover" src={photo} alt="" />
                </td>
                <td className="px-6 py-3">{name}</td>
                <td className="px-6 py-3">{country}</td>
                <td className="px-6 py-3">{category}</td>
                <td className="px-6 py-3">${price}</td>
                <td className="px-6 pt-4 flex items-center gap-2">
                    <Link to={`/chocolate/${_id}`}>
                        <button className="h-8 w-8 bg-orange-100 text-orange-500 rounded-lg grid place-items-center">
                            <PencilIcon className="w-4 h-4" />
                        </button>
                    </Link>
                    <button onClick={() => handleChocolateDelete(chocolate._id)} className="h-8 w-8 bg-orange-100 text-orange-500 rounded-lg grid place-items-center">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </td>
            </tr>
        )
    })
    return (
        <section className="max-w-screen-lg mx-auto px-4 py-10 grid gap-8">

            <div className="w-auto">
                <Link to='/new-chocolate' className="btn-primary">
                    Add New Chocolate
                </Link>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-zinc-500">
                    <thead className="text-zinc-700 capitalize bg-orange-50 rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country/Factory
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbData}
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default Home;


// deletedCount