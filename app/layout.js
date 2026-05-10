import './globals.css'

export const metadata = {
  title: 'AI Tools Hub - Discover 200+ AI Productivity Tools',
  description: 'Curated directory of AI tools for chatbots, coding, writing, design, video, and more.',
  icons: {
    icon: '🚀',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
