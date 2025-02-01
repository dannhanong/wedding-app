"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { isAuthenticated } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/auth/login");
        }
    }, [router]);

    return (
        <html lang="en">
            <body>
                {isAuthenticated() ? (
                    <div className="min-h-screen flex flex-col">
                        <div className="flex flex-1">
                            <Sidebar onToggle={setIsSidebarOpen} />
                            <main
                                className={`flex-1 bg-gray-100 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
                                    }`}
                            >
                                {children}
                            </main>
                        </div>
                    </div>
                ) : (
                    <>{children}</>
                )}
            </body>
        </html>
    );
}