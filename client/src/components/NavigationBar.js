import { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constant/routes';
import useAuthProvider from '../hook/useAuthProvider';
import axios from 'axios';
import config from '../config';
import AnimatedIconHamburgerMenu from '../animated_icons/ai_hamburger_menu';
import IconUser from '../icons/ic_user';

const navbar_categories = [
  { text: 'Home', path: routes.home },
  { text: 'Forum', path: routes.forum },
  { text: 'Blog', path: routes.blog },
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [profilePanel, setProfilePanel] = useState(false);
  const [authState, authDispatch] = useAuthProvider();

  const logout = () => {
    authDispatch({ type: 'USER_LOGOUT' });
    window.localStorage.setItem('auth', 'false');
    axios.post(
      config.backendUrl + '/auth/logout',
      {},
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );
  };

  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-8xl mx-auto px-2 sm:px-6">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className={`inline-flexitems-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatedIconHamburgerMenu
                isOpen={isOpen}
                color="bg-gray-400"
                hoveredColor="bg-white"
                extendedParentClassName="inline-flex items-center justify-center p-2 hover:bg-gray-700"
              >
                <span className="sr-only">Open main menu</span>
              </AnimatedIconHamburgerMenu>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to={routes.home} onClick={() => setActiveIndex()}>
              <div className="ml-14 sm:ml-0 flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navbar_categories.map((category, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <Link key={index} to={category.path}>
                      <button
                        className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm tracking-wider ${
                          isActive ? 'bg-gray-900 font-bold' : 'font-medium '
                        }`}
                        onClick={() => setActiveIndex(index)}
                      >
                        {category.text}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center pr-2 sm:pr-0">
            {window.localStorage.getItem("auth") === "true" ? (
              <>
                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() => setProfilePanel(!profilePanel)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`${authState.user?.avatar_src}`}
                        alt=""
                      />
                    </button>
                  </div>
                  <div
                    className={`${
                      profilePanel ? 'block' : 'hidden'
                    } z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu`}
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to={`/user/${authState.user?.username}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to={`/user/id/setting`}
                      className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <button
                      className="w-full block px-4 py-2 text-sm text-white bg-red-700 hover:bg-red-400"
                      role="menuitem"
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to={routes.auth}
                className="flex items-center text-gray-400 hover:text-white"
              >
                <IconUser className="w-8 h-8" strokeWidth={1.5} />
                <span className="ml-1 font-medium hidden sm:block">
                  Account
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar Categories */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pb-3 space-y-1">
          {navbar_categories.map((category, index) => {
            const isActive = index === activeIndex;

            return (
              <Link key={index} to={category.path}>
                <button
                  className={`w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base ${
                    isActive ? 'bg-gray-900 font-bold' : 'font-medium'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsOpen(false);
                  }}
                >
                  {category.text}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
