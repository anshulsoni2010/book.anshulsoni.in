'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Users, Twitter, Menu, X, Star, Book, Laptop, Globe, ShoppingCart, Zap, Target, Coffee, Rocket, GraduationCap, Database, CheckCircle } from 'lucide-react';
import BookCover from "./assets/JS Mastery in 100 Days.png"
import googlebooksicon from './assets/google-books.webp'
import amazonbooksicon from './assets/amazon-kindle.webp'
import author from './assets/anshul.png'
import js from './assets/js.png'
import BlurIn from '@/components/ui/blur-in'
import PBlurIn from '@/components/ui/p-blur'
import DiscountPopup from "@/components/ui/popup";
const supportMethods = [
    {
        title: "Share on Social Media",
        description: "Spread the word by posting about the book on platforms like X (Twitter), LinkedIn, or Instagram. (also mail me so that I won't miss your post - hi@anshulsoni.in or anshulsoni2022@gmail.com ) ",
        icon: <Twitter className="w-8 h-8 text-blue-600" />
    },
    {
        title: "Write a Review",
        description: "Honest reviews help others make a choice. Leave a review on Amazon or Google Books.",
        icon: <Star className="w-8 h-8 text-yellow-600" />
    },
    {
        title: "Buy Me a Coffee",
        description: "Every bit of support goes a long way! Show appreciation with a small gesture.",
        icon: <Coffee className="w-8 h-8 text-brown-600" />
    },
    {
        title: "Join CodeINBlogs Community",
        description: "Connect with other readers working on projects and sharing progress.",
        icon: <Users className="w-8 h-8 text-green-600" />
    },
    {
        title: "Build and Share a Project",
        description: "Take any project from the book, build it, and share it online!",
        icon: <Laptop className="w-8 h-8 text-gray-600" />
    },
    {
        title: "Recommend the Book",
        description: "Let someone know about the book. A small step that could make a big difference.",
        icon: <BookOpen className="w-8 h-8 text-orange-600" />
    },
    {
        title: "Be Featured on My Socials",
        description: "Share your journey with the book, and I’d love to feature you on my social media.",
        icon: <Globe className="w-8 h-8 text-blue-500" />
    },
];

const RotatingBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-pink-300 animate-gradient-rotate" />
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
    </div>
)

const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500 rounded-full"
                initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                animate={{
                    x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                    y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                }}
                transition={{
                    duration: 10 + Math.random() * 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />
        ))}
    </div>
)

const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState<number>(0)
    const nodeRef = useRef<HTMLSpanElement | null>(null)
    const inView = useInView(nodeRef, { once: true, margin: "-100px" })

    useEffect(() => {
        if (inView) {
            let startTime: number
            const animateCount = (timestamp: number) => {
                if (!startTime) startTime = timestamp
                const progress = timestamp - startTime
                const percentage = Math.min(progress / duration, 1)
                setCount(Math.floor(percentage * target))
                if (percentage < 1) {
                    requestAnimationFrame(animateCount)
                }
            }
            requestAnimationFrame(animateCount)
        }
    }, [inView, target, duration])

    return <span ref={nodeRef}>{count}</span>
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col items-center p-6 text-center h-full">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </CardContent>
    </Card>
)

// Support Popup Component
const SupportPopup = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
    >
        <h2 className="text-3xl font-bold mb-4 text-center">Support the Book</h2>

        <div className='border border-gray-200 rounded-lg p-4 mx-auto my-4 w-fit'>
            <p className=" text-xl font-bold text-gray-800 mb-4"> Some useful links :</p>
            <div className=" grid md:grid-cols-2 gap-8">
                <span className="flex items-center">
                    <Globe className="text-xl text-orange-700 mx-2" />
                    <a href="https://x.com/anshulsoni2010" className="hover:text-orange-500 text-blue-700 transition-colors">X (Formerly Twitter)</a></span>
                <span className="flex items-center">
                    <Globe className="text-xl text-orange-700 mx-2" />
                    <a href="https://Instagram.com/anshulsoni2010" className="hover:text-orange-500 transition-colors text-blue-700">Instagram</a></span>
                <span className="flex items-center">
                    <Globe className="text-xl text-orange-700 mx-2" />
                    <a href="https://buymeacoffee.com/anshulsoni2010" className="hover:text-orange-500 transition-colors text-blue-700">Buy Me A Coffee</a></span>
                <span className="flex items-center">
                    <Globe className="text-xl text-orange-700 mx-2" />
                    <a href="https://linktr.ee/anshulsoni2010" className="hover:text-orange-500 transition-colors text-blue-700">Anshul Linktree</a></span>
                <span className="flex items-center">
                    <Globe className="text-xl text-orange-700 mx-2" />
                    <a href="https://linktr/codeinblogscommunity" className="hover:text-orange-500 transition-colors text-blue-700">CodeINBlogs Linktree</a></span>
                <span className="flex items-center">
                    <Globe className="text-xl text-orange-700 mx-2" />
                    <a href="http://book.anshulsoni.in" className="hover:text-orange-500 transition-colors text-blue-700">JavaScript Mastery in 100 Days Page</a></span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportMethods.map((method, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                        {method.icon}
                        <h3 className="text-xl font-semibold ml-2">{method.title}</h3>
                    </div>
                    <p className="text-gray-700">{method.description}</p>
                </div>
            ))}
        </div>
        <p className="text-gray-700 text-sm mt-4">
            Your support can make a big difference!
        </p>
        <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={onClose}
        >
            <X className="w-6 h-6" />
        </button>
    </motion.div >
)

