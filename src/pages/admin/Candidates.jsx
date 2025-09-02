import React, { useState, useEffect } from 'react'
import { getWaitlistEntries, updateWaitlistStatus, getPrograms, addAuditLog } from '../../lib/supabase'
import {
  Users,
  Filter,
  Search,
  Eye,
  Check,
  X,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  ChevronDown,
  Download,
  RefreshCw
} from 'lucide-react'

const Candidates = () => {
  const [candidates, setCandidates] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [candidatesData, programsData] = await Promise.all([
        getWaitlistEntries(),
        getPrograms()
      ])
      setCandidates(candidatesData)
      setPrograms(programsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (candidateId, newStatus) => {
    try {
      setUpdating(true)
      const oldCandidate = candidates.find(c => c.id === candidateId)
      
      await updateWaitlistStatus(candidateId, newStatus)
      await addAuditLog(
        'update',
        'waitlist',
        candidateId,
        { status: oldCandidate.status },
        { status: newStatus }
      )
      
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, status: newStatus }
            : candidate
        )
      )
      
      if (selectedCandidate?.id === candidateId) {
        setSelectedCandidate(prev => ({ ...prev, status: newStatus }))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdating(false)
    }
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.child_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.parent_guardian_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800'
      case 'approved':
        return 'bg-emerald-100 text-emerald-800'
      case 'contacted':
        return 'bg-emerald-200 text-emerald-900'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-emerald-100 text-emerald-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'approved':
        return <Check className="h-4 w-4" />
      case 'contacted':
        return <Phone className="h-4 w-4" />
      case 'rejected':
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getProgramName = (programId) => {
    const program = programs.find(p => p.id === programId)
    return program ? program.name : 'Unknown Program'
  }

  const exportToCsv = () => {
    const headers = [
      'Child Name',
      'Date of Birth',
      'Gender',
      'Phone',
      'Email',
      'Location',
      'Experience',
      'Parent/Guardian',
      'Parent Phone',
      'Parent Email',
      'Program Interest',
      'Status',
      'Created At'
    ]
    
    const csvData = filteredCandidates.map(candidate => [
      candidate.child_name,
      candidate.date_of_birth,
      candidate.gender,
      candidate.phone_number,
      candidate.email,
      candidate.suburb_postcode,
      candidate.cricket_experience,
      candidate.parent_guardian_name,
      candidate.parent_guardian_phone,
      candidate.parent_guardian_email,
      getProgramName(candidate.program_interest),
      candidate.status,
      new Date(candidate.created_at).toLocaleDateString()
    ])
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `candidates-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-emerald-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-900">Candidates Management</h1>
            <p className="text-emerald-700">Manage registration entries and candidate status</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center px-4 py-2 border border-emerald-300 rounded-md shadow-sm text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={exportToCsv}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-lg border border-emerald-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-emerald-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-emerald-300 rounded-md px-4 py-2 pr-8 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="contacted">Contacted</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-emerald-100">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-emerald-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-600">Total</p>
              <p className="text-2xl font-semibold text-emerald-900">{candidates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg border border-emerald-100">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-amber-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-600">Pending</p>
              <p className="text-2xl font-semibold text-emerald-900">
                {candidates.filter(c => c.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg border border-emerald-100">
          <div className="flex items-center">
            <Check className="h-8 w-8 text-emerald-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-600">Approved</p>
              <p className="text-2xl font-semibold text-emerald-900">
                {candidates.filter(c => c.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg border border-emerald-100">
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-emerald-700" />
            <div className="ml-3">
              <p className="text-sm font-medium text-emerald-600">Contacted</p>
              <p className="text-2xl font-semibold text-emerald-900">
                {candidates.filter(c => c.status === 'contacted').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white shadow-lg rounded-lg border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Program Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-emerald-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-emerald-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-emerald-900">
                        {candidate.child_name}
                      </div>
                      <div className="text-sm text-emerald-600">
                        {candidate.gender} • {new Date().getFullYear() - new Date(candidate.date_of_birth).getFullYear()} years
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-emerald-900">{candidate.email}</div>
                    <div className="text-sm text-emerald-600">{candidate.phone_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-emerald-900">
                      {getProgramName(candidate.program_interest)}
                    </div>
                    <div className="text-sm text-emerald-600">
                      {candidate.cricket_experience} level
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                      {getStatusIcon(candidate.status)}
                      <span className="ml-1">{candidate.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600">
                    {new Date(candidate.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCandidate(candidate)
                          setShowModal(true)
                        }}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {candidate.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(candidate.id, 'approved')}
                            disabled={updating}
                            className="text-emerald-700 hover:text-emerald-900 disabled:opacity-50"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(candidate.id, 'rejected')}
                            disabled={updating}
                            className="text-amber-600 hover:text-amber-900 disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {candidate.status === 'approved' && (
                        <button
                          onClick={() => handleStatusUpdate(candidate.id, 'contacted')}
                          disabled={updating}
                          className="text-emerald-600 hover:text-emerald-900 disabled:opacity-50"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No candidates have registered yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {showModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-emerald-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-emerald-200">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-emerald-900">Candidate Details</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-emerald-500 hover:text-emerald-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Child Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-emerald-600">Name:</span>
                        <p className="font-medium text-emerald-900">{selectedCandidate.child_name}</p>
                      </div>
                      <div>
                        <span className="text-emerald-600">Date of Birth:</span>
                        <p className="font-medium text-emerald-900">{new Date(selectedCandidate.date_of_birth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-emerald-600">Gender:</span>
                        <p className="font-medium text-emerald-900">{selectedCandidate.gender}</p>
                      </div>
                      <div>
                        <span className="text-emerald-600">Experience:</span>
                        <p className="font-medium text-emerald-900">{selectedCandidate.cricket_experience}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-emerald-900 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">{selectedCandidate.phone_number}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">{selectedCandidate.suburb_postcode}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-emerald-900 mb-2">Parent/Guardian Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-emerald-600">Name:</span>
                        <p className="font-medium text-emerald-900">{selectedCandidate.parent_guardian_name}</p>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">{selectedCandidate.parent_guardian_email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">{selectedCandidate.parent_guardian_phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-emerald-900 mb-2">Program & Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">{getProgramName(selectedCandidate.program_interest)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-emerald-900">Registered: {new Date(selectedCandidate.created_at).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCandidate.status)}`}>
                          {getStatusIcon(selectedCandidate.status)}
                          <span className="ml-1">{selectedCandidate.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="flex space-x-2">
                  {selectedCandidate.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedCandidate.id, 'approved')
                          setShowModal(false)
                        }}
                        disabled={updating}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedCandidate.id, 'rejected')
                          setShowModal(false)
                        }}
                        disabled={updating}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                  {selectedCandidate.status === 'approved' && (
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedCandidate.id, 'contacted')
                        setShowModal(false)
                      }}
                      disabled={updating}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Mark as Contacted
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
                    className="inline-flex items-center px-4 py-2 border border-emerald-300 text-sm font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Candidates