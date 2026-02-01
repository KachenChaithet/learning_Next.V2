import { Loader2, Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"

const SearchInput = () => {
    const [term, setTerm] = useState('')
    const [open, setOpen] = useState(false)
    const results = useQuery(
        api.post.searchPosts, term.length >= 2 ? { limit: 5, term } : 'skip')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value)
        setOpen(true)
    }

    return (
        <div className="relative w-full max-w-sm">
            {/* Input */}
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
                value={term}
                onChange={handleInputChange}
                type="search"
                placeholder="Search post..."
                className="w-full pl-9 bg-background"
            />

            {/* Dropdown */}
            {open && term.length > 2 && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
                    {results === undefined ? (
                        <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            Searching...
                        </div>
                    ) : results.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                            No results found
                        </div>
                    ) : (
                        <ul className="max-h-64 overflow-y-auto py-1">
                            {results.map((post) => (
                                <li key={post._id}>
                                    <Link
                                        href={`/blog/${post._id}`}
                                        className="block px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => {
                                            setOpen(false)
                                            setTerm("")
                                        }}
                                    >
                                        <p className="font-medium truncate">{post.title}</p>
                                        <p className="text-xs text-muted-foreground pt-1">{post.body.substring(0, 60)}</p>

                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>

    )
}
export default SearchInput