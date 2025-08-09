import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const { _createdAt, views, author, title, description, category, _id, image } = post;
    const authorId = author?._id;
    const name = author?.name;

    return (
        <li className='startup-card bg-white border-[5px] border-black py-5 px-4 rounded-[22px] shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 group'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100'>
                    {formatDate(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span className='font-medium text-[16px] text-black'>{views}</span>
                </div>
            </div>

            <div className='flex justify-between items-center mt-4 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${authorId}`}>
                        <p className='font-medium text-[16px] text-black line-clamp-1'>
                            {name}
                        </p>
                    </Link>

                    <Link href={`/startup/${_id}`}>
                        <h3 className='font-semibold text-[26px] text-black line-clamp-1'>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${authorId}`}>
                    <Image src="https://placehold.co/48x48" alt='placeholder' width={48} height={48} className='rounded-full' />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className='font-normal text-[16px] line-clamp-2 mt-2 mb-3 text-black-100 break-all'>
                    {description}
                </p>
                <Image src={image ?? "https://placehold.co/350x160"} alt='placeholder' height={160} width={350} className='w-full h-[164px] rounded-[10px] object-cover' />
            </Link>

            <div className='flex justify-between items-center gap-3 mt-5'>
                <Link href={`/?query=${(category ?? '').toLowerCase()}`}>
                    <p className='font-medium text-[16px] text-black'>{category ?? 'Uncategorized'}</p>
                </Link>
                <Button className='rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3 !important' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard