const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupAdmin() {
  try {
    // Create admin user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@safehaven.com',
      password: 'SafeHaven2024!',
      email_confirm: true
    })

    if (authError) throw authError

    // Create admin in agents table
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .insert([
        {
          user_id: authUser.user.id,
          name: 'Admin User',
          email: 'admin@safehaven.com',
          role: 'admin',
          status: 'active'
        }
      ])
      .select()
      .single()

    if (agentError) throw agentError

    console.log('Admin user created successfully:', {
      id: agent.id,
      email: agent.email
    })

    console.log('\nAdmin Credentials:')
    console.log('Email: admin@safehaven.com')
    console.log('Password: SafeHaven2024!')
    console.log('Access Code: Pro2025')

  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

setupAdmin() 