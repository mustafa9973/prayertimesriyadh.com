import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';


const ClientNavigation = dynamic(() => import('./ClientNavigation'))
const navigation = [
  { name: 'مواقيت الصلاة في الرياض', href: '/' },
  { name: 'التاريخ هجري', href: '/hijri-date' },
];


export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                alt="prayertimesriyadh.com"
                src="/img/logo.webp"
                width={200}
                height={200}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center">
              {/* Render the client-side navigation links */}
              <ClientNavigation navigation={navigation} />
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* ClientNavigation component for mobile */}
          <ClientNavigation navigation={navigation} isMobile />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
