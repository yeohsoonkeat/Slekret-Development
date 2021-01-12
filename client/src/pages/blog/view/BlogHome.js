import ItemCard from '../components/ItemCard';
import PostTags from '../components/PostTags';
import UserInfo from '../components/UserInfo';

const sample_image =
  'https://images.unsplash.com/photo-1610312217105-4760d7407a0d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const tags = ['General', 'Cooking', 'Restaurant'];
const title = 'Green veggies with flavoured butter';
const published_date = 'October 10, 2010';
const description =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, quis laudantium rerum quod recusandae porro quidem qui natus? Unde, minus suscipit est aut quibusdam quos iure natus cumque tempore eligendi? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, quis laudantium rerum quod recusandae porro quidem qui natus? Unde, minus suscipit est aut quibusdam quos iure natus cumque tempore eligendi?';
const avatar =
  'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80';
const display_name = 'John Doe';

const one = [
  {
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    tags: ['Food'],
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos veniam!',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga perferendis ex facere quas accusantium aperiam, harum consequatur quam laborum quia voluptas, voluptatem, mollitia doloribus voluptate error culpa nulla! Consectetur, eaque.Quam temporibus enim vero cum beatae, non nihil vel deserunt aspernatur repellat corrupti, voluptate eveniet sint laudantium hic. Quibusdam dolores error omnis ea minima. Fugiat impedit minus qui sit numquam.',
    avatar:
      'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1235&q=80',
    display_name: 'Oladimeji Odunsi',
    username: 'oladimeji_odunsi',
    published_date: 'October 10, 2020',
    likes: '500',
    read_duration: '5mn',
  },
];

const items = one
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one)
  .concat(one);

const BlogHome = () => {
  return (
    <div className="flex-1 px-6 flex flex-col py-8">
      <div className="w-full relative">
        <div className="relative" style={{ paddingTop: '40%' }}>
          <div
            className="absolute inset-0 bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${sample_image})` }}
          />
        </div>

        {/* Featured Post */}
        <div className="hidden lg:block absolute left-24 top-1/2 transform -translate-y-1/2 bg-white w-1/2 px-6 py-4">
          <PostTags tags={tags} />
          <p className="text-xl font-semibold text-gray-800">{title}</p>
          <p
            style={{
              overflow: 'hidden',
              whiteSpace: 'normal',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
            className="text-gray-500 tracking-wide text-sm"
          >
            {description}
          </p>
          <UserInfo
            user={{
              avatar,
              display_name,
              username: display_name,
              published_date,
            }}
          />
        </div>
      </div>

      <div
        className="mt-10 grid gap-x-8 gap-y-12"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <ItemCard item={item} />
          </div>
        ))}

        {Array.from(Array(items.length >= 4 ? 0 : 4 - items.length)).map(
          (_, index) => (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  );
};

export default BlogHome;
