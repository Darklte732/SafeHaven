'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type Form = Database['public']['Tables']['forms']['Row']

export default function DashboardPage() {
  const [forms, setForms] = useState<Form[]>([])
  const [selectedForm, setSelectedForm] = useState<Form | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setForms(data || [])
    } catch (err) {
      console.error('Error fetching forms:', err)
      setError('Failed to load forms. Please try refreshing the page.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (err) {
      console.error('Date formatting error:', err)
      return 'Invalid date'
    }
  }

  const handleFileUpload = async (formId: string, file: File) => {
    try {
      setIsUploading(true)
      setUploadStatus('')

      // Validate file type and size
      if (!file.type.includes('pdf')) {
        throw new Error('Please upload a PDF file')
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('formId', formId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed')
      }

      setUploadStatus('File uploaded successfully')
      await fetchForms() // Refresh forms list
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFormClick = (form: Form) => {
    setSelectedForm(form)
  }

  const getFormsByStatus = (status: Form['status']) => {
    return forms.filter(form => form.status === status)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading forms...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
          <svg className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchForms}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Form Management Dashboard</h1>
        <button
          onClick={fetchForms}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Forms Column */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Forms</h2>
          <div className="space-y-4">
            {getFormsByStatus('pending').map((form) => (
              <div
                key={form.id}
                onClick={() => handleFormClick(form)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium">{`${form.first_name} ${form.last_name}`}</h3>
                <p className="text-sm text-gray-500">{form.phone}</p>
                <p className="text-xs text-gray-400">{formatDate(form.created_at)}</p>
              </div>
            ))}
            {getFormsByStatus('pending').length === 0 && (
              <p className="text-gray-500 text-center py-4">No pending forms</p>
            )}
          </div>
        </div>

        {/* Completed Forms Column */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Completed Forms</h2>
          <div className="space-y-4">
            {getFormsByStatus('completed').map((form) => (
              <div
                key={form.id}
                onClick={() => handleFormClick(form)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium">{`${form.first_name} ${form.last_name}`}</h3>
                <p className="text-sm text-gray-500">{form.phone}</p>
                <p className="text-xs text-gray-400">{formatDate(form.created_at)}</p>
              </div>
            ))}
            {getFormsByStatus('completed').length === 0 && (
              <p className="text-gray-500 text-center py-4">No completed forms</p>
            )}
          </div>
        </div>

        {/* Submitted Forms Column */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Submitted Forms</h2>
          <div className="space-y-4">
            {getFormsByStatus('submitted').map((form) => (
              <div
                key={form.id}
                onClick={() => handleFormClick(form)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium">{`${form.first_name} ${form.last_name}`}</h3>
                <p className="text-sm text-gray-500">{form.phone}</p>
                <p className="text-xs text-gray-400">{formatDate(form.created_at)}</p>
              </div>
            ))}
            {getFormsByStatus('submitted').length === 0 && (
              <p className="text-gray-500 text-center py-4">No submitted forms</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Details Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Form Details</h3>
              <button
                onClick={() => setSelectedForm(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Client Name</p>
                  <p className="font-medium">{`${selectedForm.first_name} ${selectedForm.last_name}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedForm.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedForm.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{selectedForm.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Created</p>
                  <p className="font-medium">{formatDate(selectedForm.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coverage Amount</p>
                  <p className="font-medium">${selectedForm.coverage_amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="font-medium mb-2">PDF Document</p>
                {selectedForm.pdf_url ? (
                  <a 
                    href={selectedForm.pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View PDF
                  </a>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(selectedForm.id, file)
                      }}
                      disabled={isUploading}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {uploadStatus && (
                      <p className={`text-sm ${
                        uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {uploadStatus}
                      </p>
                    )}
                    {isUploading && (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-600">Uploading...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedForm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 