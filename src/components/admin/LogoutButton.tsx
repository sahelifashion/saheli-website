"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to logout:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center space-x-2 md:space-x-3 text-red-600 hover:bg-red-50 p-2 md:p-3 rounded-lg transition-colors whitespace-nowrap w-full text-left cursor-pointer disabled:opacity-50 mt-auto"
    >
      <LogOut size={20} />
      <span>{loading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
