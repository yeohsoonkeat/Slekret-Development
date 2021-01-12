import { Link } from 'react-router-dom';

export default function ProfileCard({ user, children }) {
  console.log(user);
  return (
    <div className="w-full h-full flex flex-row flex-wrap p-3">
      <div className="mx-auto w-2/3">
        <div
          className="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased"
          // style={{
          //   backgroundImage: `${user.profile_cover}`,
          //   backgroundRepeat: 'no-repeat',
          //   backgroundSize: 'cover',
          //   backgroundBlendMode: 'multiply',
          // }}
        >
          <div className="md:w-1/3 w-full">
            <img
              className="rounded-lg shadow-lg antialiased"
              src={user.avatar_src}
              alt="profile"
            />
            <Link
              to={`/user/${user.username}`}
              className="mx-1 my-2 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition bg-blue-300 rounded shadow ripple hover:shadow-lg hover:bg-indigo-600 focus:outline-none"
            >
              Edit Profile
            </Link>
          </div>
          <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
            <div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
              <div className="text-2xl text-blue-300 leading-tight font-bold">
                {user.displayName}
              </div>
              <div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer font-bold">
                <span className="border-b border-dashed border-gray-500 pb-1">
                  {user.role}
                </span>
              </div>
              <p className="text-normal text-gray-300 text-justify leading-relaxed">
                {user.description}
              </p>
              <div className="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0">
                {user.status}
              </div>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
