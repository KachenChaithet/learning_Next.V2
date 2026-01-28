import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
// import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export const revalidate = 60;

// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const BlogPage = () => {



    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Out Blog</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insigts, thoughs and trends from out team.</p>
            </div>

            <Suspense fallback={<SkeletonLoadingUi />}>
                <LoadBlogList />
            </Suspense>


        </div>
    )
}
export default BlogPage

const LoadBlogList = async () => {
    await new Promise(res => setTimeout(res, 3000))
    const data = await fetchQuery(api.post.getPost)

    console.log(data);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  ">
            {data?.map((item) => (
                <Card key={item._id} className="p-0 overflow-hidden min-h-105">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={item.imageUrl ?? '/Successful-Blogging-Space-Topics-.jpg'}
                            alt="image"
                            fill
                            className="object-cover hover:scale-110 transition duration-300"
                            priority
                        />
                    </div>

                    <CardContent>
                        <Link href={`/blog/${item._id}`}>
                            <h1 className="text-2xl font-bold hover:text-primary">{item.title}</h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{item.body}</p>
                    </CardContent>
                    <CardFooter
                    >
                        <Link className={buttonVariants({
                            className: 'w-full'
                        })} href={`/blog/${item._id}`}>
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

const SkeletonLoadingUi = () => {

    return (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 ">
            {[...Array(6)].map((_, i) => (
                <div className="flex flex-col space-y-3" key={i}>
                    <Skeleton className="h-48 w-full rounded-xl animate-pulse rounded-md bg-muted" />
                    <div className="space-y-2 flex flex-col">
                        <Skeleton className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />
                        <Skeleton className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        <Skeleton className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    )

}