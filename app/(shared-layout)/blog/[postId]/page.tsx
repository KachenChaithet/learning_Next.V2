import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CommentSection from "@/components/web/CommentSection"
import PostPresence from "@/components/web/PostPresence"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { fetchQuery, preloadQuery } from "convex/nextjs"
import { ArrowLeft, PoundSterling } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


interface PostIdRouteProps {
    params: Promise<{ postId: Id<"posts"> }>
}

export const generateMetadata = async ({ params }: PostIdRouteProps): Promise<Metadata> => {
    const { postId } = await params


    const post = await fetchQuery(api.post.getPostById, { postId })

    if (!post) {
        return {
            title: "Post not found"
        }
    }
    return {
        title: post.title,
        description: post.body
    }
}

const PostIdRoute = async ({ params }: PostIdRouteProps) => {
    const { postId } = await params
    const [post, preloadedComments, userId] = await Promise.all([
        await fetchQuery(api.post.getPostById, { postId: postId }),
        await preloadQuery(api.comments.getCommentsByPost, {
            postId
        }),

        await fetchQuery(api.presence.getUserId, {})

    ])
    console.log(userId);


    if (!post) {
        return (
            <div className="">
                <h1 className="text-6xl font-extrabold text-red-500 p-20">not found</h1>
            </div>
        )
    }
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
            <Link href={'/blog'} className={buttonVariants({ variant: 'outline', className: 'mb-4' })}>
                <ArrowLeft className="size-4" />
                back to blog
            </Link>

            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
                <Image
                    src={post.imageUrl || "/Successful-Blogging-Space-Topics-.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                />

            </div>

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl font-bold tracking-tighter text-foreground">{post.title}</h1>
                <p className="text-sm text-muted-foreground">Post on: {new Date(post._creationTime).toLocaleDateString()}</p>

                {userId && <PostPresence roomId={post._id} userId={userId} />}
            </div>

            <Separator className="my-8 bg-muted-foreground" />
            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>

            <Separator className="my-8 bg-muted-foreground" />

            <CommentSection preloadedComments={preloadedComments} />

        </div>

    )
}
export default PostIdRoute