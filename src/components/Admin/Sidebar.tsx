'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Users', href: '/admin/users' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Courses', href: '/admin/courses' },
  { label: 'Reviews', href: '/admin/reviews' },
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
          </li>
        ))}
      </ul>
    </aside>
  );
}

