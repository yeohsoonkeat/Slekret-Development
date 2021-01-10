import { Link } from "react-router-dom";

export default function hero() {
  return (
      <div className="container mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center relative z-0">
        <div className="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left my-10">
          <h1 className="uppercase text-6xl text-blue-900 font-bold leading-none tracking-wide mb-2">
            Slekret
          </h1>
          <h2 className="uppercase text-4xl text-orange-500 text-secondary tracking-widest mb-6">
            Community
          </h2>
          <p className="text-gray-600 leading-relaxed mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing. Vestibulum
            rutrum metus at enim congue scelerisque. Sed suscipit metu non
            iaculis semper consectetur adipiscing elit.
          </p>
          <Link
            to="/"
            className="bg-purple-900 hover:bg-purple-400 py-3 px-6 uppercase text-lg font-bold text-white rounded-full"
          >
            Learn more
          </Link>
        </div>
        <div className="hidden sm:flex items-center justify-center xl:justify-end w-1/2 xl:w-4/6 py-32">
          <img
            className="h-full w-2/3"
            src="https://cdn.wallpapersafari.com/74/37/2KlvZP.jpg"
          alt="k"></img>
        </div>
      </div>
  );
}
