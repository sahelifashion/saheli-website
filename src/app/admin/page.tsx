import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif text-brand-maroon mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-gray-600 mb-6">Manage your shop's inventory, create new products, and edit existing ones.</p>
          <Link href="/admin/products" className="bg-brand-maroon text-white px-6 py-2 rounded-[4px] hover:bg-brand-maroon/90 transition-colors">
            Manage Products
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-2">Gallery</h3>
          <p className="text-gray-600 mb-6">Upload and manage images for the public gallery showcase.</p>
          <Link href="/admin/gallery" className="bg-brand-maroon text-white px-6 py-2 rounded-[4px] hover:bg-brand-maroon/90 transition-colors">
            Manage Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
