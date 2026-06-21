import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, Package } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 flex-shrink-0 flex flex-col justify-between md:sticky md:top-0 md:h-screen z-30">
        <div>
          <div className="mb-4 md:mb-8">
            <h2 className="text-xl font-bold text-brand-maroon hidden md:block">Admin Panel</h2>
          </div>
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:space-y-2 md:space-x-0 mb-4 md:mb-0">
            <Link href="/admin" className="flex items-center space-x-2 md:space-x-3 text-gray-700 p-2 md:p-3 rounded-lg hover:bg-brand-cream hover:text-brand-maroon transition-colors whitespace-nowrap">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/products" className="flex items-center space-x-2 md:space-x-3 text-gray-700 p-2 md:p-3 rounded-lg hover:bg-brand-cream hover:text-brand-maroon transition-colors whitespace-nowrap">
              <Package size={20} />
              <span>Products</span>
            </Link>
            <Link href="/admin/gallery" className="flex items-center space-x-2 md:space-x-3 text-gray-700 p-2 md:p-3 rounded-lg hover:bg-brand-cream hover:text-brand-maroon transition-colors whitespace-nowrap">
              <ImageIcon size={20} />
              <span>Gallery</span>
            </Link>
          </nav>
        </div>
        
        <div className="pt-4 border-t border-gray-100 md:pt-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
