'use client';
import { userAPI } from "@/response/user.";
import { Button } from "@/components/ui/button";
import { UserType  } from "@/types/user";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user,setUser] = useState<UserType>();
  const fetchData = async () => {
    const res = await userAPI.me();
    console.log(res);
    setUser(res.payload.user);
  }
  useEffect(() => {
    fetchData();
  },[])

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-lg flex items-center gap-2">MyApp</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <User size={18} />
          <span>Hi, {user?.name}</span>
        </div>
        <form action="/api/auth/logout" method="POST">
          <Button type="submit" variant="outline" className="flex items-center gap-2">
            <LogOut size={18} />
            Logout
          </Button>
        </form>
      </div>
    </nav>
  );
}
