'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, Bars3Icon, Cog6ToothIcon, ArrowRightOnRectangleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/context/ThemeContext'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 flex h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <button
        type="button"
        className="px-4 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <span className="sr-only">Toggle theme</span>
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-3 right-3 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/admin/settings"
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-700' : ''
                        } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                      >
                        <Cog6ToothIcon className="mr-3 h-5 w-5" />
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {/* Handle logout */}}
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-700' : ''
                        } flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
} 