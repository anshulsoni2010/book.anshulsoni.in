import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "JavaScript Mastery in 100 Days | Learn JavaScript from Scratch",
    description: "Master JavaScript through 100 days of structured learning. Perfect for beginners with hands-on projects, exercises, and real-world applications. Written by Anshul Soni.",
    keywords: [
        "JavaScript",
        "programming",
        "web development",
        "coding",
        "JavaScript Mastery in 100 Days by Anshul",
        "coding books",
        "learn JavaScript",
        "JavaScript book",
        "JavaScript tutorial",
        "JavaScript course",
        "Anshul Soni",
        "coding exercises",
        "programming projects",
    ],
    authors: [{ name: "Anshul Soni", url: "https://anshulsoni.in" }],
    creator: "Anshul Soni",
    publisher: "Anshul Soni",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://book.anshulsoni.in'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "JavaScript Mastery in 100 Days",
        description: "Transform your coding journey with comprehensive JavaScript learning in 100 days. Perfect for beginners and intermediate developers.",
        url: 'https://book.anshulsoni.in',
        siteName: 'JavaScript Mastery in 100 Days',
        images: [
            {
                url: '/JavaScript-Poster.png',
                width: 1200,
                height: 1200,
                alt: 'JavaScript Mastery in 100 Days Book Cover',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JavaScript Mastery in 100 Days',
        description: 'Master JavaScript from scratch with practical projects and exercises. Written by @anshulsoni2010',
        creator: '@anshulsoni2010',
        images: ['/JavaScript-Poster.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // Add your Google Search Console verification code
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon.png" />

                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#f97316" />

                {/* Schema.org JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Book",
                            "name": "JavaScript Mastery in 100 Days",
                            "author": {
                                "@type": "Person",
                                "name": "Anshul Soni",
                                "url": "https://anshulsoni.in",
                                "sameAs": [
                                    "https://twitter.com/anshulsoni2010",
                                    "https://linkedin.com/in/anshulsoni2010",
                                    "https://github.com/anshulsoni2010"
                                ]
                            },
                            "publisher": {
                                "@type": "Self-Publishing",
                                "name": "Anshul"
                            },
                            "description": "Master JavaScript through 100 days of structured learning. Perfect for beginners with hands-on projects, exercises, and real-world applications.",
                            "inLanguage": "en-US",
                            "genre": ["Programming", "Computer Science", "Web Development"],
                            "audience": {
                                "@type": "Audience",
                                "audienceType": ["Developers", "Students", "Programming Learners"]
                            },
                            "price": "10.00",
                            "priceCurrency": "USD",
                            "workExample": [
                                {
                                    "@type": "CreativeWork",
                                    "name": "100+ Coding Exercises"
                                },
                                {
                                    "@type": "CreativeWork",
                                    "name": "15+ Real-world Projects"
                                }
                            ],
                            "educationalLevel": "Beginner to Advanced",
                            "numberOfPages": "122",
                            "datePublished": "2024-03-19",
                            "image": "https://book.anshulsoni.in/JavaScript-Poster.png",
                            "potentialAction": {
                                "@type": "ReadAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "https://book.anshulsoni.in",
                                    "actionPlatform": [
                                        "https://book.anshulsoni.in",
                                        "https://play.google.com/store/books/details?id=javascript-mastery-100-days",
                                        "https://www.amazon.com/dp/javascript-mastery-100-days"
                                    ]
                                }
                            },
                            "sameAs": [
                                "https://twitter.com/anshulsoni2010",
                                "https://instagram.com/anshulsoni2010",
                                "https://github.com/anshulsoni2010",
                                "https://buymeacoffee.com/anshulsoni2010",
                                "https://linktr.ee/anshulsoni2010",
                                "https://linktr.ee/codeinblogscommunity"
                            ]
                        })
                    }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
