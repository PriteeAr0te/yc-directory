import z from 'zod'

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(600),
    category: z.string().min(3).max(20),
    imageUrl: z.
        string()
        .url()
        .refine(async (url) => {
            try {
                const res = await fetch(url, { method: 'HEAD' });
                const contentType = res.headers.get("content-type");
                return (contentType?.startsWith('image/'))
            } catch (error) {
                return false;
                console.log(error)
            }
        }),
    pitch: z.string().min(10)
})