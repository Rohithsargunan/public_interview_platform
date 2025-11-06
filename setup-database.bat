@echo off
echo Setting up InterviewAI Database Connection...
echo.

echo Please follow these steps:
echo 1. Go to https://supabase.com
echo 2. Create a new project
echo 3. Go to Settings ^> API
echo 4. Copy your Project URL and anon key
echo.

set /p SUPABASE_URL="Enter your Supabase Project URL: "
set /p SUPABASE_KEY="Enter your Supabase anon key: "

echo.
echo Creating .env.local file...

(
echo # Supabase Configuration
echo NEXT_PUBLIC_SUPABASE_URL=%SUPABASE_URL%
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=%SUPABASE_KEY%
echo.
echo # Optional: For server-side operations
echo SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
) > .env.local

echo.
echo ✅ Environment file created!
echo.
echo Next steps:
echo 1. Run the SQL schema in Supabase SQL Editor
echo 2. Restart the development server
echo 3. Check the dashboard for real data
echo.
pause
