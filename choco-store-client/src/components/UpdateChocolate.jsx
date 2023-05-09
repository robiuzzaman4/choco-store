import Swal from "sweetalert2";
import BackToHome from "./BackToHome";
import { useLoaderData } from "react-router-dom";

const UpdateChocolate = () => {
    const loadedChocolate = useLoaderData();
    const { _id, name, country, category, price, photo } = loadedChocolate;

    const handleUpdateChocolate = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const country = form.country.value;
        const category = form.category.value;
        const price = form.price.value;
        const photo = form.photo.value;

        const chocolate = { name, country, category, price, photo };

        fetch(`https://choco-store-server-robiuzzaman4.vercel.app/chocolate/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(chocolate)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Updated chocolate successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })
                }
            })
    }
    return (
        <section className="max-w-screen-lg mx-auto px-4 py-10 flex flex-col gap-8">
            <div className="w-auto">
                <BackToHome />
            </div>
            <div className="bg-zinc-100 rounded-lg p-4 grid gap-4">
                <div className="grid gap-2">
                    <h1 className="text-center text-2xl md:text-3xl font-semibold">Update Chocolate</h1>
                    <p className="text-center text-zinc-700 font-medium">Use the below form to update a existing chocolate</p>
                </div>
                <form onSubmit={handleUpdateChocolate} className="grid gap-2">
                    {/* form row */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <label className="grid gap-1">
                            <span className="font-medium">Name:</span>
                            <input type="text" name="name" className="w-full bg-white px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-orange-500 focus:outline-none"
                                placeholder="Enter Chocolate Name"
                                defaultValue={name} />
                        </label>
                        <label className="grid gap-1">
                            <span className="font-medium">Country:</span>
                            <input type="text" name="country" className="w-full bg-white px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-orange-500 focus:outline-none"
                                placeholder="Enter Chocolate Country"
                                defaultValue={country} />
                        </label>
                    </div>
                    {/* form row */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <label className="grid gap-1">
                            <span className="font-medium">Category:</span>
                            <input type="text" name="category" className="w-full bg-white px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-orange-500 focus:outline-none"
                                placeholder="Enter Chocolate Category"
                                defaultValue={category} />
                        </label>
                        <label className="grid gap-1">
                            <span className="font-medium">Price:</span>
                            <input type="number" name="price" className="w-full bg-white px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-orange-500 focus:outline-none"
                                placeholder="Enter Chocolate Price"
                                defaultValue={price}
                                step="any" />
                        </label>
                    </div>
                    <label className="grid gap-1">
                        <span className="font-medium">Photo:</span>
                        <input type="text" name="photo" className="w-full bg-white px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-orange-500 focus:outline-none"
                            placeholder="Enter Chocolate Photo URL"
                            defaultValue={photo} />
                    </label>
                    <button type="submit" className="btn-primary mt-2">Update Now</button>
                </form>
            </div>
        </section>
    );
};

export default UpdateChocolate;