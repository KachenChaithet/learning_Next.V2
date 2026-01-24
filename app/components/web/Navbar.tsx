"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

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

    return (
        <header className="sticky top-0 z-50 border-b bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-semibold text-gray-900">
                    Next<span className="text-blue-500">Pro</span>
                </Link>


                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-6">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <ul className="flex gap-4">
                    <li >
                        <Link href={'auth/login'} className={buttonVariants({ variant: "outline" })}>
                            Login
                        </Link>
                    </li>
                    <li >
                        <Link href={'auth/register'} className={buttonVariants({ variant: 'outline' })}>
                            Sign up
                        </Link>
                    </li>

                </ul>
            </div>


        </header >
    );
}
