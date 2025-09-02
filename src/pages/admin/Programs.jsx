import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter, Save, X, Star } from 'lucide-react'
import { getPrograms, createProgram, updateProgram, deleteProgram } from '../../lib/supabase'

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    features: '',
    image_url: '',
    price: '',
    duration: '',
    age_group: '',
    skill_level: '',
    max_participants: '',
    is_featured: false,
    status: 'active'
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const data = await getPrograms()
      setPrograms(data || [])
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProgram = () => {
    setEditingProgram(null)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      features: '',
      image_url: '',
      price: '',
      duration: '',
      age_group: '',
      skill_level: '',
      max_participants: '',
      is_featured: false,
      status: 'active'
    })
    setShowModal(true)
  }

  const handleEditProgram = (program) => {
    setEditingProgram(program)
    setFormData({
      title: program.title || '',
      subtitle: program.subtitle || '',
      description: program.description || '',
      features: Array.isArray(program.features) ? program.features.join('\n') : (program.features || ''),
      image_url: program.image_url || '',
      price: program.price || '',
      duration: program.duration || '',
      age_group: program.age_group || '',
      skill_level: program.skill_level || '',
      max_participants: program.max_participants || '',
      is_featured: program.is_featured || false,
      status: program.status || 'active'
    })
    setShowModal(true)
  }

  const handleSaveProgram = async () => {
    try {
      setSaving(true)
      
      const programData = {
        ...formData,
        features: formData.features.split('\n').filter(f => f.trim()),
        price: formData.price ? parseFloat(formData.price) : null,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null
      }
      
      if (editingProgram) {
        await updateProgram(editingProgram.id, programData)
      } else {
        await createProgram(programData)
      }
      
      await fetchPrograms()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving program:', error)
      alert('Error saving program. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProgram = async (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await deleteProgram(programId)
        await fetchPrograms()
      } catch (error) {
        console.error('Error deleting program:', error)
        alert('Error deleting program. Please try again.')
      }
    }
  }

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
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
        <h1 className="text-2xl font-bold text-emerald-900">Programs Management</h1>
        <button
          onClick={handleCreateProgram}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Program
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-emerald-500" />
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

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-sm border border-emerald-200 overflow-hidden">
            {program.image_url && (
              <img
                src={program.image_url}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-emerald-900">{program.title}</h3>
                {program.is_featured && (
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                )}
              </div>
              
              {program.subtitle && (
                <p className="text-sm text-emerald-600 mb-2">{program.subtitle}</p>
              )}
              
              <p className="text-sm text-emerald-700 mb-3 line-clamp-3">
                {program.description}
              </p>
              
              <div className="space-y-1 text-xs text-emerald-500 mb-4">
                {program.age_group && (
                  <div>Age Group: {program.age_group}</div>
                )}
                {program.duration && (
                  <div>Duration: {program.duration}</div>
                )}
                {program.price && (
                  <div>Price: ${program.price}</div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  program.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {program.status}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditProgram(program)}
                    className="text-emerald-600 hover:text-emerald-900"
                    title="Edit Program"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="text-amber-600 hover:text-amber-900"
                    title="Delete Program"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-emerald-500">No programs found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-900">
                  {editingProgram ? 'Edit Program' : 'Create New Program'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-emerald-500 hover:text-emerald-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Program title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Program subtitle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Program description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    rows={4}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Feature 1\nFeature 2\nFeature 3"
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
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="99.99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="8 weeks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={formData.max_participants}
                      onChange={(e) => setFormData(prev => ({ ...prev, max_participants: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Age Group
                    </label>
                    <input
                      type="text"
                      value={formData.age_group}
                      onChange={(e) => setFormData(prev => ({ ...prev, age_group: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="6-12 years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Skill Level
                    </label>
                    <select
                      value={formData.skill_level}
                      onChange={(e) => setFormData(prev => ({ ...prev, skill_level: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select skill level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="all_levels">All Levels</option>
                    </select>
                  </div>
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
                      <span className="ml-2 text-sm font-medium text-emerald-700">Featured Program</span>
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
                  onClick={handleSaveProgram}
                  disabled={saving || !formData.title}
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
                      {editingProgram ? 'Update' : 'Create'} Program
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

export default Programs