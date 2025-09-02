import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
  LayoutDashboard,
  Users,
  FileText,
  Trophy,
  UserCheck,
  MessageSquare,
  MapPin,
  Settings,
  Menu,
  X,
  LogOut,
  Shield,
  Activity,
  Navigation,
  Image,
  BarChart3
} from 'lucide-react'

const AdminLayout = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Candidates',
      href: '/admin/candidates',
      icon: Users,
      current: location.pathname.startsWith('/admin/candidates')
    },
    {
      name: 'Pages',
      href: '/admin/pages',
      icon: FileText,
      current: location.pathname.startsWith('/admin/pages')
    },
    {
      name: 'Programs',
      href: '/admin/programs',
      icon: Trophy,
      current: location.pathname.startsWith('/admin/programs')
    },
    {
      name: 'Coaches',
      href: '/admin/coaches',
      icon: UserCheck,
      current: location.pathname.startsWith('/admin/coaches')
    },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: MessageSquare,
      current: location.pathname.startsWith('/admin/testimonials')
    },
    {
      name: 'Locations',
      href: '/admin/locations',
      icon: MapPin,
      current: location.pathname.startsWith('/admin/locations')
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname.startsWith('/admin/settings')
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-emerald-800 via-emerald-900 to-teal-900 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-wide">Cricket Cadets Admin</h1>
              </div>
            </div>
            <nav className="mt-5 px-2 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:translate-x-1 ${
                      item.current
                        ? 'bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm border border-white border-opacity-20'
                        : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                      item.current 
                        ? 'bg-white bg-opacity-20' 
                        : 'group-hover:bg-white group-hover:bg-opacity-10'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold">{item.name}</span>
                    {item.current && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-emerald-800 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-amber-900" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-emerald-200 hover:text-white flex items-center transition-colors"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-emerald-800 via-emerald-900 to-teal-900 shadow-2xl border-r border-emerald-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-wide">Cricket Cadets Admin</h1>
              </div>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-2">
               {navigation.map((item) => {
                 const Icon = item.icon
                 return (
                   <Link
                     key={item.name}
                     to={item.href}
                     className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:translate-x-1 ${
                       item.current
                         ? 'bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm border border-white border-opacity-20'
                         : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                     }`}
                   >
                     <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                       item.current 
                         ? 'bg-white bg-opacity-20' 
                         : 'group-hover:bg-white group-hover:bg-opacity-10'
                     }`}>
                       <Icon className="h-4 w-4" />
                     </div>
                     <span className="font-semibold">{item.name}</span>
                     {item.current && (
                       <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                     )}
                   </Link>
                 )
               })}
             </nav>
          </div>
          <div className="flex-shrink-0 border-t border-white border-opacity-20 p-4">
            <div className="flex items-center w-full bg-white bg-opacity-10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-white to-gray-200 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-emerald-800">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-emerald-200">Administrator</p>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-3 flex-shrink-0 p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200 group"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200 shadow-sm lg:border-none">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 lg:hidden transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex items-center">
              <div className="hidden lg:flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Admin Dashboard</h2>
                  <p className="text-sm text-gray-600">Manage your cricket academy</p>
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="hidden md:flex items-center space-x-4 bg-gray-50 rounded-xl px-4 py-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-white">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleSignOut}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen">
           <div className="py-8">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
               <Outlet />
             </div>
           </div>
         </main>
      </div>
    </div>
  )
}

export default AdminLayout