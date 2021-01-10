import { Link } from "react-router-dom";

export default function category({ cat }) {
  return (
      <Link
        to={cat.url}
        className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline"
      >
        {cat.name}
      </Link>    
  );
}
