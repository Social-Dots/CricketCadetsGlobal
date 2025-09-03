import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter, Save, X, Star } from 'lucide-react'
import { 
  getPrograms, createProgram, updateProgram, deleteProgram,
  getDevelopmentPrograms, addDevelopmentProgram, updateDevelopmentProgram, deleteDevelopmentProgram 
} from '../../lib/supabase'

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [developmentPrograms, setDevelopmentPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [programTypeFilter, setProgramTypeFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [programType, setProgramType] = useState('regular')
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
    status: 'active',
    // Development program specific fields
    featured_badge: '',
    dates: '',
    time_duration: '',
    venue_name: '',
    venue_address: '',
    standard_price: '',
    early_bird_price: '',
    early_bird_deadline: '',
    two_day_bundle_price: '',
    sibling_discount_price: '',
    limited_spots_warning: '',
    benefits: '',
    why_join_reasons: '',
    image: '',
    // Dynamic content fields
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    hero_background_image: '',
    timeline_data: '',
    philosophy_principles: '',
    skill_categories: '',
    cta_title: '',
    cta_description: '',
    cta_button_text: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAllPrograms()
  }, [])

  const fetchAllPrograms = async () => {
    try {
      setLoading(true)
      const [regularPrograms, devPrograms] = await Promise.all([
        getPrograms(),
        getDevelopmentPrograms()
      ])
      setPrograms(regularPrograms || [])
      setDevelopmentPrograms(devPrograms || [])
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProgram = (type = 'regular') => {
    setEditingProgram(null)
    setProgramType(type)
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
      status: 'active',
      // Development program specific fields
      featured_badge: '',
      dates: '',
      time_duration: '',
      venue_name: '',
      venue_address: '',
      standard_price: '',
      early_bird_price: '',
      early_bird_deadline: '',
      two_day_bundle_price: '',
      sibling_discount_price: '',
      limited_spots_warning: '',
      benefits: '',
      why_join_reasons: '',
      image: '',
      // Dynamic content fields
      hero_title: '',
      hero_subtitle: '',
      hero_description: '',
      hero_background_image: '',
      timeline_data: '',
      philosophy_principles: '',
      skill_categories: '',
      cta_title: '',
      cta_description: '',
      cta_button_text: ''
    })
    setShowModal(true)
  }

  const handleEditProgram = (program, type = 'regular') => {
    setEditingProgram(program)
    setProgramType(type)
    
    if (type === 'development') {
      setFormData({
        title: program.title || '',
        subtitle: program.subtitle || '',
        description: program.description || '',
        features: '',
        image_url: '',
        price: '',
        duration: '',
        age_group: program.age_group || '',
        skill_level: '',
        max_participants: '',
        is_featured: false,
        status: program.is_active ? 'active' : 'inactive',
        // Development program specific fields
        featured_badge: program.featured_badge || '',
        dates: program.dates || '',
        time_duration: program.time_duration || '',
        venue_name: program.venue_name || '',
        venue_address: program.venue_address || '',
        standard_price: program.standard_price || '',
        early_bird_price: program.early_bird_price || '',
        early_bird_deadline: program.early_bird_deadline || '',
        two_day_bundle_price: program.two_day_bundle_price || '',
        sibling_discount_price: program.sibling_discount_price || '',
        limited_spots_warning: program.limited_spots_warning || '',
        benefits: Array.isArray(program.benefits) ? program.benefits.join('\n') : (program.benefits || ''),
        why_join_reasons: Array.isArray(program.why_join_reasons) ? program.why_join_reasons.join('\n') : (program.why_join_reasons || ''),
        image: program.image || '',
        // Dynamic content fields
        hero_title: program.hero_title || '',
        hero_subtitle: program.hero_subtitle || '',
        hero_description: program.hero_description || '',
        hero_background_image: program.hero_background_image || '',
        timeline_data: Array.isArray(program.timeline_data) ? JSON.stringify(program.timeline_data, null, 2) : (program.timeline_data || ''),
        philosophy_principles: Array.isArray(program.philosophy_principles) ? JSON.stringify(program.philosophy_principles, null, 2) : (program.philosophy_principles || ''),
        skill_categories: Array.isArray(program.skill_categories) ? JSON.stringify(program.skill_categories, null, 2) : (program.skill_categories || ''),
        cta_title: program.cta_title || '',
        cta_description: program.cta_description || '',
        cta_button_text: program.cta_button_text || ''
      })
    } else {
      setFormData({
        title: program.name || '',
        subtitle: program.subtitle || '',
        description: program.description || '',
        features: Array.isArray(program.features) ? program.features.join('\n') : (program.features || ''),
        image_url: program.image || '',
        price: program.price || '',
        duration: program.duration || '',
        age_group: program.age_group || '',
        skill_level: '',
        max_participants: '',
        is_featured: program.is_featured || false,
        status: program.status || 'active',
        // Reset development fields
        featured_badge: '',
        dates: '',
        time_duration: '',
        venue_name: '',
        venue_address: '',
        standard_price: '',
        early_bird_price: '',
        early_bird_deadline: '',
        two_day_bundle_price: '',
        sibling_discount_price: '',
        limited_spots_warning: '',
        benefits: ''
      })
    }
    setShowModal(true)
  }

  const handleSaveProgram = async () => {
    try {
      setSaving(true)
      
      if (programType === 'development') {
        const developmentProgramData = {
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
          featured_badge: formData.featured_badge,
          dates: formData.dates,
          time_duration: formData.time_duration,
          venue_name: formData.venue_name,
          venue_address: formData.venue_address,
          age_group: formData.age_group,
          standard_price: formData.standard_price ? parseFloat(formData.standard_price) : null,
          early_bird_price: formData.early_bird_price ? parseFloat(formData.early_bird_price) : null,
          early_bird_deadline: formData.early_bird_deadline || null,
          two_day_bundle_price: formData.two_day_bundle_price ? parseFloat(formData.two_day_bundle_price) : null,
          sibling_discount_price: formData.sibling_discount_price ? parseFloat(formData.sibling_discount_price) : null,
          limited_spots_warning: formData.limited_spots_warning,
          benefits: formData.benefits.split('\n').filter(b => b.trim()),
          why_join_reasons: formData.why_join_reasons.split('\n').filter(r => r.trim()),
          image: formData.image,
          is_active: formData.status === 'active',
          // Dynamic content fields
          hero_title: formData.hero_title,
          hero_subtitle: formData.hero_subtitle,
          hero_description: formData.hero_description,
          hero_background_image: formData.hero_background_image,
          timeline_data: formData.timeline_data ? JSON.parse(formData.timeline_data) : null,
          philosophy_principles: formData.philosophy_principles ? JSON.parse(formData.philosophy_principles) : null,
          skill_categories: formData.skill_categories ? JSON.parse(formData.skill_categories) : null,
          cta_title: formData.cta_title,
          cta_description: formData.cta_description,
          cta_button_text: formData.cta_button_text
        }
        
        if (editingProgram) {
          await updateDevelopmentProgram(editingProgram.id, developmentProgramData)
        } else {
          await addDevelopmentProgram(developmentProgramData)
        }
      } else {
        const programData = {
          name: formData.title,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          subtitle: formData.subtitle,
          description: formData.description,
          age_group: formData.age_group,
          duration: formData.duration,
          price: formData.price ? parseFloat(formData.price) : null,
          features: formData.features.split('\n').filter(f => f.trim()),
          image: formData.image_url,
          is_featured: formData.is_featured,
          status: formData.status
        }
        
        if (editingProgram) {
          await updateProgram(editingProgram.id, programData)
        } else {
          await createProgram(programData)
        }
      }
      
      await fetchAllPrograms()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving program:', error)
      alert('Error saving program. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProgram = async (programId, type = 'regular') => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        if (type === 'development') {
          await deleteDevelopmentProgram(programId)
        } else {
          await deleteProgram(programId)
        }
        await fetchAllPrograms()
      } catch (error) {
        console.error('Error deleting program:', error)
        alert('Error deleting program. Please try again.')
      }
    }
  }

  // Combine and filter programs
  const allPrograms = [
    ...programs.map(p => ({ ...p, type: 'regular', title: p.name })),
    ...developmentPrograms.map(p => ({ ...p, type: 'development', status: p.is_active ? 'active' : 'inactive' }))
  ]
  
  const filteredPrograms = allPrograms.filter(program => {
    const matchesSearch = program.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
    const matchesType = programTypeFilter === 'all' || program.type === programTypeFilter
    return matchesSearch && matchesStatus && matchesType
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
        <div className="flex gap-2">
          <button
            onClick={() => handleCreateProgram('regular')}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Regular Program
          </button>
          <button
            onClick={() => handleCreateProgram('development')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Development Program
          </button>
        </div>
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
          <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-2">
              <select
                value={programTypeFilter}
                onChange={(e) => setProgramTypeFilter(e.target.value)}
                className="border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="regular">Regular Programs</option>
                <option value="development">Development Programs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <div key={`${program.type}-${program.id}`} className="bg-white rounded-lg shadow-sm border border-emerald-200 overflow-hidden">
            {(program.image_url || program.image) && (
              <img
                src={program.image_url || program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900">{program.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                    program.type === 'development' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {program.type === 'development' ? 'Development' : 'Regular'}
                  </span>
                </div>
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
                {(program.price || program.standard_price) && (
                  <div>Price: ${program.price || program.standard_price}</div>
                )}
                {program.type === 'development' && program.venue_name && (
                  <div>Venue: {program.venue_name}</div>
                )}
                {program.type === 'development' && program.dates && (
                  <div>Dates: {program.dates}</div>
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
                    onClick={() => handleEditProgram(program, program.type)}
                    className="text-emerald-600 hover:text-emerald-900"
                    title="Edit Program"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id, program.type)}
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
                  {editingProgram ? 'Edit' : 'Create New'} {programType === 'development' ? 'Development' : 'Regular'} Program
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

                {programType === 'regular' && (
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
                )}
                
                {programType === 'development' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Benefits (one per line)
                      </label>
                      <textarea
                        value={formData.benefits}
                        onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                        rows={4}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Benefit 1\nBenefit 2\nBenefit 3"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Why Join Reasons (one per line)
                      </label>
                      <textarea
                        value={formData.why_join_reasons}
                        onChange={(e) => setFormData(prev => ({ ...prev, why_join_reasons: e.target.value }))}
                        rows={4}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Reason 1\nReason 2\nReason 3"
                      />
                    </div>
                    
                    {/* Hero Section Fields */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-emerald-800 mb-3">Hero Section Content</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-1">
                            Hero Title
                          </label>
                          <input
                            type="text"
                            value={formData.hero_title}
                            onChange={(e) => setFormData(prev => ({ ...prev, hero_title: e.target.value }))}
                            className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Main hero title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-1">
                            Hero Subtitle
                          </label>
                          <input
                            type="text"
                            value={formData.hero_subtitle}
                            onChange={(e) => setFormData(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                            className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Hero subtitle"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Hero Description
                        </label>
                        <textarea
                          value={formData.hero_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, hero_description: e.target.value }))}
                          rows={3}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Hero section description"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Hero Background Image URL
                        </label>
                        <input
                          type="url"
                          value={formData.hero_background_image}
                          onChange={(e) => setFormData(prev => ({ ...prev, hero_background_image: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="https://example.com/hero-bg.jpg"
                        />
                      </div>
                    </div>
                    
                    {/* Timeline Data */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-emerald-800 mb-3">A Week in the Life Timeline</h4>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Timeline Data (JSON format)
                        </label>
                        <textarea
                          value={formData.timeline_data}
                          onChange={(e) => setFormData(prev => ({ ...prev, timeline_data: e.target.value }))}
                          rows={8}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                          placeholder='[{"icon": "Sun", "title": "Morning Session", "description": "Technical skills training", "time": "9:00 AM", "color": "text-orange-600", "bgColor": "bg-orange-50"}]'
                        />
                      </div>
                    </div>
                    
                    {/* Philosophy Principles */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-emerald-800 mb-3">Program Philosophy</h4>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Philosophy Principles (JSON format)
                        </label>
                        <textarea
                          value={formData.philosophy_principles}
                          onChange={(e) => setFormData(prev => ({ ...prev, philosophy_principles: e.target.value }))}
                          rows={8}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                          placeholder='[{"icon": "Target", "title": "Skill Development", "description": "Focus on technical skills", "color": "text-blue-600", "bgGradient": "from-blue-50 to-blue-100"}]'
                        />
                      </div>
                    </div>
                    
                    {/* Skill Categories */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-emerald-800 mb-3">What They Learn</h4>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Skill Categories (JSON format)
                        </label>
                        <textarea
                          value={formData.skill_categories}
                          onChange={(e) => setFormData(prev => ({ ...prev, skill_categories: e.target.value }))}
                          rows={10}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                          placeholder='[{"title": "Technical Skills", "icon": "Zap", "color": "text-blue-600", "skills": ["Batting Technique", "Bowling Action"]}]'
                        />
                      </div>
                    </div>
                    
                    {/* Call to Action */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-emerald-800 mb-3">Call to Action Section</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-1">
                            CTA Title
                          </label>
                          <input
                            type="text"
                            value={formData.cta_title}
                            onChange={(e) => setFormData(prev => ({ ...prev, cta_title: e.target.value }))}
                            className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Ready to Start the Adventure?"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-1">
                            CTA Button Text
                          </label>
                          <input
                            type="text"
                            value={formData.cta_button_text}
                            onChange={(e) => setFormData(prev => ({ ...prev, cta_button_text: e.target.value }))}
                            className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Join a Camp"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          CTA Description
                        </label>
                        <textarea
                          value={formData.cta_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, cta_description: e.target.value }))}
                          rows={3}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Spots in our popular development camps fill up fast..."
                        />
                      </div>
                    </div>
                  </>
                )}

                {programType === 'regular' && (
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
                )}
                
                {programType === 'development' && (
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Featured Badge
                    </label>
                    <input
                      type="text"
                      value={formData.featured_badge}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_badge: e.target.value }))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="🏏 FEATURED PROGRAM"
                    />
                  </div>
                )}

                {programType === 'development' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Dates
                      </label>
                      <input
                        type="text"
                        value={formData.dates}
                        onChange={(e) => setFormData(prev => ({ ...prev, dates: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="March 15-17, 2024"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Time Duration
                      </label>
                      <input
                        type="text"
                        value={formData.time_duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, time_duration: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="9:00 AM - 4:00 PM"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        value={formData.venue_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, venue_name: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Cricket Academy Ground"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Venue Address
                      </label>
                      <input
                        type="text"
                        value={formData.venue_address}
                        onChange={(e) => setFormData(prev => ({ ...prev, venue_address: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="123 Cricket Street, City"
                      />
                    </div>
                  </>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {programType === 'regular' && (
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
                  )}
                  
                  {programType === 'development' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Standard Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.standard_price}
                          onChange={(e) => setFormData(prev => ({ ...prev, standard_price: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="299.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Early Bird Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.early_bird_price}
                          onChange={(e) => setFormData(prev => ({ ...prev, early_bird_price: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="199.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Early Bird Deadline
                        </label>
                        <input
                          type="date"
                          value={formData.early_bird_deadline}
                          onChange={(e) => setFormData(prev => ({ ...prev, early_bird_deadline: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                  
                  {programType === 'development' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Two Day Bundle Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.two_day_bundle_price}
                          onChange={(e) => setFormData(prev => ({ ...prev, two_day_bundle_price: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="399.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Sibling Discount Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.sibling_discount_price}
                          onChange={(e) => setFormData(prev => ({ ...prev, sibling_discount_price: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="249.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Limited Spots Warning
                        </label>
                        <input
                          type="text"
                          value={formData.limited_spots_warning}
                          onChange={(e) => setFormData(prev => ({ ...prev, limited_spots_warning: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Only 5 spots left!"
                        />
                      </div>
                    </>
                  )}

                  {programType === 'regular' && (
                    <>
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
                    </>
                  )}
                  
                  {programType === 'development' && (
                     <div>
                       <label className="block text-sm font-medium text-emerald-700 mb-1">
                         Image URL
                       </label>
                       <input
                         type="url"
                         value={formData.image}
                         onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                         className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                         placeholder="https://example.com/image.jpg"
                       />
                     </div>
                   )}
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

                  {programType === 'regular' && (
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
                  )}
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

                  {programType === 'regular' && (
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
                  )}
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