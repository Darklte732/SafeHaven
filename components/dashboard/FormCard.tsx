'use client'

import type { Database } from '@/types/supabase'

type Form = Database['public']['Tables']['forms']['Row']

interface FormCardProps {
  form: Form
  onClick: () => void
}

export function FormCard({ form, onClick }: FormCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    submitted: 'bg-blue-100 text-blue-800'
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch (err) {
      console.error('Date formatting error:', err)
      return 'Invalid date'
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">
            {form.first_name} {form.last_name}
          </h3>
          <p className="text-sm text-gray-600">{form.phone}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[form.status]}`}>
          {form.status}
        </span>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Coverage:</span> ${form.coverage_amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">DOB:</span> {formatDate(form.dob)}
        </p>
        {form.medical_conditions && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Medical:</span> {form.medical_conditions}
          </p>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>Created: {formatDate(form.created_at)}</span>
        {form.pdf_url && (
          <div className="flex items-center text-primary">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>PDF Available</span>
          </div>
        )}
      </div>
    </div>
  )
} 