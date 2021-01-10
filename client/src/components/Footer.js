import React from 'react';

const Footer = () => {
  const categories = {
    HOME: [{ text: 'Services' }, { text: 'About Us' }],
    USER: [
      { text: 'Sign in' },
      { text: 'New Account' },
      { text: 'Surveys', badge: 'New' },
    ],
    RESOURCES: [{ text: 'Tutorials' }, { text: 'Support', badge: 'New' }],
    SUPPORT: [
      { text: 'Help Center' },
      { text: 'Privacy Policy' },
      { text: 'Conditions' },
    ],
    'CONTACT US': [
      { text: 'Kirirom Institute of Technology' },
      { text: 'portalvc.team@gmail.com' },
    ],
  };

  return (
    <div>
      <div className="bg-gray-800">
        <div className="max-w-8xl mx-auto text-gray-100 flex flex-wrap justify-between">
          {Object.keys(categories).map((category, index) => {
            return (
              <div key={index} className="p-5">
                <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  {category}
                </div>
                {categories[category].map((sub_category, index) => {
                  return (
                    <div key={index} className="mt-3 flex items-center">
                      <a className="text-sm" href="/">
                        {sub_category.text}
                      </a>
                      {sub_category.badge && (
                        <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full ml-2">
                          {sub_category.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-100 pt-2">
        <div className="flex p-5 mx-auto border-t text-gray-800 text-sm flex-col md:flex-row max-w-8xl">
          <div>© Copyright 2021. All Rights Reserved.</div>
          {/* <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            for social
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
