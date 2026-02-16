import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Container from "./Container"

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10 bg-gray-100 flex items-center justify-center">
  {children}
</main>
      <Footer />
    </div>
  )
}

export default Layout
