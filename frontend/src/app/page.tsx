import Navbar from "@/components/navbar/Navbar";

export default function HomePage() {

  return (

    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="flex flex-col items-center justify-center h-[85vh] text-center px-5">

        <h1 className="text-6xl font-bold mb-6 text-orange-400">
          Fuel Distribution System
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl leading-8">
          Smart online fuel booking platform for customers,
          distributors and administrators with real-time
          booking and delivery management.
        </p>

        <div className="flex gap-5 mt-10">

          <a
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold"
          >
            Login
          </a>

          <a
            href="/register"
            className="border border-orange-400 px-8 py-3 rounded-lg font-semibold"
          >
            Register
          </a>

        </div>

      </div>

    </div>
  );
}