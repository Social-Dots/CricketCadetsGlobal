import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter, Save, X } from 'lucide-react'
import { getPages, createPage, updatePage, deletePage } from '../../lib/supabase'

const Pages = () => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingPage, setEditingPage] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    meta_keywords: '',
    status: 'published',
    featured_image: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const data = await getPages()
      setPages(data || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePage = () => {
    setEditingPage(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      meta_description: '',
      meta_keywords: '',
      status: 'published',
      featured_image: ''
    })
    setShowModal(true)
  }

  const handleEditPage = (page) => {
    setEditingPage(page)
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      content: page.content || '',
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords || '',
      status: page.status || 'published',
      featured_image: page.featured_image || ''
    })
    setShowModal(true)
  }

  const handleSavePage = async () => {
    try {
      setSaving(true)
      
      if (editingPage) {
        await updatePage(editingPage.id, formData)
      } else {
        await createPage(formData)
      }
      
      await fetchPages()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Error saving page. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeletePage = async (pageId) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await deletePage(pageId)
        await fetchPages()
      } catch (error) {
        console.error('Error deleting page:', error)
        alert('Error deleting page. Please try again.')
      }
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const handleTitleChange = (title) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !editingPage ? generateSlug(title) : prev.slug
    }))
  }

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter
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
        <h1 className="text-2xl font-bold text-emerald-900">Pages Management</h1>
        <button
          onClick={handleCreatePage}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Page
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-lg border border-emerald-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search pages..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-lg shadow-lg border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-emerald-200">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-emerald-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-emerald-900">{page.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-emerald-600">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      page.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(`/${page.slug}`, '_blank')}
                        className="text-emerald-600 hover:text-emerald-900"
                        title="View Page"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditPage(page)}
                        className="text-emerald-700 hover:text-emerald-900"
                        title="Edit Page"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePage(page.id)}
                        className="text-amber-600 hover:text-amber-900"
                        title="Delete Page"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-emerald-600">No pages found.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-900">
                  {editingPage ? 'Edit Page' : 'Create New Page'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-emerald-500 hover:text-emerald-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter page title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="page-url-slug"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter page content (HTML supported)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                    rows={2}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="SEO meta description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featured_image}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
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
                  onClick={handleSavePage}
                  disabled={saving || !formData.title || !formData.slug}
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
                      {editingPage ? 'Update' : 'Create'} Page
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

export default Pages