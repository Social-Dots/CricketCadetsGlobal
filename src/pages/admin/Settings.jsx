import React, { useState, useEffect } from 'react'
import { Save, Settings as SettingsIcon, Globe, Mail, Phone, MapPin, Clock, Shield, Database, Image, Plus, Edit, Trash2 } from 'lucide-react'
import { getSiteSettings, updateSiteSettings, getHeroSections, createHeroSection, updateHeroSection, deleteHeroSection } from '../../lib/supabase'

const Settings = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    site_url: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    social_media: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: ''
    },
    business_hours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '15:00', closed: false },
      sunday: { open: '10:00', close: '14:00', closed: true }
    },
    seo_settings: {
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      google_analytics_id: '',
      google_tag_manager_id: ''
    },
    email_settings: {
      smtp_host: '',
      smtp_port: '',
      smtp_username: '',
      smtp_password: '',
      from_email: '',
      from_name: ''
    },
    registration_settings: {
      auto_approve: false,
      require_parent_consent: true,
      max_age: 18,
      min_age: 5,
      notification_email: ''
    },
    maintenance_mode: false,
    maintenance_message: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [heroSections, setHeroSections] = useState([])
  const [heroLoading, setHeroLoading] = useState(false)
  const [showHeroModal, setShowHeroModal] = useState(false)
  const [editingHero, setEditingHero] = useState(null)
  const [heroFormData, setHeroFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    text_alignment: 'center',
    overlay_opacity: 0.5,
    is_active: true,
    cta_primary_text: '',
    cta_primary_link: '',
    cta_secondary_text: '',
    cta_secondary_link: ''
  })

  useEffect(() => {
    fetchSettings()
    fetchHeroSections()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const data = await getSiteSettings()
      if (data && data.length > 0) {
        setSettings(prev => ({ ...prev, ...data[0].settings }))
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHeroSections = async () => {
    try {
      setHeroLoading(true)
      const data = await getHeroSections()
      setHeroSections(data || [])
    } catch (error) {
      console.error('Error fetching hero sections:', error)
    } finally {
      setHeroLoading(false)
    }
  }

  const openHeroModal = (hero = null) => {
    if (hero) {
      setEditingHero(hero)
      setHeroFormData({
        title: hero.title || '',
        subtitle: hero.subtitle || '',
        description: hero.description || '',
        background_image: hero.background_image || '',
        text_alignment: hero.text_alignment || 'center',
        overlay_opacity: hero.overlay_opacity || 0.5,
        is_active: hero.is_active !== undefined ? hero.is_active : true,
        cta_primary_text: hero.cta_primary_text || '',
        cta_primary_link: hero.cta_primary_link || '',
        cta_secondary_text: hero.cta_secondary_text || '',
        cta_secondary_link: hero.cta_secondary_link || ''
      })
    } else {
      setEditingHero(null)
      setHeroFormData({
        title: '',
        subtitle: '',
        description: '',
        background_image: '',
        text_alignment: 'center',
        overlay_opacity: 0.5,
        is_active: true,
        cta_primary_text: '',
        cta_primary_link: '',
        cta_secondary_text: '',
        cta_secondary_link: ''
      })
    }
    setShowHeroModal(true)
  }

  const closeHeroModal = () => {
    setShowHeroModal(false)
    setEditingHero(null)
  }

  const handleHeroFormSubmit = async (e) => {
    e.preventDefault()
    
    if (!heroFormData.title.trim()) {
      alert('Title is required')
      return
    }
    
    try {
      const heroData = {
        ...heroFormData,
        subtitle: heroFormData.subtitle || null,
        description: heroFormData.description || null,
        background_image: heroFormData.background_image || null,
        cta_primary_text: heroFormData.cta_primary_text || null,
        cta_primary_link: heroFormData.cta_primary_link || null,
        cta_secondary_text: heroFormData.cta_secondary_text || null,
        cta_secondary_link: heroFormData.cta_secondary_link || null,
        sort_order: editingHero ? editingHero.sort_order : heroSections.length + 1
      }
      
      let error
      if (editingHero) {
        ({ error } = await updateHeroSection(editingHero.id, heroData))
      } else {
        ({ error } = await createHeroSection(heroData))
      }
      
      if (error) throw error
      
      alert(`Hero section ${editingHero ? 'updated' : 'created'} successfully!`)
      closeHeroModal()
      fetchHeroSections()
    } catch (error) {
      console.error(`Error ${editingHero ? 'updating' : 'creating'} hero section:`, error)
      alert(`Failed to ${editingHero ? 'update' : 'create'} hero section`)
    }
  }



  const handleDeleteHeroSection = async (heroId) => {
    if (!window.confirm('Are you sure you want to delete this hero section?')) return
    
    try {
      const { error } = await deleteHeroSection(heroId)
      if (error) throw error
      
      alert('Hero section deleted successfully!')
      fetchHeroSections()
    } catch (error) {
      console.error('Error deleting hero section:', error)
      alert('Failed to delete hero section')
    }
  }

  const toggleHeroStatus = async (hero) => {
    try {
      const heroData = {
        ...hero,
        is_active: !hero.is_active
      }
      
      const { error } = await updateHeroSection(hero.id, heroData)
      if (error) throw error
      
      fetchHeroSections()
    } catch (error) {
      console.error('Error toggling hero status:', error)
      alert('Failed to update hero section status')
    }
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      await updateSiteSettings(settings)
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const updateNestedSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const updateBusinessHours = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      business_hours: {
        ...prev.business_hours,
        [day]: {
          ...prev.business_hours[day],
          [field]: value
        }
      }
    }))
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'contact', name: 'Contact', icon: Phone },
    { id: 'hours', name: 'Business Hours', icon: Clock },
    { id: 'hero-sections', name: 'Hero Sections', icon: Image },
    { id: 'seo', name: 'SEO', icon: SettingsIcon },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'registration', name: 'Registration', icon: Shield },
    { id: 'maintenance', name: 'Maintenance', icon: Database }
  ]

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
        <h1 className="text-2xl font-bold text-emerald-900">Site Settings</h1>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Settings
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tabs */}
        <div className="border-b border-emerald-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-emerald-500 hover:text-emerald-700 hover:border-emerald-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Cricket Cadets Global"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.site_url}
                    onChange={(e) => setSettings(prev => ({ ...prev, site_url: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://cricketcadetsglobal.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Site Description
                </label>
                <textarea
                  value={settings.site_description}
                  onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                  rows={3}
                  className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Brief description of your cricket academy..."
                />
              </div>
              
              <div>
                <h3 className="text-md font-medium text-emerald-900 mb-3">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(settings.social_media).map((platform) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-emerald-700 mb-1 capitalize">
                        {platform}
                      </label>
                      <input
                        type="url"
                        value={settings.social_media[platform]}
                        onChange={(e) => updateNestedSetting('social_media', platform, e.target.value)}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder={`https://${platform}.com/yourpage`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Settings */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="info@cricketcadetsglobal.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.contact_phone}
                    onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Contact Address
                </label>
                <textarea
                  value={settings.contact_address}
                  onChange={(e) => setSettings(prev => ({ ...prev, contact_address: e.target.value }))}
                  rows={3}
                  className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="123 Main Street, City, State, Country"
                />
              </div>
            </div>
          )}

          {/* Business Hours */}
          {activeTab === 'hours' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">Business Hours</h2>
              
              <div className="space-y-4">
                {Object.keys(settings.business_hours).map((day) => (
                  <div key={day} className="flex items-center gap-4 p-4 border border-emerald-200 rounded-lg">
                    <div className="w-24">
                      <span className="font-medium text-emerald-900 capitalize">{day}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!settings.business_hours[day].closed}
                        onChange={(e) => updateBusinessHours(day, 'closed', !e.target.checked)}
                        className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                      />
                      <span className="text-sm text-emerald-600">Open</span>
                    </div>
                    
                    {!settings.business_hours[day].closed && (
                      <>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={settings.business_hours[day].open}
                            onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                            className="border border-emerald-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                          <span className="text-sm text-emerald-600">to</span>
                          <input
                            type="time"
                            value={settings.business_hours[day].close}
                            onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                            className="border border-emerald-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    )}
                    
                    {settings.business_hours[day].closed && (
                      <span className="text-sm text-emerald-500">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hero Sections */}
          {activeTab === 'hero-sections' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-emerald-900">Hero Sections</h2>
                <button
                   onClick={() => openHeroModal()}
                   className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                 >
                  <Plus className="h-4 w-4" />
                  Add Hero Section
                </button>
              </div>
              
              {heroLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {heroSections.length === 0 ? (
                    <div className="text-center py-8 text-emerald-600">
                      <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No hero sections found. Create your first hero section to get started.</p>
                    </div>
                  ) : (
                    heroSections.map((hero) => (
                      <div key={hero.id} className="border border-emerald-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-emerald-900">{hero.title}</h3>
                            {hero.subtitle && (
                              <p className="text-emerald-600 mt-1">{hero.subtitle}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                               onClick={() => openHeroModal(hero)}
                               className="text-emerald-600 hover:text-emerald-800 p-2"
                             >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteHeroSection(hero.id)}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-emerald-700">Status:</span>
                            <button
                              onClick={() => toggleHeroStatus(hero)}
                              className={`ml-2 px-2 py-1 rounded-full text-xs cursor-pointer hover:opacity-80 ${
                                hero.is_active 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {hero.is_active ? 'Active' : 'Inactive'}
                            </button>
                          </div>
                          <div>
                            <span className="font-medium text-emerald-700">Sort Order:</span>
                            <span className="ml-2 text-emerald-600">{hero.sort_order}</span>
                          </div>
                          <div>
                            <span className="font-medium text-emerald-700">Text Alignment:</span>
                            <span className="ml-2 text-emerald-600 capitalize">{hero.text_alignment}</span>
                          </div>
                          <div>
                            <span className="font-medium text-emerald-700">Overlay Opacity:</span>
                            <span className="ml-2 text-emerald-600">{(hero.overlay_opacity * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                        
                        {hero.description && (
                          <div className="mt-4">
                            <span className="font-medium text-emerald-700">Description:</span>
                            <p className="text-emerald-600 mt-1">{hero.description}</p>
                          </div>
                        )}
                        
                        {(hero.cta_primary_text || hero.cta_secondary_text) && (
                          <div className="mt-4">
                            <span className="font-medium text-emerald-700">Call to Actions:</span>
                            <div className="flex gap-2 mt-2">
                              {hero.cta_primary_text && (
                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                                  {hero.cta_primary_text}
                                </span>
                              )}
                              {hero.cta_secondary_text && (
                                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                                  {hero.cta_secondary_text}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Hero Section Modal */}
          {showHeroModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-emerald-900">
                    {editingHero ? 'Edit Hero Section' : 'Add New Hero Section'}
                  </h3>
                  <button
                    onClick={closeHeroModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={heroFormData.title}
                      onChange={(e) => setHeroFormData({...heroFormData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter hero section title"
                      required
                    />
                  </div>
                  
                  {/* Subtitle */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={heroFormData.subtitle}
                      onChange={(e) => setHeroFormData({...heroFormData, subtitle: e.target.value})}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter subtitle (optional)"
                    />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={heroFormData.description}
                      onChange={(e) => setHeroFormData({...heroFormData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter description (optional)"
                      rows={3}
                    />
                  </div>
                  
                  {/* Background Image */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Background Image URL
                    </label>
                    <input
                      type="url"
                      value={heroFormData.background_image}
                      onChange={(e) => setHeroFormData({...heroFormData, background_image: e.target.value})}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  {/* Text Alignment */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Text Alignment
                    </label>
                    <select
                      value={heroFormData.text_alignment}
                      onChange={(e) => setHeroFormData({...heroFormData, text_alignment: e.target.value})}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  
                  {/* Overlay Opacity */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Overlay Opacity: {Math.round(heroFormData.overlay_opacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={heroFormData.overlay_opacity}
                      onChange={(e) => setHeroFormData({...heroFormData, overlay_opacity: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Call to Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Primary CTA Text
                      </label>
                      <input
                        type="text"
                        value={heroFormData.cta_primary_text}
                        onChange={(e) => setHeroFormData({...heroFormData, cta_primary_text: e.target.value})}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Get Started"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Primary CTA URL
                      </label>
                      <input
                        type="url"
                        value={heroFormData.cta_primary_link}
                        onChange={(e) => setHeroFormData({...heroFormData, cta_primary_link: e.target.value})}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="/signup"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Secondary CTA Text
                      </label>
                      <input
                        type="text"
                        value={heroFormData.cta_secondary_text}
                        onChange={(e) => setHeroFormData({...heroFormData, cta_secondary_text: e.target.value})}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Learn More"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Secondary CTA URL
                      </label>
                      <input
                        type="url"
                        value={heroFormData.cta_secondary_link}
                        onChange={(e) => setHeroFormData({...heroFormData, cta_secondary_link: e.target.value})}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="/about"
                      />
                    </div>
                  </div>
                  
                  {/* Active Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={heroFormData.is_active}
                      onChange={(e) => setHeroFormData({...heroFormData, is_active: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-emerald-700">
                      Active (visible on website)
                    </label>
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={closeHeroModal}
                      className="px-4 py-2 text-emerald-600 border border-emerald-300 rounded-lg hover:bg-emerald-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      {editingHero ? 'Update' : 'Create'} Hero Section
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">SEO Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seo_settings.meta_title}
                    onChange={(e) => updateNestedSetting('seo_settings', 'meta_title', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Cricket Cadets Global - Premier Cricket Academy"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.seo_settings.meta_description}
                    onChange={(e) => updateNestedSetting('seo_settings', 'meta_description', e.target.value)}
                    rows={3}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Join Cricket Cadets Global for world-class cricket training..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={settings.seo_settings.meta_keywords}
                    onChange={(e) => updateNestedSetting('seo_settings', 'meta_keywords', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="cricket, training, academy, coaching, sports"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo_settings.google_analytics_id}
                      onChange={(e) => updateNestedSetting('seo_settings', 'google_analytics_id', e.target.value)}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="GA-XXXXXXXXX-X"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                      Google Tag Manager ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo_settings.google_tag_manager_id}
                      onChange={(e) => updateNestedSetting('seo_settings', 'google_tag_manager_id', e.target.value)}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="GTM-XXXXXXX"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">Email Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={settings.email_settings.smtp_host}
                    onChange={(e) => updateNestedSetting('email_settings', 'smtp_host', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={settings.email_settings.smtp_port}
                    onChange={(e) => updateNestedSetting('email_settings', 'smtp_port', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="587"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    value={settings.email_settings.smtp_username}
                    onChange={(e) => updateNestedSetting('email_settings', 'smtp_username', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your-email@gmail.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    value={settings.email_settings.smtp_password}
                    onChange={(e) => updateNestedSetting('email_settings', 'smtp_password', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={settings.email_settings.from_email}
                    onChange={(e) => updateNestedSetting('email_settings', 'from_email', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="noreply@cricketcadetsglobal.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={settings.email_settings.from_name}
                    onChange={(e) => updateNestedSetting('email_settings', 'from_name', e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Cricket Cadets Global"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Registration Settings */}
          {activeTab === 'registration' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">Registration Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.registration_settings.auto_approve}
                    onChange={(e) => updateNestedSetting('registration_settings', 'auto_approve', e.target.checked)}
                    className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  />
                  <label className="ml-2 text-sm font-medium text-emerald-700">
                    Auto-approve registrations
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.registration_settings.require_parent_consent}
                    onChange={(e) => updateNestedSetting('registration_settings', 'require_parent_consent', e.target.checked)}
                    className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  />
                  <label className="ml-2 text-sm font-medium text-emerald-700">
                    Require parent/guardian consent
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                      Minimum Age
                    </label>
                    <input
                      type="number"
                      value={settings.registration_settings.min_age}
                      onChange={(e) => updateNestedSetting('registration_settings', 'min_age', parseInt(e.target.value))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      min="1"
                      max="25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                      Maximum Age
                    </label>
                    <input
                      type="number"
                      value={settings.registration_settings.max_age}
                      onChange={(e) => updateNestedSetting('registration_settings', 'max_age', parseInt(e.target.value))}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      min="1"
                      max="25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                      Notification Email
                    </label>
                    <input
                      type="email"
                      value={settings.registration_settings.notification_email}
                      onChange={(e) => updateNestedSetting('registration_settings', 'notification_email', e.target.value)}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="admin@cricketcadetsglobal.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Settings */}
          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-emerald-900">Maintenance Mode</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.maintenance_mode}
                    onChange={(e) => setSettings(prev => ({ ...prev, maintenance_mode: e.target.checked }))}
                    className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  />
                  <label className="ml-2 text-sm font-medium text-emerald-700">
                    Enable maintenance mode
                  </label>
                </div>
                
                {settings.maintenance_mode && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <SettingsIcon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">
                          Maintenance Mode Active
                        </h3>
                        <div className="mt-2 text-sm text-amber-700">
                          <p>When maintenance mode is enabled, only administrators can access the site. All other visitors will see the maintenance message.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Maintenance Message
                  </label>
                  <textarea
                    value={settings.maintenance_message}
                    onChange={(e) => setSettings(prev => ({ ...prev, maintenance_message: e.target.value }))}
                    rows={4}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="We're currently performing scheduled maintenance. Please check back soon!"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings