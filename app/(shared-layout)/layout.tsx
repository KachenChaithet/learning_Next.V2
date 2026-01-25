import Navbar from "@/components/web/Navbar"

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default SharedLayout