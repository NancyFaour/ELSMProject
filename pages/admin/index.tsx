'use client';
import "@/css/style.css";
import AdminLayout from '@/components/Admin/AdminLayout';

export default function AdminConsole() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome, Admin</h2>
      <p>This is the admin dashboard overview. You can manage content, users, and more.</p>
    </AdminLayout>
  );
}
