const IconButton = (props) => {
  const { isActive, title, icon: Icon, onClick } = props;

  return (
    <li
      className={`list-none flex items-center w-full px-2 py-3 cursor-pointer hover:bg-blue-100 hover:text-blue-600 ${
        isActive ? 'text-blue-600' : 'text-gray-600'
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" filled={isActive} />
      <span
        className={`text-xs ml-2 font-medium ${
          isActive && 'tracking-widest'
        } transition-all`}
      >
        {title}
      </span>
    </li>
  );
};

export default IconButton;
