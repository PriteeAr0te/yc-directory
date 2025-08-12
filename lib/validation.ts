import z from 'zod'

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(600),
    category: z.string().min(3).max(20),
    // link: z.
    //     string()
    //     .url()
    //     .refine(async (url) => {
    //         try {
    //             const res = await fetch(url, { method: 'HEAD' });
    //             const contentType = res.headers.get("content-type");
    //             return (contentType?.startsWith('image/'))
    //         } catch (error) {
    //             return false;
    //             console.log(error)
    //         }
    //     }),
    link: z
        .string()
        .url()
        .refine(url => /\.(jpg|jpeg|png|gif|webp)$/i.test(url), {
            message: "Must be a valid image URL",
        }),
    pitch: z.string().min(10)
})