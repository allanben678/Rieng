import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const username = 'uncojingjong'
  const { data, error } = await supabase
    .from('artist_accounts')
    .select('artist_id, username, email, password, artists(stage_name)')
    .eq('username', username)
    .single()
  
  console.log("DATA:", JSON.stringify(data, null, 2))
  console.log("ERROR:", JSON.stringify(error, null, 2))
}

test()
