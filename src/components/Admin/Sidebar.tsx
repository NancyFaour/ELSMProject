'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '@/redux/slices/categorySlice';

const navItems = [
  {
    label: 'Categories',
    href: '/admin/categories',
    children: [
      { label: 'Add Categories', href: '/admin/categories', action: 'addCategory' },
    ],
  },
  {
    label: 'Courses',
    href: '/admin/courses',
    children2: [
      { label: 'Course Sessions', href: '/admin/courseSessions' },
    ],
  },
  { label: 'Reviews', href: '/admin/reviews' },
  { label: 'Web Users', href: '/admin/users' },
  { label: 'Web Roles', href: '/admin/roles' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (href: string, action?: string) => (e: React.MouseEvent) => {
    if (action) {
      e.preventDefault();
    }

    if (action === 'addCategory' && pathname === '/admin/categories') {
      dispatch(setIsModalOpen(true));
    } else {
      router.push(href);
    }
  };

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
                    <a
                      href={child.href}
                      onClick={handleClick(child.href, child.action)}
                      className={`sidebar-link sub-label ${
                        pathname === child.href ? 'active' : ''
                      }`}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {item.children2 && (
              <ul className="sidebar-submenu">
                {item.children2.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className={`sidebar-link sub-label ${pathname === child.href ? 'active' : ''}`}>
                      {child.label}
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
