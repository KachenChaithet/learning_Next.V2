import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex justify-center items-center relative">
            <div className="absolute top-5 left-5">
                <Link href={'/'} className={`${buttonVariants({ variant: 'outline' })} flex items-center gap-2`}>
                    <ArrowLeft className="size-4" />
                    Go back
                </Link>
            </div>

            {children}
        </div>
    )
}

export default AuthLayout