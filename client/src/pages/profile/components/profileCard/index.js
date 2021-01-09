import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProfileCard(props) {
    const {id} = useParams()
	return (
                <div className="w-screen h-screen bg-white flex flex-row flex-wrap p-3">
                    <div className="mx-auto w-2/3">
                        <div className="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased" style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundBlendMode: "multiply"
                        }}>
                            <div className="md:w-1/3 w-full">
                                <img className="rounded-lg shadow-lg antialiased" src="https://scontent.fpnh10-1.fna.fbcdn.net/v/t1.0-9/90355465_2831326093650021_3661684079125856256_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=rshhzKfx6dIAX-oqhGL&_nc_ht=scontent.fpnh10-1.fna&oh=73d960fec311e9f7533051270f61dfcf&oe=601E0B1D" alt=""/>
                                <Link to={`/user/${id}/setting`} className="mx-1 my-2 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition bg-blue-300 rounded shadow ripple hover:shadow-lg hover:bg-indigo-600 focus:outline-none">
                                    Edit Profile
                                </Link>
                            </div>
                        <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                            <div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
                                <div className="text-2xl text-blue-300 leading-tight font-bold">Yeoh Soon Keat</div>
                                    <div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer font-bold"><span className="border-b border-dashed border-gray-500 pb-1">Admin</span></div>
                                    <p className="text-normal text-gray-300 text-justify leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium massa ac lectus mattis eleifend nec vitae mauris. Curabitur tristique, ipsum vitae aliquam pretium, magna metus volutpat urna, nec venenatis nisi nisl ut nulla. Nulla sodales vehicula dictum. Quisque eu mauris laoreet lacus congue pharetra. Donec eu urna sagittis, lacinia odio in, sagittis tellus.
                                    </p>
                                    <div className="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0">Last Seen: <b>2 days ago</b></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {props.children}
                        </div>
                    </div>
                </div>
	);
}
