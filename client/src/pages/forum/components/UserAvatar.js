const UserAvatar = ({ src, className = 'w-12 h-12' }) => {
  const default_avatar = process.env.PUBLIC_URL + '/assets/default_avatar.png';

  if (!src) {
    return (
      <div
        className={`${className} rounded-full border bg-white p-2 flex justify-center items-center`}
      >
        <img src={default_avatar} alt="default_avatar" className="h-full" />
      </div>
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-white bg-cover bg-center`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};

export default UserAvatar;
