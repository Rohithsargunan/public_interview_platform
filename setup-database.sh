#!/bin/bash
echo "Setting up InterviewAI Database Connection..."
echo

echo "Please follow these steps:"
echo "1. Go to https://supabase.com"
echo "2. Create a new project"
echo "3. Go to Settings > API"
echo "4. Copy your Project URL and anon key"
echo

read -p "Enter your Supabase Project URL: " SUPABASE_URL
read -p "Enter your Supabase anon key: " SUPABASE_KEY

echo
echo "Creating .env.local file..."

cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_KEY

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF

echo
echo "✅ Environment file created!"
echo
echo "Next steps:"
echo "1. Run the SQL schema in Supabase SQL Editor"
echo "2. Restart the development server"
echo "3. Check the dashboard for real data"
echo
