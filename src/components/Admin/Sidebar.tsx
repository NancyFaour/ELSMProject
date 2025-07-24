'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Categories', href: '/admin/categories' },
  { 
    label: 'Courses', 
    href: '/admin/courses',
    children: [
      { label: 'Course Sessions', href: '/admin/courseSessions' }
    ],
  },
  { label: 'Reviews', href: '/admin/reviews' },
  { label: 'Web Users', href: '/admin/users' },
  { label: 'Web Roles', href: '/admin/roles' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <span className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}>
                {item.label}
              </span>
            </Link>

            {item.children && (
              <ul className="sidebar-submenu">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href}>
                      <span className={`sidebar-link sub-label ${pathname === child.href ? 'active' : ''}`}>
                        {child.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
