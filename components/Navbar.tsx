import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, signOut, signIn } from '../app/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { BadgePlus, LogOut } from 'lucide-react'

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
                                <span className='hidden sm:block'>Create</span>
                                <BadgePlus className='block sm:hidden size-6' />
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: '/' })
                            }}
                            >
                                <span className='hidden sm:block'>logout</span>
                                <LogOut className='block sm:hidden size-6' />
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
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