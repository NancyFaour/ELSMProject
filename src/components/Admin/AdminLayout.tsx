'use client';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
