import IconBookmark from '../../../icons/ic_bookmark';
import IconShare from '../../../icons/ic_share';
import IconTag from '../../../icons/ic_tag';

const ItemCard = ({ item }) => {
  const {
    image,
    tags,
    title,
    description,
    avatar,
    username,
    published_date,
  } = item;

  return (
    <div className="w-full">
      <div className="w-full relative" style={{ paddingTop: '75%' }}>
        <div
          className="absolute inset-0 bg-red-500"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="mt-3 flex items-center text-gray-500">
        <IconTag className="w-4 h-4" />
        <span className="text-xs">
          <span className="font-semibold">TAGS: </span>
          {tags.join(', ')}
        </span>
      </div>
      <p className="my-2 text-xl text-gray-600 font-semibold leading-5">
        {title}
      </p>
      <p
        style={{
          overflow: 'hidden',
          whiteSpace: 'normal',
          display: '-webkit-box',
          WebkitLineClamp: '5',
          WebkitBoxOrient: 'vertical',
        }}
        className="text-gray-500 tracking-wide text-sm"
      >
        {description}
      </p>

      <div className="mt-2 border-t pt-2 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="mr-2 w-12 h-12 rounded-full bg-cover"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <div>
            <p className="text-sm">{username}</p>
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
    </div>
  );
};

export default ItemCard;
