import React from "react";
import { Link } from "react-router-dom"

export default function ThreadCard() {
  //   const { id } = useParams();
  const post = {
    date: "Jun 1, 2020",
    categories: [{name: 'laravel', url:'category/'}],
    head: 'Building your idea',
    url: '/post/',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took Link galley of type and scrambled it to make Link type specimen book.',
    user:{
        profile_image: 'https://www.wallpapers13.com/wp-content/uploads/2015/12/Green-leaf-with-water-droplets-HD-wallpaper-915x515.jpg',
        username: 'YSK',
        profile_url:''
    }
  }
  return (
    <div className="mt-6">
      <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">{post.date}</span>
          <Link
            to="#"
            className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          >
            Laravel
          </Link>
        </div>
        <div className="mt-2">
          <Link to={post.url} className="text-2xl text-gray-700 font-bold hover:underline">
            {post.head}
          </Link>
          <p className=" truncate mt-2 text-gray-600">
              {post.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link to={post.url} className="text-blue-500 hover:underline">
            Read more
          </Link>
          <div>
            <Link to={post.user.profile_url} className="flex items-center">
              <img
                src={post.user.profile_image}
                alt="avatar"
                className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              />
              <h1 className="text-gray-700 font-bold hover:underline">{post.user.username}</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
