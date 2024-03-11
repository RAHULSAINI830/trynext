import { useState } from 'react';
import {signOut} from 'next-auth/react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
export default function Avatar({ className , dropdownClassName}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    function handleSignOut(){
      signOut();
    }

    return (
        <div className={className}> {/* Add a relative positioning container */}
            <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex mx-3 text-sm  rounded-full md:mr-0"
                type="button"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>

                <div className="items-center justify-center w-10 h-10 text-white bg-white rounded-full">
                <img src='/cat.png' alt='img'/>
                </div>
            </button>

            {/* Use isDropdownOpen to conditionally apply 'hidden' class */}
            <div
                id="dropdownAvatar"
                className={`absolute ${dropdownClassName} z-10 ${isDropdownOpen ? '' : 'hidden'} bg-white text-black divide-y divide-gray-100 rounded-lg shadow w-44 `}
            >
                <div className="px-4 py-3 mt-1 text-sm text-gray-900 " data-position="bottom"
           data-alignment="right">
                    {session?(<div>Hey {session.user.name}</div>):(<div>hey</div>)}

                </div>
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownUserAvatarButton"
                >
                    <li>
                        <Link
                            href="/Login/profile"
                            className="block px-4 py-2 text-black hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                    </li>



                </ul>
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownUserAvatarButton"
                >

                <li>
                    <Link
                        href="/property-listing"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                        My Listings
                    </Link>
                </li>
                </ul>
                <div className="py-2">
                    <a  onClick={handleSignOut}

                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Sign out
                    </a>
                </div>
            </div>
        </div>
    );
}
