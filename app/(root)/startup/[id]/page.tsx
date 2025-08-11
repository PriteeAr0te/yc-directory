import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <section className='w-full bg-primary pattern flex justify-center items-center flex-col py-10 px-6 !min-h-[230px]'>
        <p className='bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri'>{formatDate(post?._createdAt)}</p>

        <h1 className='uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5'>{post?.title}</h1>
        <p className='font-medium text-[20px] text-white text-center break-words !max-w-5xl'>{post?.description}</p>
      </section>

      <section className='px-6 py-10 max-w-7xl mx-auto'>
        <div className='w-full flex justify-center items-center'>
          <Image src={post?.image} alt={post?.title} height={400} width={400} className='h-auto rounded-xl border' />
        </div>

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex justify-between items-center gap-5'>
            <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3' >
              <Image src={post.author.image} alt={post.author.name} width={64} height={64} />
              <div>
                <p className='font-medium text-[20px] text-black'> {post.author.name} </p>
                <p className='font-medium text-[16px] text-black-300'> @{post.author.username} </p>
              </div>
            </Link>

            <p className='font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full'>{post.category}</p>
          </div>

          <h3 className='text-[30px] font-bold text-black'>Startup Details</h3>
          {parsedContent ? (
            <article
              className='prose max-w-4xl break-all font-work-sans'
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className='text-black-100 text-sm font-normal'>No details provided.</p>
          )}
        </div>

        <hr className='border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto' />

        <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3' />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  )
}

export default page