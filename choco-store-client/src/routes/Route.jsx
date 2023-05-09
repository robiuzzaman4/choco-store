import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import NewChocolate from "../components/NewChocolate";
import UpdateChocolate from "../components/UpdateChocolate";

const Route = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch(`https://choco-store-server-robiuzzaman4.vercel.app/chocolates`)
            },
            {
                path: "/new-chocolate",
                element: <NewChocolate></NewChocolate>
            },
            {
                path: "/chocolate/:id",
                element: <UpdateChocolate></UpdateChocolate>,
                loader: ({ params }) => fetch(`https://choco-store-server-robiuzzaman4.vercel.app/chocolate/${params.id}`)
            }
        ]
    },
]);

export default Route;