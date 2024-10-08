import { Button } from "@nextui-org/react";

export default function Header() {
  return (
    <header className="bg-[#7fa1e8] w-full p-4 flex items-center justify-between shadow-md">
      <div className="logo text-white text-2xl font-bold">Wizards</div>

      <div className="flex items-center gap-4">
        <Button
          className="login bg-white py-2 px-7 text-purple-500 font-semibold rounded-full shadow-md hover:bg-gray-100"
          aria-label="Login"
        >  Login
        </Button>

        <div className="w-px h-8 bg-gray-300"></div>

        <Button
          className="signup bg-purple-600 py-2 px-7 text-white font-semibold rounded-full shadow-md hover:bg-purple-700"
          aria-label="Sign Up"
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}
