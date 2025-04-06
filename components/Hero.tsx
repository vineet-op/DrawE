"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Paintbrush, Users, Sparkles, Pencil, Image, Share2 } from "lucide-react"

// Custom hook for media query
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        const updateMatch = () => setMatches(media.matches)

        // Set initial value
        updateMatch()

        // Listen for changes
        media.addEventListener("change", updateMatch)

        // Cleanup
        return () => {
            media.removeEventListener("change", updateMatch)
        }
    }, [query])

    return matches
}

export default function Hero() {
    const [mounted, setMounted] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <section className="relative min-h-[90vh] overflow-hidden bg-purple-200">
            {/* Creative background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-200/20 blur-[100px]" />
                <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-200/20 blur-[120px]" />
                <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-pink-200/10 blur-[80px]" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                />
            </div>

            <div className="container relative px-4 md:px-6 py-12 md:py-20">
                {/* Floating elements that appear on both mobile and desktop */}
                <motion.div
                    className="absolute right-[10%] top-[10%] h-12 w-12 rounded-lg bg-purple-400/80 shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 10, 0],
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 5,
                        delay: 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <Pencil className="h-6 w-6" />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute left-[5%] top-[40%] h-10 w-10 rounded-full bg-blue-400/80 shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 6,
                        delay: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <Image className="h-5 w-5" />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-[15%] right-[15%] h-14 w-14 rounded-xl bg-pink-400/80 shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, -10, 0],
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 7,
                        delay: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                >
                    <div className="flex h-full w-full items-center justify-center text-white">
                        <Share2 className="h-7 w-7" />
                    </div>
                </motion.div>

                {/* Main content with creative layout */}
                <div className="mt-12 md:mt-20 flex flex-col items-center">
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles className="mr-2 h-3.5 w-3.5 text-purple-500" />
                        <span>Introducing DrawE Beta</span>
                    </motion.div>

                    {/* Heading with creative styling */}
                    <motion.div
                        className="relative mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="block"
                            >
                                Sketch.
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="block md:inline md:ml-4 text-blue-500"
                            >
                                Collaborate.
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="block md:inline md:ml-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                            >
                                Create.
                            </motion.span>
                        </h1>

                        <motion.p
                            className="mt-6 max-w-[600px] mx-auto text-xl text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            Your visual thinking space in the cloud.
                        </motion.p>
                    </motion.div>

                    {/* Interactive canvas preview */}
                    <motion.div
                        className="relative mt-12 w-full max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1 }}
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-border bg-background/50 shadow-2xl backdrop-blur-sm">
                            {/* Canvas background with gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />

                            <div className="relative p-4 md:p-6">
                                {/* Canvas header */}
                                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-6 w-24 rounded-md bg-muted/50"></div>
                                        <div className="h-6 w-6 rounded-md bg-muted/50"></div>
                                        <div className="h-6 w-6 rounded-md bg-muted/50"></div>
                                    </div>
                                </div>

                                {/* Canvas content - creative drawing area */}
                                <div className="mt-4 grid grid-cols-12 gap-4 h-[300px] md:h-[400px]">
                                    {/* Toolbar */}
                                    <div className="col-span-1 flex flex-col space-y-3">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <motion.div
                                                key={i}
                                                className={`h-8 w-8 rounded-lg ${i === 2 ? "bg-purple-500/80" : "bg-muted/50"}`}
                                                whileHover={{ scale: 1.1 }}
                                            />
                                        ))}
                                    </div>

                                    {/* Drawing area with creative elements */}
                                    <div className="col-span-11 relative rounded-lg bg-white/50">
                                        {/* Simulated drawing elements */}
                                        <motion.div
                                            className="absolute top-[20%] left-[10%] h-20 w-20 rounded-full border-2 border-purple-500"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1.5, duration: 0.5 }}
                                        />

                                        <motion.div
                                            className="absolute top-[30%] left-[40%] h-40 w-40 rounded-lg border-2 border-blue-500"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1.7, duration: 0.5 }}
                                        />

                                        <motion.div
                                            className="absolute bottom-[20%] right-[20%] h-16 w-32 rounded-full bg-pink-200/30"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1.9, duration: 0.5 }}
                                        />

                                        <motion.div
                                            className="absolute top-[15%] right-[15%] h-24 w-24 rounded-lg bg-blue-200/30"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 2.1, duration: 0.5 }}
                                        />

                                        <motion.svg
                                            className="absolute top-[60%] left-[20%]"
                                            width="100"
                                            height="100"
                                            viewBox="0 0 100 100"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ delay: 2.3, duration: 1 }}
                                        >
                                            <motion.path
                                                d="M20,50 Q50,20 80,50 Q50,80 20,50"
                                                fill="none"
                                                stroke="#8b5cf6"
                                                strokeWidth="2"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ delay: 2.3, duration: 1 }}
                                            />
                                        </motion.svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cursor position indicator */}
                        <motion.div
                            className="absolute h-6 w-6 rounded-full border-2 border-purple-500 hidden md:block"
                            initial={{ x: "50%", y: "50%" }}
                            animate={{
                                x: ["50%", "30%", "70%", "40%", "60%", "50%"],
                                y: ["50%", "30%", "60%", "70%", "40%", "50%"],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        >
                            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-purple-500" />
                        </motion.div>
                    </motion.div>

                    {/* CTA buttons with creative styling */}
                    <motion.div
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="relative overflow-hidden group">
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:scale-110" />
                                <Link href="/canvas" className="relative flex items-center px-8 py-2 text-white">
                                    Start Drawing
                                    <Paintbrush className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>

                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        className="mt-12 flex items-center justify-center space-x-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                    >

                    </motion.div>
                </div>
            </div>
        </section>
    )
}

