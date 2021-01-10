import { Link } from "react-router-dom";
import ThreadCard from "./threadCard";
import ListFilter from "./ListFilter";

export default function ThreadList() {
  
  return (
    <div className="w-full lg:w-8/12 flex flex-col justify-between">
      <div>
        <ListFilter />
        {
          [1,2,3].map((_,index) => (
            <ThreadCard key={index}/>
          ))
        }
      </div>
      <div className="mt-8">
        <div className="flex">
          <Link
            to="/"
            className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed"
          >
            Previous
          </Link>

          <Link
            to="/forum"
            className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            1
          </Link>

          <Link
            to="/forum"
            className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            2
          </Link>

          <Link
            to="/forum"
            className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            3
          </Link>

          <Link
            to="/forum"
            className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
