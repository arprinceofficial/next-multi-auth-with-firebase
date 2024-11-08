"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import ApplicationLogo from "@/app/components/ApplicationLogo";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import Image from "next/image";
import DefaultProfileImage from "@/app/assets/img/profile-image.png";
import ColorMode from "@/app/components/ColorMode";

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export default function Admin() {
    const { adminLogout, auth_user } = useAuth();
    // console.log('auth_user', auth_user);

    const [profileImage, setProfileImage] = useState(null);
    useEffect(() => {
        const getProfileImage = async () => {
            try {
                if (!auth_user?.user?.profile_image) return;

                const response = await fetch(auth_user.user.profile_image, {
                    accept: 'application/json',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${auth_user.access_token}`,
                    },
                });

                // Convert the response to Blob and generate a URL
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setProfileImage(imageUrl);
            } catch (error) {
                console.log('Error fetching profile image:', error);
            }
        };

        // if (auth_user) {
        //     getProfileImage();
        // }
    }, [auth_user]);
    return (
        <>
            <>
                <Disclosure as="nav" className="bg-gray-100">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/user">
                                        <Image
                                            alt="Your Company"
                                            src="https://queue.arprince.me/img/main-logo.png"
                                            className="h-8 w-auto"
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            priority
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <ColorMode />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-100 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    {/* <BellIcon aria-hidden="true" className="h-6 w-6" /> */}
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                alt="profileImage"
                                                src={auth_user.user.profile_image_url ?? DefaultProfileImage}
                                                className="h-8 w-8 rounded-full"
                                                width="32"
                                                height="32"
                                                sizes="100vw"
                                                priority
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-2 border-b border-gray-200 dark:border-gray-600">
                                            <MenuItem>
                                                <div className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-transparent dark:bg-gray-100 hover:text-gray-700 dark:hover:text-gray-600 focus:outline-none transition ease-in-out duration-150'>

                                                    <span>{auth_user.user.first_name + auth_user.user.last_name}</span>
                                                </div>
                                            </MenuItem>
                                            <MenuItem>
                                                <div className='flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-transparent dark:bg-gray-100 hover:text-gray-700 dark:hover:text-gray-600 focus:outline-none transition ease-in-out duration-150'>
                                                    <div className="font-medium text-sm text-gray-500 truncate">{auth_user.user.email}</div>
                                                </div>
                                            </MenuItem>
                                        </div>
                                        <MenuItem>
                                            <button onClick={adminLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left">
                                                Sign out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            </>
        </>
    )
}
