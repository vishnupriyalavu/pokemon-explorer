import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

function Container({ children }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {children}
    </div>
  )
}

export default Container
