"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

const BlogPage = () => {

    const data = useQuery(api.post.getPost)

    return (
        <div>{data?.map((item) => (
            <div className="" key={item._id} >
                title: {item.title} - content: {item.body}
            </div>
        ))}</div>
    )
}
export default BlogPage