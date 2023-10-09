'use client'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>Contest | Xavier Morell</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
            </head>

            <body className={inter.className}>{children}</body>
        </html>
    )
}
