import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const BUCKET_NAME = 'forms'

export async function POST(request: Request) {
  try {
    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets()
    const formsBucket = buckets?.find(b => b.name === BUCKET_NAME)
    
    if (!formsBucket) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760 // 10MB limit
      })
      
      if (createError) {
        console.error('Bucket creation error:', createError)
        return NextResponse.json(
          { message: 'Failed to create storage bucket' },
          { status: 500 }
        )
      }
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const formId = formData.get('formId') as string

    if (!file || !formId) {
      return NextResponse.json(
        { message: 'File and form ID are required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { message: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer()

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`${formId}/${file.name}`, buffer, {
        contentType: file.type,
        upsert: true
      })

    if (error) {
      console.error('Storage error:', error)
      return NextResponse.json(
        { message: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`${formId}/${file.name}`)

    // Update form record with PDF URL
    const { error: updateError } = await supabase
      .from('forms')
      .update({ pdf_url: publicUrl })
      .eq('id', formId)

    if (updateError) {
      console.error('Form update error:', updateError)
      return NextResponse.json(
        { message: 'Failed to update form with PDF URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: publicUrl }, { status: 200 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'An error occurred during file upload' },
      { status: 500 }
    )
  }
} 