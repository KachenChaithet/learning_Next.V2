import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 space-y-4">
            <Skeleton className="h-10 w-24 bg-muted animate-pulse" />
            <Skeleton className="h-[440px] w-[750px] bg-muted animate-pulse" />
            <div className="space-y-4">

                <Skeleton className="h-12 w-3/4 bg-muted animate-pulse" />
                <Skeleton className="h-14 w-32 bg-muted animate-pulse" />
            </div>
            <div className="mt-8 space-y-">
                <Skeleton className="h-4 w-full bg-muted animate-pulse" />
                <Skeleton className="h-4 w-full bg-muted animate-pulse" />
                <Skeleton className="h-4 w-2/3 bg-muted animate-pulse" />

            </div>
        </div>
    )
}
export default loading