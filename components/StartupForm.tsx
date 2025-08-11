"use client"

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    interface FormState {
        error: string;
        status: string;
    }

    const handleFormSubmit = async (prevState: FormState, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                imageUrl: formData.get('image-url') as string,
                pitch
            }

            await formSchema.parseAsync(formValues);

            console.log(formValues);

            // const result = await createIdea(prevState, formData, pitch);

            // console.log(result);

            // if (result.status === 'SUCCESS') {
            //     router.push(`/startup/${result.id}`)
            // }

            // return result;

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);
                //toast

                return { ...prevState, error: 'Validation Failed', status: 'ERROR' };
            }

            //toast

            return {
                ...prevState,
                error: 'An unexpexted error has occured',
                status: 'ERROR',
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    });


    return (
        <form action={formAction} className='max-w-2xl mx-auto bg-white my-10 space-y-8 px-6'>
            <div>
                <label htmlFor='title' className='font-bold text-[18px] text-black uppercase'>
                    Title
                </label>

                <Input
                    id="title"
                    name="title"
                    className='border-[3px] border-black px-5 py-6 text-[18px] text-black font-semibold rounded-xl mt-1.5 placeholder:text-black-300'
                    required
                    placeholder="Startup Title" />
                {errors.title &&
                    <p className='text-red-500 mt-1.5 ml-4'>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor='description' className='font-bold text-[18px] text-black uppercase'>
                    Description
                </label>

                <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    className='border-[3px] border-black px-5 py-6 text-[18px] text-black font-semibold rounded-xl mt-1.5 placeholder:text-black-300'
                    required
                    placeholder="Startup Description" />
                {errors.description &&
                    <p className='text-red-500 mt-1.5 ml-4'>{errors.description}</p>}
            </div>

            <div>
                <label htmlFor='category' className='font-bold text-[18px] text-black uppercase'>
                    Category
                </label>

                <Input
                    id="category"
                    name="category"
                    className='border-[3px] border-black px-5 py-6 text-[18px] text-black font-semibold rounded-xl mt-1.5 placeholder:text-black-300'
                    required
                    placeholder="Startup Category (Tech, Health, Education...)" />
                {errors.category &&
                    <p className='text-red-500 mt-1.5 ml-4'>{errors.category}</p>}
            </div>

            <div>
                <label htmlFor='image-url' className='font-bold text-[18px] text-black uppercase'>
                    Image Link
                </label>

                <Input
                    id="image-url"
                    name="image-url"
                    className='border-[3px] border-black px-5 py-6 text-[18px] text-black font-semibold rounded-xl mt-1.5 placeholder:text-black-300'
                    required
                    placeholder="Startup Image URL" />
                {errors.imageUrl &&
                    <p className='text-red-500 mt-1.5 ml-4'>{errors.imageUrl}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor='pitch' className='font-bold text-[18px] text-black uppercase'>
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                    onChange={(value) => setPitch(value as string)}
                />
                {errors.pitch &&
                    <p className='text-red-500 mt-1.5 ml-4'>{errors.pitch}</p>}
            </div>

            <Button type='submit' className='bg-primary border-[3px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px] !important text-white' disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit your startup'}
                <Send className='size-6 ml-2 ' />
            </Button>
        </form>
    )
}

export default StartupForm