import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Save, X, Star } from 'lucide-react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../lib/supabase'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image_url: '',
    location: '',
    is_featured: false,
    status: 'active'
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getTestimonials()
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTestimonial = () => {
    setEditingTestimonial(null)
    setFormData({
      name: '',
      role: '',
      content: '',
      rating: 5,
      image_url: '',
      location: '',
      is_featured: false,
      status: 'active'
    })
    setShowModal(true)
  }

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name || '',
      role: testimonial.role || '',
      content: testimonial.content || '',
      rating: testimonial.rating || 5,
      image_url: testimonial.image_url || '',
      location: testimonial.location || '',
      is_featured: testimonial.is_featured || false,
      status: testimonial.status || 'active'
    })
    setShowModal(true)
  }

  const handleSaveTestimonial = async () => {
    try {
      setSaving(true)
      
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formData)
      } else {
        await createTestimonial(formData)
      }
      
      await fetchTestimonials()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert('Error saving testimonial. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTestimonial = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(testimonialId)
        await fetchTestimonials()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
        alert('Error deleting testimonial. Please try again.')
      }
    }
  }

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || testimonial.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-emerald-300'}`}
      />
    ))
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-900">Testimonials Management</h1>
        <button
          onClick={handleCreateTestimonial}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
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

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {testimonial.image_url ? (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">
                      {testimonial.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-emerald-900">{testimonial.name}</h3>
                  {testimonial.role && (
                    <p className="text-sm text-emerald-600">{testimonial.role}</p>
                  )}
                </div>
              </div>
              {testimonial.is_featured && (
                <Star className="h-5 w-5 text-amber-500 fill-current" />
              )}
            </div>
            
            <div className="flex items-center mb-2">
              {renderStars(testimonial.rating)}
              <span className="ml-2 text-sm text-emerald-600">({testimonial.rating}/5)</span>
            </div>
            
            <p className="text-sm text-emerald-700 mb-3 line-clamp-3">
              "{testimonial.content}"
            </p>
            
            {testimonial.location && (
              <p className="text-xs text-emerald-500 mb-3">{testimonial.location}</p>
            )}
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                testimonial.status === 'active' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {testimonial.status}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="text-emerald-600 hover:text-emerald-900"
                  title="Edit Testimonial"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-amber-600 hover:text-amber-900"
                  title="Delete Testimonial"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-emerald-500">No testimonials found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-900">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                      placeholder="Customer name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Role/Title
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Parent, Student, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Testimonial Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="What they said about us..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Rating
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
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
                    placeholder="https://example.com/photo.jpg"
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
                      <span className="ml-2 text-sm font-medium text-emerald-700">Featured Testimonial</span>
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
                  onClick={handleSaveTestimonial}
                  disabled={saving || !formData.name || !formData.content}
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
                      {editingTestimonial ? 'Update' : 'Add'} Testimonial
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

export default Testimonials