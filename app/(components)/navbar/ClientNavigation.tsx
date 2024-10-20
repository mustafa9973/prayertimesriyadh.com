"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';


type NavigationItem = {
  name: string;
  href: string;
};

interface ClientNavigationProps {
  navigation: NavigationItem[];
  isMobile?: boolean;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  

export default function ClientNavigation({ navigation, isMobile = false }: ClientNavigationProps) {
  const pathname = usePathname();  // Get current path

  return (
    <div className={isMobile ? 'block' : 'flex space-x-4'}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          aria-current={pathname === item.href ? 'page' : undefined}
          className={classNames(
            pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            isMobile
              ? 'block rounded-md px-3 py-2 text-base font-medium'
              : 'flex items-center rounded-md px-3 py-2 text-sm font-medium mr-6'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
