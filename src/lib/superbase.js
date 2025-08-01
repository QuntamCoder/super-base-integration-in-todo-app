import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ioeptkqugqsrdkifisnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZXB0a3F1Z3FzcmRraWZpc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMjcxMjQsImV4cCI6MjA2OTYwMzEyNH0.gd4g9r_6Wgp28biAsSYLa6bbi35ozpCwZY1UJLhhYNk'

// Create only ONE instance and export it
export const supabase = createClient(supabaseUrl, supabaseKey)