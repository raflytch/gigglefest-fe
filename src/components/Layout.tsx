import { Outlet, Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/appSlice";

export default function Layout() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen">
      <header className="bg-gray-100 p-4">
        <nav className="flex items-center justify-between">
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </div>
          <Button onClick={() => dispatch(toggleTheme())}>Toggle Theme</Button>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 p-4 text-center">
        &copy; 2025 GiggleFest
      </footer>
    </div>
  );
}
