"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isNewsDetail, setIsNewsDetail] = useState(false)

  useEffect(() => {
    setIsNewsDetail(pathname.includes("/news/"))
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        y: isNewsDetail ? 20 : 0,
        scale: isNewsDetail ? 0.98 : 1,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: isNewsDetail ? -20 : 0,
        scale: isNewsDetail ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  )
}

