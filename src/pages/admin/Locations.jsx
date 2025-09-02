import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Save, X, MapPin, Phone, Mail, Globe } from 'lucide-react'
import { getLocations, createLocation, updateLocation, deleteLocation } from '../../lib/supabase'

const Locations = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    facilities: [],
    operating_hours: {},
    coordinates: { lat: null, lng: null },
    image_url: '',
    is_active: true
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      const data = await getLocations()
      setLocations(data || [])
    } catch (error) {
      console.error('Error fetching locations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateLocation = () => {
    setEditingLocation(null)
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      phone: '',
      email: '',
      website: '',
      description: '',
      facilities: [],
      operating_hours: {},
      coordinates: { lat: null, lng: null },
      image_url: '',
      is_active: true
    })
    setShowModal(true)
  }

  const handleEditLocation = (location) => {
    setEditingLocation(location)
    setFormData({
      name: location.name || '',
      address: location.address || '',
      city: location.city || '',
      state: location.state || '',
      country: location.country || '',
      postal_code: location.postal_code || '',
      phone: location.phone || '',
      email: location.email || '',
      website: location.website || '',
      description: location.description || '',
      facilities: location.facilities || [],
      operating_hours: location.operating_hours || {},
      coordinates: location.coordinates || { lat: null, lng: null },
      image_url: location.image_url || '',
      is_active: location.is_active !== false
    })
    setShowModal(true)
  }

  const handleSaveLocation = async () => {
    try {
      setSaving(true)
      
      if (editingLocation) {
        await updateLocation(editingLocation.id, formData)
      } else {
        await createLocation(formData)
      }
      
      await fetchLocations()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving location:', error)
      alert('Error saving location. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteLocation = async (locationId) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await deleteLocation(locationId)
        await fetchLocations()
      } catch (error) {
        console.error('Error deleting location:', error)
        alert('Error deleting location. Please try again.')
      }
    }
  }

  const handleFacilityChange = (facility, checked) => {
    setFormData(prev => ({
      ...prev,
      facilities: checked 
        ? [...prev.facilities, facility]
        : prev.facilities.filter(f => f !== facility)
    }))
  }

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.country?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && location.is_active) ||
                         (statusFilter === 'inactive' && !location.is_active)
    return matchesSearch && matchesStatus
  })

  const facilityOptions = [
    'Indoor Nets', 'Outdoor Nets', 'Bowling Machine', 'Video Analysis',
    'Fitness Center', 'Changing Rooms', 'Parking', 'Cafe/Restaurant',
    'Pro Shop', 'Physiotherapy', 'Match Ground', 'Practice Pitches'
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
        <h1 className="text-2xl font-bold text-emerald-900">Locations Management</h1>
        <button
          onClick={handleCreateLocation}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Location
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
                placeholder="Search locations..."
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

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {location.image_url && (
              <img
                src={location.image_url}
                alt={location.name}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-emerald-900 text-lg">{location.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  location.is_active 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {location.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-emerald-600">
                    <div>{location.address}</div>
                    <div>{location.city}, {location.state} {location.postal_code}</div>
                    <div>{location.country}</div>
                  </div>
                </div>
                
                {location.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-emerald-600">{location.phone}</span>
                  </div>
                )}
                
                {location.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-emerald-600">{location.email}</span>
                  </div>
                )}
                
                {location.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-400" />
                    <a 
                      href={location.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 hover:text-emerald-800"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
              
              {location.description && (
                <p className="text-sm text-emerald-700 mb-3 line-clamp-2">
                  {location.description}
                </p>
              )}
              
              {location.facilities && location.facilities.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {location.facilities.slice(0, 3).map((facility, index) => (
                      <span 
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded"
                      >
                        {facility}
                      </span>
                    ))}
                    {location.facilities.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-amber-100 text-amber-600 rounded">
                        +{location.facilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEditLocation(location)}
                  className="text-emerald-600 hover:text-emerald-900"
                  title="Edit Location"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="text-amber-600 hover:text-amber-900"
                  title="Delete Location"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-emerald-500">No locations found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-900">
                  {editingLocation ? 'Edit Location' : 'Add New Location'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium text-emerald-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Location Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Cricket Academy Name"
                        required
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
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-medium text-emerald-900 mb-3">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Toronto"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Ontario"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.postal_code}
                          onChange={(e) => setFormData(prev => ({ ...prev, postal_code: e.target.value }))}
                          className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="M5V 3A8"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Canada"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-emerald-900 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="info@location.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="https://www.location.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Brief description of the location..."
                  />
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-lg font-medium text-emerald-900 mb-3">Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {facilityOptions.map((facility) => (
                      <label key={facility} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.facilities.includes(facility)}
                          onChange={(e) => handleFacilityChange(facility, e.target.checked)}
                          className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-emerald-700">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="rounded border-emerald-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm font-medium text-emerald-700">Active Location</span>
                  </label>
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
                  onClick={handleSaveLocation}
                  disabled={saving || !formData.name || !formData.address || !formData.city || !formData.country}
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
                      {editingLocation ? 'Update' : 'Add'} Location
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

export default Locations