// Get Your Copy Popup Component
const GetYourCopyPopup = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
    >
        <h2 className="text-3xl font-bold mb-4 text-center">Choose Your Platform</h2>
        <p className="text-center text-gray-700 mb-6">Google Books is our recommended platform for the best reading experience!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="hover:shadow-lg hover:shadow-blue-300 transition-shadow shadow-blue-500 bg-blue-50 duration-300">
                <CardContent className="flex flex-col items-center p-4">
                    <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm font-medium mb-2">Recommended</div>
                    <Image
                        src={googlebooksicon}
                        alt="Google Play Books"
                        width={80}
                        height={80}
                        className="mb-2"
                    />
                    <h3 className="mb-2 text-center font-semibold">Google Play Books</h3>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            onClick={() => window.open('https://play.google.com/store/books/details?id=9JksEQAAQBAJ', '_blank')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                        >
                            Buy Now
                        </Button>
                        <p className="text-xs text-blue-700 text-center">Best reading experience across all devices</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:shadow-orange-300 transition-shadow shadow-orange-500 bg-orange-50 duration-300">
                <CardContent className="flex flex-col items-center p-4">
                    <div className="bg-orange-100 px-3 py-1 rounded-full text-orange-700 text-sm font-medium mb-2">Available on Kindle</div>
                    <Image
                        src={amazonbooksicon}
                        alt="Amazon Kindle Store"
                        width={80}
                        height={80}
                        className="mb-2"
                    />
                    <h3 className="mb-2 text-center font-semibold">Amazon Kindle Store</h3>
                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            onClick={() => window.open('https://amzn.in/d/g4EaFJT', '_blank')}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2"
                        >
                            Buy Now
                        </Button>
                        <p className="text-xs text-orange-700 text-center">Read on your favorite Kindle device</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-center">Why Choose Google Books?</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Seamless synchronization across all devices
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Enhanced reading features and better code formatting
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Built-in dictionary and note-taking capabilities
                    </li>
                </ul>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-center">Why Choose Amazon Kindle?</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                        Read on dedicated Kindle e-readers
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                        Access through the Kindle app on any device
                    </li>
                    <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                        Sync progress across all your devices
                    </li>
                </ul>
            </div>
        </div>
        <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={onClose}
        >
            <X className="w-6 h-6" />
        </button>
    </motion.div>
)

