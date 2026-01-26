"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth()

    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('logout success')
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <header className="sticky top-0 z-50 border-b border-neutral-400/20  ">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-semibold ">
                    Next<span className="text-blue-500">Pro</span>
                </Link>


                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-6">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium "
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {isLoading ? null : isAuthenticated ? (
                    <Button onClick={() => handleLogout()}>Logout</Button>
                ) : (
                    <ul className="flex gap-4">
                        <li >
                            <Link href={'auth/login'} className={buttonVariants()}>
                                Login
                            </Link>
                        </li>
                        <li >
                            <Link href={'auth/sign-up'} className={buttonVariants()}>
                                Sign up
                            </Link>
                        </li>
                        <li >
                            <ModeToggle />

                        </li>

                    </ul>
                )}
            </div>


        </header >
    );
}
