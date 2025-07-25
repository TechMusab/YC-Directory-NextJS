import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut, signIn } from '@/auth';

export default async function Navbar() {
    const session = await auth();

    return (
        <header className="px-5 py-3 shadow-sm font-work-sans bg-white">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5">
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/' });
                            }}>
                                <button type="submit">
                                    <span>Log out</span>
                                </button>
                            </form>

                            <Link href={`/user/${session.id}`}>
                                <span>{session.user.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            'use server';
                            await signIn('github');
                        }}>
                            <button className='text-black' type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
}
