import React, { useState, useEffect } from 'react'
import {
  getWaitlistAnalytics,
  getContentAnalytics,
  getWaitlistEntries,
  getPrograms,
  getCoaches,
  getTestimonials
} from '../../lib/supabase'
import {
  Users,
  Trophy,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Zap
} from 'lucide-react'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    waitlist: [],
    content: {},
    summary: {
      totalCandidates: 0,
      pendingCandidates: 0,
      approvedCandidates: 0,
      totalPrograms: 0,
      totalCoaches: 0,
      totalTestimonials: 0
    }
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        
        const [waitlistData, contentData, waitlistEntries, programs, coaches, testimonials] = await Promise.all([
          getWaitlistAnalytics(),
          getContentAnalytics(),
          getWaitlistEntries(),
          getPrograms(),
          getCoaches(),
          getTestimonials()
        ])

        // Calculate summary statistics
        const pendingCount = waitlistEntries.filter(entry => entry.status === 'pending').length
        const approvedCount = waitlistEntries.filter(entry => entry.status === 'approved').length

        setAnalytics({
          waitlist: waitlistData,
          content: contentData,
          summary: {
            totalCandidates: waitlistEntries.length,
            pendingCandidates: pendingCount,
            approvedCandidates: approvedCount,
            totalPrograms: programs.length,
            totalCoaches: coaches.length,
            totalTestimonials: testimonials.length
          }
        })
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const getStatusDistribution = () => {
    const statusCounts = analytics.waitlist.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1
      return acc
    }, {})
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      percentage: ((count / analytics.waitlist.length) * 100).toFixed(1)
    }))
  }

  const getRecentRegistrations = () => {
    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)
    
    return analytics.waitlist.filter(entry => 
      new Date(entry.created_at) >= last7Days
    ).length
  }

  const getMonthlyTrend = () => {
    const monthlyData = {}
    analytics.waitlist.forEach(entry => {
      const month = new Date(entry.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
      monthlyData[month] = (monthlyData[month] || 0) + 1
    })
    
    return Object.entries(monthlyData)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-6) // Last 6 months
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  const statusDistribution = getStatusDistribution()
  const recentRegistrations = getRecentRegistrations()
  const monthlyTrend = getMonthlyTrend()

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-emerald-100 text-lg">Welcome back! Here's what's happening with Cricket Cadets today.</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2 text-white">
                  <Activity className="h-6 w-6" />
                  <span className="font-medium">Live Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-amber-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 bg-emerald-400 rounded-full opacity-10"></div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Candidates Card */}
        <div className="group relative bg-gradient-to-br from-white to-emerald-50 overflow-hidden shadow-xl rounded-2xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="flex items-center text-emerald-600">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Total Candidates</h3>
              <p className="text-3xl font-bold text-emerald-900">{analytics.summary.totalCandidates}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-700 font-medium">{analytics.summary.approvedCandidates} approved</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-amber-600 font-medium">{analytics.summary.pendingCandidates} pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Card */}
        <div className="group relative bg-gradient-to-br from-white to-amber-50 overflow-hidden shadow-xl rounded-2xl border border-amber-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
                <Trophy className="h-8 w-8 text-amber-600" />
              </div>
              <div className="flex items-center text-amber-600">
                <Star className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Programs</h3>
              <p className="text-3xl font-bold text-amber-900">{analytics.summary.totalPrograms}</p>
              <p className="text-sm text-amber-700">Active training programs</p>
            </div>
          </div>
        </div>

        {/* Coaches Card */}
        <div className="group relative bg-gradient-to-br from-white to-blue-50 overflow-hidden shadow-xl rounded-2xl border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center text-blue-600">
                <Zap className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Coaches</h3>
              <p className="text-3xl font-bold text-blue-900">{analytics.summary.totalCoaches}</p>
              <p className="text-sm text-blue-700">Elite coaching panel</p>
            </div>
          </div>
        </div>

        {/* Weekly Registrations Card */}
        <div className="group relative bg-gradient-to-br from-white to-purple-50 overflow-hidden shadow-xl rounded-2xl border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center text-purple-600">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide">This Week</h3>
              <p className="text-3xl font-bold text-purple-900">{recentRegistrations}</p>
              <p className="text-sm text-purple-700">New registrations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Candidate Status</h3>
              <p className="text-sm text-gray-600">Distribution overview</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-4">
            {statusDistribution.map((item, index) => {
              const colors = {
                'Pending': { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-700' },
                'Approved': { bg: 'bg-emerald-500', light: 'bg-emerald-100', text: 'text-emerald-700' },
                'Contacted': { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700' },
                'default': { bg: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-700' }
              }
              const color = colors[item.status] || colors.default
              
              return (
                <div key={index} className="group p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${color.bg} shadow-sm`}></div>
                      <span className={`font-medium ${color.text}`}>{item.status}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-900">{item.count}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${color.light} ${color.text} font-medium`}>
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${color.bg} h-2 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Registration Trend</h3>
              <p className="text-sm text-gray-600">Last 6 months</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="space-y-5">
            {monthlyTrend.map(([month, count], index) => {
              const maxCount = Math.max(...monthlyTrend.map(([, c]) => c))
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
              const isHighest = count === maxCount
              
              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 min-w-[60px]">{month}</span>
                    <div className="flex items-center space-x-2">
                      {isHighest && <Star className="h-4 w-4 text-amber-500" />}
                      <span className="text-lg font-bold text-gray-900">{count}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 shadow-inner">
                      <div 
                        className={`h-3 rounded-full transition-all duration-700 ease-out ${
                          isHighest 
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg' 
                            : 'bg-gradient-to-r from-purple-400 to-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Quick Actions</h3>
            <p className="text-sm text-gray-600">Frequently used admin functions</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl">
            <Zap className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="/admin/candidates" 
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-emerald-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -mr-10 -mt-10 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="font-bold text-emerald-900 text-lg mb-1">View Candidates</div>
              <div className="text-sm text-emerald-700">Manage waitlist entries</div>
              <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                <span>Go to candidates</span>
                <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
          
          <a 
            href="/admin/programs" 
            className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-purple-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -mr-10 -mt-10 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="font-bold text-purple-900 text-lg mb-1">Programs</div>
              <div className="text-sm text-purple-700">Manage course offerings</div>
              <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                <span>Manage programs</span>
                <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
          
          <a 
            href="/admin/coaches" 
            className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-amber-200"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full -mr-10 -mt-10 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="font-bold text-amber-900 text-lg mb-1">Coaches</div>
              <div className="text-sm text-amber-700">Team management</div>
              <div className="mt-4 flex items-center text-amber-600 text-sm font-medium">
                <span>View coaches</span>
                <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard