import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SolutionsRx® Supplement Advisor',
  description:
    'Answer a few quick questions and receive personalized supplement recommendations from our pharmacists.',
  keywords: 'supplements, pharmacist, vitamins, health, personalized recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
