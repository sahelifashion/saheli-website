import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, Package } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-brand-maroon">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-brand-cream hover:text-brand-maroon transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-brand-cream hover:text-brand-maroon transition-colors">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/gallery" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-brand-cream hover:text-brand-maroon transition-colors">
            <ImageIcon size={20} />
            <span>Gallery</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
