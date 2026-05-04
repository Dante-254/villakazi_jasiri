#!/bin/bash
# Production Deployment Quick Start

echo "🚀 Vilakazi Jasiri - Production Deployment"
echo ""
echo "1️⃣  Install dependencies:"
echo "   npm install"
echo ""
echo "2️⃣  Build for production:"
echo "   npm run build"
echo ""
echo "3️⃣  Start the server:"
echo "   npm start"
echo ""
echo "4️⃣  Verify environment variables:"
cat << 'EOF'
   Required in .env:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - SUPABASE_DB_HOST
   - SUPABASE_DB_NAME
   - SUPABASE_DB_USER
   - SUPABASE_DB_PASSWORD
   - SUPABASE_DB_PORT
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
EOF
echo ""
echo "5️⃣  Access the app:"
echo "   http://localhost:3000"
echo ""
echo "6️⃣  Admin login:"
echo "   Navigate to: http://localhost:3000/auth/login"
echo "   Use credentials created in Supabase"
echo ""
echo "✅ Production checklist:"
echo "   ✓ All environment variables set"
echo "   ✓ Supabase auth user created"
echo "   ✓ Database migrations applied"
echo "   ✓ Cloudinary API connected"
echo "   ✓ Build successful (npm run build)"
echo "   ✓ Server running on port 3000"
echo ""
