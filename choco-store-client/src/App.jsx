import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <ScrollRestoration/>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default App;