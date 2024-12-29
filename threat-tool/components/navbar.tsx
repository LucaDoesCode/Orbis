'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import {
  Shield,
  Menu,
  X,
  User,
  LogOut,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { useAuth, auth } from '../lib/firebase'

export function Navbar() {
  const { user, loading, isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      setError(null)
      router.push('/')
    } catch (err) {
      setError('Failed to sign out. Please try again.')
    }
  }

  const isActiveRoute = (path: string) => pathname === path

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              aria-label="Home"
            >
              <Shield className="h-8 w-8 text-indigo-600 transition-transform hover:scale-110" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                Orbis
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            {loading ? (
              <div className="flex items-center justify-center w-24 h-8">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/threat-assessment"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/threat-assessment')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Threat Assessment
                </Link>

                <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
                  <User className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>

                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/sign-in') && 'bg-gray-50'
                  }`}
                >
                  Log in
                </Link>

                <Link href="/sign-in">
                  <Button className="gap-2">
                    <User className="h-4 w-4" />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
