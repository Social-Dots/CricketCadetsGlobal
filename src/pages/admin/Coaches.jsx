import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Save, X, Star, Award } from 'lucide-react'
import { getCoaches, createCoach, updateCoach, deleteCoach } from '../../lib/supabase'

const Coaches = () => {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingCoach, setEditingCoach] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    image_url: '',
    achievements: '',
    quote: '',
    experience_years: '',
    specialization: '',
    certifications: '',
    contact_email: '',
    is_featured: false,
    status: 'active'
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCoaches()
  }, [])

  const fetchCoaches = async () => {
    try {
      setLoading(true)
      const data = await getCoaches()
      setCoaches(data || [])
    } catch (error) {
      console.error('Error fetching coaches:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCoach = () => {
    setEditingCoach(null)
    setFormData({
      name: '',
      title: '',
      bio: '',
      image_url: '',
      achievements: '',
      quote: '',
      experience_years: '',
      specialization: '',
      certifications: '',
      contact_email: '',
      is_featured: false,
      status: 'active'
    })
    setShowModal(true)
  }

  const handleEditCoach = (coach) => {
    setEditingCoach(coach)
    setFormData({
      name: coach.name || '',
      title: coach.title || '',
      bio: coach.bio || '',
      image_url: coach.image_url || '',
      achievements: Array.isArray(coach.achievements) ? coach.achievements.join('\n') : (coach.achievements || ''),
      quote: coach.quote || '',
      experience_years: coach.experience_years || '',
      specialization: coach.specialization || '',
      certifications: Array.isArray(coach.certifications) ? coach.certifications.join('\n') : (coach.certifications || ''),
      contact_email: coach.contact_email || '',
      is_featured: coach.is_featured || false,
      status: coach.status || 'active'
    })
    setShowModal(true)
  }

  const handleSaveCoach = async () => {
    try {
      setSaving(true)
      
      const coachData = {
        ...formData,
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
        certifications: formData.certifications.split('\n').filter(c => c.trim()),
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null
      }
      
      if (editingCoach) {
        await updateCoach(editingCoach.id, coachData)
      } else {
        await createCoach(coachData)
      }
      
      await fetchCoaches()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving coach:', error)
      alert('Error saving coach. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCoach = async (coachId) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      try {
        await deleteCoach(coachId)
        await fetchCoaches()
      } catch (error) {
        console.error('Error deleting coach:', error)
        alert('Error deleting coach. Please try again.')
      }
    }
  }

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || coach.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-900">Coaches Management</h1>
        <button
          onClick={handleCreateCoach}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Coach
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search coaches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-emerald-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => (
          <div key={coach.id} className="bg-white rounded-lg shadow-sm border border-emerald-200 overflow-hidden">
            <div className="relative">
              {coach.image_url ? (
                <img
                  src={coach.image_url}
                  alt={coach.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-400 text-4xl font-bold">
                    {coach.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              )}
              {coach.is_featured && (
                <div className="absolute top-2 right-2">
                  <Star className="h-6 w-6 text-amber-500 fill-current" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-emerald-900">{coach.name}</h3>
                {coach.title && (
                  <p className="text-sm text-emerald-600 font-medium">{coach.title}</p>
                )}
              </div>
              
              {coach.specialization && (
                <p className="text-sm text-emerald-600 mb-2">
                  <Award className="h-4 w-4 inline mr-1" />
                  {coach.specialization}
                </p>
              )}
              
              {coach.experience_years && (
                <p className="text-sm text-emerald-600 mb-2">
                  {coach.experience_years} years experience
                </p>
              )}
              
              {coach.bio && (
                <p className="text-sm text-emerald-700 mb-3 line-clamp-3">
                  {coach.bio}
                </p>
              )}
              
              {coach.quote && (
                <blockquote className="text-xs italic text-emerald-600 mb-3 border-l-2 border-amber-200 pl-2">
                  "{coach.quote}"
                </blockquote>
              )}
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  coach.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {coach.status}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditCoach(coach)}
                    className="text-emerald-600 hover:text-emerald-900"
                    title="Edit Coach"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCoach(coach.id)}
                    className="text-amber-600 hover:text-amber-900"
                    title="Delete Coach"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCoaches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-emerald-500">No coaches found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-900">
                  {editingCoach ? 'Edit Coach' : 'Add New Coach'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-emerald-400 hover:text-emerald-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Coach name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Head Coach, Assistant Coach, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Coach biography and background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://example.com/coach-photo.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Achievements (one per line)
                  </label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
                    rows={4}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Achievement 1\nAchievement 2\nAchievement 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Quote
                  </label>
                  <textarea
                    value={formData.quote}
                    onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                    rows={2}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Inspirational quote or coaching philosophy"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Batting, Bowling, Fielding, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Certifications (one per line)
                  </label>
                  <textarea
                    value={formData.certifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                    rows={3}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Level 3 Cricket Coach\nFirst Aid Certified\nChild Protection Certified"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="coach@cricketcadets.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm font-medium text-emerald-700">Featured Coach</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCoach}
                  disabled={saving || !formData.name}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {editingCoach ? 'Update' : 'Add'} Coach
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Coaches