import AdminNav from './AdminNav.jsx';

export const metadata = { title: 'Admin | Arix' };

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-display-md text-gray-900 mb-6">Admin Dashboard</h1>
        <AdminNav />
        {children}
      </div>
    </div>
  );
}


