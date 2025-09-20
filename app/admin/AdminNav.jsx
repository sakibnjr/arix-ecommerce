'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
	const pathname = usePathname();

	const linkClass = (active) =>
		`text-sm px-3 py-2 rounded ${active ? 'bg-black text-white' : 'bg-gray-200 text-gray-900'}`;

	return (
		<nav className="flex gap-4 mb-8">
			<Link href="/admin" className={linkClass(pathname === '/admin')}>Overview</Link>
			<Link href="/admin/orders" className={linkClass(pathname.startsWith('/admin/orders'))}>Orders</Link>
			<Link href="/admin/products" className={linkClass(pathname.startsWith('/admin/products'))}>Products</Link>
			<Link href="/admin/sliders" className={linkClass(pathname.startsWith('/admin/sliders'))}>Sliders</Link>
		</nav>
	);
}


