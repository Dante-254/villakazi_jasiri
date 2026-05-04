# Vilakazi Jasiri - Complete Setup Guide

## ✅ Current Status

- **Build**: ✅ Successful (`npm run build`)
- **Development**: ✅ Running (`npm run dev` on port 3000)
- **All Patches**: ✅ Fixed
  - Fixed missing Supabase client imports
  - Fixed Next.js 16 API route params pattern
  - Fixed TypeScript compilation errors

## 📋 Setup Steps

### 1. Supabase Authentication Setup

#### Create Admin User:
1. Navigate to: https://supabase.com/dashboard/project/dkqgnumdidaothmqsnnr/auth/users
2. Click **"Add user"** button
3. Enter credentials:
   - **Email**: `admin@vilakazi.local` (or your email)
   - **Password**: Create a strong password (minimum 8 characters)
4. **Uncheck** "Automatically send sign up confirmation email"
5. Click **"Create user"**

#### Test Sign In:
- URL: `http://localhost:3000/auth/login`
- Enter the email and password you created
- Should redirect to `/admin` panel

### 2. Cloudinary Media Management

#### Automatic Folder Structure:
The app creates folders automatically when uploading:

```
villakazi/
├── events/
│   ├── {event-slug}/  (event-specific images)
│   └── ...
└── gallery/           (general gallery images)
```

#### Upload Images:
1. Go to admin panel: `http://localhost:3000/admin/events`
2. Click on an event → "Upload Images"
3. Images auto-organize by event slug

#### Manage in Cloudinary Console:
- Dashboard: https://console.cloudinary.com/console/c-dkinsxi3r/media_library
- Cloud Name: `dkinsxi3r`
- API Key: `797312332228178`

### 3. Database Setup

#### Verify Supabase Connection:
```bash
# Check .env variables
NEXT_PUBLIC_SUPABASE_URL=https://dkqgnumdidaothmqsnnr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Run Migrations:
```bash
# Migrations are in: supabase/migrations/
# They auto-run on first connection
```

## 🚀 Production Deployment

### Build for Production:
```bash
npm run build
npm start
```

### Production Checklist:
- [ ] Set all environment variables in `.env.production`
- [ ] Ensure Supabase URL and keys are correct
- [ ] Cloudinary credentials are valid
- [ ] Database migrations are applied
- [ ] Admin user exists in Supabase Auth
- [ ] Test login/logout flows
- [ ] Test image upload to Cloudinary
- [ ] Verify all pages load correctly

### Environment Variables Required:
```env
# Supabase (Public - safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://dkqgnumdidaothmqsnnr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Supabase (Secret - server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_HOST=db.dkqgnumdidaothmqsnnr.supabase.co
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your_password
SUPABASE_DB_PORT=5432

# Cloudinary
CLOUDINARY_CLOUD_NAME=dkinsxi3r
***REMOVED***
***REMOVED***
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   └── [public pages]/    # Public routes
├── components/            # React components
│   ├── admin/            # Admin forms & components
│   └── ui/               # Shared UI components
├── lib/                  # Server-side utilities
│   ├── cloudinary.ts    # Cloudinary setup
│   └── supabaseServer.ts # Supabase server client
├── utils/               # Shared utilities
│   └── supabase/       # Supabase clients
└── config/              # App configuration
```

## 🔐 Security Notes

- **Never commit `.env` files** - use `.env.example` for reference
- **Service role key** - Only use on server-side (backend)
- **Anon key** - Safe to expose in frontend (already public)
- **Cloudinary API Secret** - Keep server-side only

## 🧪 Testing

### Development:
```bash
npm run dev
```

### Build Test:
```bash
npm run build
npm start
```

### Lint Check:
```bash
npm run lint
```

## 📚 Key Features

- ✅ Admin authentication (Supabase)
- ✅ Event management CRUD
- ✅ Crew leaders management
- ✅ Patrol members management
- ✅ Image upload to Cloudinary with folder organization
- ✅ Gallery display by event
- ✅ Responsive design (Tailwind CSS)
- ✅ Dark mode support
- ✅ Server-side rendering optimized

## 🔗 Useful Links

- **Supabase Project**: https://supabase.com/dashboard/project/dkqgnumdidaothmqsnnr
- **Cloudinary Console**: https://console.cloudinary.com/console/c-dkinsxi3r
- **GitHub Repo**: https://github.com/Dante-254/vilakazi_jasiri
- **Next.js Docs**: https://nextjs.org/docs
