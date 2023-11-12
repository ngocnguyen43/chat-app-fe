/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { FaLink } from 'react-icons/fa';

import Icon from '../../atoms/Icon';

export default function ShareUrl() {
    return (
        <div className='grid gap-3'>
            <button className='btn btn-neutral flex w-full justify-start '>
                <Icon>
                    <FaLink />
                </Icon>
                <a className="link" href='https://www.google.com' target='_blank' rel='noreferrer'>I&apos;m a simple link</a>
            </button>
            <button className='btn btn-neutral flex w-full justify-start' id='helloo'>
                <Icon>
                    <FaLink />
                </Icon>
                <a className="link" href='https://www.google.com'>I&apos;m a simple link</a>
            </button>
            <button className='btn btn-neutral flex w-full justify-start' >
                <Icon>
                    <FaLink />
                </Icon>
                <a className="link" href='https://www.google.com'>I&apos;m a simple link</a>
            </button>
            {/* 
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg></button> */}
            <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="." className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="." className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="." className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="." className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                </ul>
            </div>

        </div>
    )
}
