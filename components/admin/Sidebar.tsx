'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ChartPieIcon, 
  Cog6ToothIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Customers', href: '/admin/customers', icon: UsersIcon },
  { name: 'Policies', href: '/admin/policies', icon: DocumentTextIcon },
  { name: 'Payments', href: '/admin/payments', icon: CreditCardIcon },
  { name: 'KPI', href: '/admin/kpi', icon: ChartPieIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-gray-900/50 lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center space-x-3">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">SafeHaven</span>
          </Link>
          <button
            type="button"
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout button */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            type="button"
            className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            onClick={() => {/* Handle logout */}}
          >
            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </div>
    </>
  )
} 