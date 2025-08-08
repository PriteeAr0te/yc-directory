import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, signOut, signIn } from '../app/auth'

const Navbar = async () => {
    const session = await auth()

    return (
        <header className='px-5 py-2 bg-gray-100 text-slate-950 shadow-sm font-work-sans'>
            <nav className='w-full flex justify-between items-center'>
                <Link href='/' className='mr-2'>
                    <Image src='/logo.png' alt='Logo' height={35} width={144} />
                </Link>

                <div className='flex items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: '/' })
                            }}
                            >
                                <button type='submit'>Logout</button>
                            </form>

                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                "use server"

                                await signIn('github')
                            }}>
                                <button type='submit'>Login</button>
                            </form>
                        </>
                    )}
                </div>
            </nav >
        </header >
    )
}

export default Navbar