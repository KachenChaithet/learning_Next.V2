
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
// import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"


const BlogPage = async () => {

    // const data = useQuery(api.post.getPost)
    const data = await fetchQuery(api.post.getPost)

    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Out Blog</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insigts, thoughs and trends from out team.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  ">
                {data?.map((item) => (
                    <Card key={item._id} className="p-0 overflow-hidden min-h-105">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src="/Successful-Blogging-Space-Topics-.jpg"
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
        </div>
    )
}
export default BlogPage