export default function LandingPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isGetYourCopyOpen, setIsGetYourCopyOpen] = useState(false) // New state for Get Your Copy popup
    const [popupClicks, setPopupClicks] = useState(0)
    const popupRef = useRef<HTMLDivElement | null>(null) // Specify the type for the ref
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
    const [hasVisited, setHasVisited] = useState(false); // State to track if the user has visited

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setPopupClicks(prevClicks => prevClicks + 1)
            } else {
                setPopupClicks(0)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (popupClicks >= 2) {
            setIsPopupOpen(false)
            setPopupClicks(0)
        }
    }, [popupClicks])

    useEffect(() => {
        const handleUserActivity = () => {
            if (!hasVisited) {
                setTimeout(() => {
                    setIsDiscountPopupOpen(true);
                }, 10000); // Show popup after 10 seconds of user activity
            }
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, [hasVisited]);

    useEffect(() => {
        const visited = localStorage.getItem('hasVisited');
        if (visited) {
            setHasVisited(true); // User has already visited
        } else {
            localStorage.setItem('hasVisited', 'true'); // Set visited in local storage
        }
    }, []);

    // Function to close the discount popup
    const closeDiscountPopup = () => {
        setIsDiscountPopupOpen(false);
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-white text-gray-800 overflow-hidden font-sans bg-center bg-cover">
            <RotatingBackground />
            <FloatingParticles />

            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container px-12 mx-auto py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2" aria-label="Go to homepage">
                        <BookOpen className="w-12 h-12 text-orange-600"/>
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        {['About', 'Content', 'Author'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-600 hover:text-orange-600 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:from-orange-700 hover:to-pink-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg" // Added shadow and scale effect
                        onClick={() => setIsGetYourCopyOpen(true)} // Open Get Your Copy popup
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Get Your Copy
                    </Button>
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <nav className="flex flex-col items-center space-y-6">
                            {['About', 'Content', 'Author'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-2xl text-gray-800 hover:text-orange-600 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:from-orange-700 hover:to-pink-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg" // Added shadow and scale effect
                                onClick={() => {
                                    setIsGetYourCopyOpen(true) // Open Get Your Copy popup
                                    setIsMenuOpen(false)
                                }}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Get Your Copy
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow">
                <section className="relative py-20 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <motion.div
                                className="md:w-1/2 text-center md:text-left"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >

                                <BlurIn
                                    word="JavaScript Mastery in 100 Days"
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text"

                                />

                                <PBlurIn
                                    word="Master the fundamentals of JavaScript through engaging lessons, practical exercises, and real-world projects designed for aspiring developers."
                                    className="text-xl mb-8 text-gray-700"
                                />
                                <motion.div
                                    className="space-y-4 md:space-y-0 md:space-x-4"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-white text-orange-600 hover:bg-orange-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                        onClick={() => setIsGetYourCopyOpen(true)} // Open Get Your Copy popup
                                    >
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Get Your Copy Now
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white  bg-orange-200 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-orange-600 text-orange-600"
                                        onClick={() => setIsPopupOpen(true)} // Open Support popup
                                    >
                                        <BookOpen className="w-5 h-5 mr-2" />
                                        Support Me
                                    </Button>
                                </motion.div>

                            </motion.div>
                            <motion.div
                                className="md:w-1/2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="relative w-full justify-center max-w-md mx-auto">
                                    <Image
                                        src={BookCover}
                                        alt="JavaScript Mastery Book Cover"
                                        width={400}
                                        height={500}
                                        className="rounded-lg mx-auto shadow-2xl"
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 opacity-20 rounded-lg"
                                        animate={pulseAnimation}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="about" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <motion.div
                                className="md:w-1/2"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src={js}
                                    alt="About the Book"
                                    width={400}
                                    height={400}
                                    className="rounded-lg shadow-lg"
                                />
                            </motion.div>
                            <motion.div
                                className="md:w-1/2"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
                                    About the Book
                                </h2>
                                <p className="text-gray-700 mb-6">
                                    "JavaScript Mastery in 100 Days" is your comprehensive guide to becoming a proficient JavaScript developer. This book is designed to take you from a beginner to an advanced level, covering everything from basic syntax to complex concepts like asynchronous programming and modern ES6+ features.
                                </p>
                                <p className="text-gray-700 mb-6">
                                    With a perfect blend of theory and practice, each day brings new challenges and hands-on projects that reinforce your learning. By the end of this 100-day journey, you'll have the skills and confidence to build robust, efficient, and modern web applications.
                                </p>
                                <p className="text-gray-700">
                                    Whether you're a complete beginner or looking to solidify your JavaScript knowledge, this book provides a structured path to mastery, ensuring you're job-ready and capable of tackling real-world development challenges.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="highlights" className="py-20 bg-orange-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
                            Why Choose This Book?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: GraduationCap, title: "Comprehensive Learning Path", description: "Dive into structured lessons covering basics to advanced concepts. In 100 days, build a solid JavaScript foundation for real-world applications." },
                                { icon: Laptop, title: "Hands-On Projects", description: "Experience coding with engaging projects that reinforce learning. Build apps like a weather app and interactive galleries, with clear code snippets guiding you." },
                                { icon: Users, title: "Accessible to All", description: "No prior experience needed! This book uses clear language, relatable examples, and proper code snippets to simplify complex topics for beginners and refresh skills." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <FeatureCard {...item} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="content" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
                            What You'll Learn
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { icon: Code, text: "Understand core JavaScript concepts" },
                                { icon: Code, text: "Master function definitions and usage" },
                                { icon: Code, text: "Work with arrays and objects" },
                                { icon: Zap, text: "Explore asynchronous JavaScript techniques" },
                                { icon: Users, text: "Gain skills in DOM manipulation" },
                                { icon: Laptop, text: "Build real-world projects like a To-Do list and a weather app" },
                                { icon: Star, text: "Discover advanced concepts like design patterns and modularization" },
                                { icon: CheckCircle, text: "Learn how to optimize performance and implement security best practices" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center space-x-4"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-gray-700">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="author" className="py-20 bg-orange-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
                            About the Author
                        </h2>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="md:w-1/3"
                            >
                                <Image
                                    src={author}
                                    alt="Author"
                                    width={300}
                                    height={300}
                                    className="rounded-full shadow-lg"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="md:w-2/3"
                            >
                                <h3 className="text-2xl font-semibold mb-4">Anshul Soni</h3>
                                <p className="text-gray-700 mb-4">
                                    Anshul Soni, a 14-year-old full-stack developer and UI/UX designer, is the founder of CodeINBlogs, one of the fastest-growing communities for developers. As an author of JavaScript Mastery in 100 Days, he brings a wealth of coding expertise to aspiring developers. Anshul is also an organizer of hackathons, a speaker at DevFest 2023, and has been featured in various news outlets for his work and contributions in tech.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <Link href="https://twitter.com/anshulsoni2010" target="_blank" className="text-gray-600 hover:text-gray-800 transition-colors">
                                        <Twitter className="w-6 h-6" />
                                    </Link>
                                    <Link href="https://anshulsoni.in" target="_blank" className="text-gray-600 hover:text-gray-800 transition-colors">
                                        <Globe className="w-6 h-6" />
                                    </Link>
                                    <Link href="buymeacoffee.com/anshulsoni2010" target="_blank" className="text-gray-600 hover:text-gray-800 transition-colors">
                                        <Coffee className="w-6 h-6" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="cta" className="py-20 bg-gradient-to-r from-orange-600 to-pink-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                                Start Your JavaScript Mastery Journey Today
                            </h2>
                            <p className="text-xl mb-8 max-w-2xl mx-auto text-white opacity-90">
                                Transform your coding skills and become a JavaScript expert in just 100 days!
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {[
                                { icon: CheckCircle, text: "Comprehensive curriculum" },
                                { icon: Rocket, text: "Hands-on projects" },
                                { icon: Users, text: "Community support" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center text-white">
                                    <item.icon className="w-6 h-6 mr-2" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </motion.div>
                        <motion.div
                            className="space-y-4 md:space-y-0 md:space-x-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Button
                                size="lg"
                                className="bg-white text-orange-600 hover:bg-orange-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                onClick={() => setIsGetYourCopyOpen(true)} // Open Get Your Copy popup
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Get Your Copy Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white  hover:bg-white hover:text-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => setIsPopupOpen(true)} // Open Support popup
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Support Me
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                        <svg
                            className="relative block w-full h-[100px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="#ffffff"
                                fillOpacity="1"
                                d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                            ></path>
                        </svg>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold text-orange-600 mb-2">
                                    <AnimatedCounter target={100} duration={2000} />+
                                </div>
                                <p className="text-gray-700">Coding Exercises</p>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold text-pink-600 mb-2">
                                    <AnimatedCounter target={15} duration={2000} />+
                                </div>
                                <p className="text-gray-700">Real-world Projects</p>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold text-orange-600 mb-2">
                                    <AnimatedCounter target={24} duration={2000} />/7
                                </div>
                                <p className="text-gray-700">Community Support</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="newsletter" className="py-20 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                        <p className="text-gray-700 mb-4">Stay updated with the latest news and offers!</p>
                        <div className="flex justify-center">
                            <form action="https://formcarry.com/s/0mtR_Q253s_"
                                method="POST"
                                encType="multipart/form-data"
                                className="flex flex-col md:flex-row gap-4 items-center"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    className="border border-gray-300 rounded-md md:rounded-r-none p-2 w-64"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    className="border border-gray-300 rounded-md md:rounded-none p-2 w-64"
                                />
                                <button
                                    className="bg-orange-600 text-white rounded-md md:rounded-l-none p-2 hover:bg-orange-700 transition duration-300 w-64 md:w-auto"
                                    type="submit"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-100 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {isPopupOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <SupportPopup onClose={() => setIsPopupOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isGetYourCopyOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <GetYourCopyPopup onClose={() => setIsGetYourCopyOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Discount Icon */}
            <button
                className="fixed bottom-4 right-4 bg-orange-600 text-white rounded-full p-3 shadow-lg hover:bg-orange-700 transition"
                onClick={() => setIsDiscountPopupOpen(true)} // Open popup on click
            >
                <ShoppingCart className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isDiscountPopupOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <DiscountPopup onClose={closeDiscountPopup} onApplyCoupon={() => { /* handle coupon application */ }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
