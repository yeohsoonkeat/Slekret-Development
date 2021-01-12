import IconBookmark from '../../../icons/ic_bookmark';
import IconShare from '../../../icons/ic_share';

const UserInfo = ({ user }) => {
  const { avatar, display_name, username, published_date } = user;

  return (
    <div className="mt-2 border-t pt-2 flex justify-between items-center">
      <div className="flex items-center">
        <div
          className="mr-2 w-12 h-12 rounded-full bg-cover"
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <div className="select-none flex flex-col items-start">
          <a
            href={username}
            className="text-sm text-gray-800 hover:text-blue-800 hover:font-semibold hover:tracking-wide hover:cursor-pointer transition-all"
          >
            {display_name}
          </a>
          <p
            className="uppercase font-bold tracking-widest px-2 py-1 bg-gray-200 text-gray-600"
            style={{ fontSize: '0.5rem', lineHeight: '0.75rem' }}
          >
            {published_date}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="mr-2 p-2 border rounded-full text-gray-600 hover:bg-gray-200">
          <IconShare className="w-5 h-5" />
        </div>
        <div className="p-2 border rounded-full text-gray-600 hover:bg-gray-200">
          <IconBookmark className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;