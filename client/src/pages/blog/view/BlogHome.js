import ItemCard from '../components/ItemCard';
import PostTags from '../components/PostTags';
import UserInfo from '../components/UserInfo';
import { gql, useQuery } from '@apollo/client';

const BlogHome = () => {
  const { loading, error, data } = useQuery(GET_FORUM_QUESTION);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
    return <h1>error</h1>;
  }
  const globally_pinned_articles = [];
  const local_articles = [];
  data.blog_articles.forEach((x) => {
    if (x.is_globally_pinned) {
      globally_pinned_articles.push(x);
    } else {
      local_articles.push(x);
    }
  });
  const {
    title,
    content,
    article_cover,
    slekret_user,
    blog_article_tags,
    created_at,
  } = globally_pinned_articles[0];
  const { avatar_src, displayname, username } = slekret_user;
  return (
    <div className="flex-1 flex flex-col py-8">
      <div className="w-full relative">
        <div className="relative" style={{ paddingTop: '40%' }}>
          <div
            className="absolute inset-0 bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${article_cover})` }}
          />
        </div>

        {/* Featured Post */}
        <div className="hidden lg:block absolute left-24 top-1/2 transform -translate-y-1/2 bg-white w-1/2 px-6 py-4">
          <PostTags tags={blog_article_tags} />
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
            {content}
          </p>
          <UserInfo
            user={{
              avatar_src,
              displayname,
              username,
              created_at,
            }}
          />
        </div>
      </div>

      <div
        className="mt-10 grid gap-x-8 gap-y-12"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}
      >
        {local_articles.map((item, index) => (
          <div key={index}>
            <ItemCard item={item} />
          </div>
        ))}

        {Array.from(
          Array(local_articles.length >= 4 ? 0 : 4 - local_articles.length)
        ).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

const GET_FORUM_QUESTION = gql`
  query MyQuery {
    blog_articles {
      article_cover
      content
      created_at
      is_globally_pinned
      id
      title
      slekret_user {
        avatar_src
        displayname
        username
      }
      blog_article_likes_aggregate {
        aggregate {
          count
        }
      }
      blog_article_tags {
        tag_name
      }
    }
  }
`;

export default BlogHome;
