# InterviewAI - AI-Powered Interview Platform

A comprehensive web application for AI-powered interview preparation, featuring mock interviews, automated evaluation, detailed feedback reports, and progress tracking.

## 🚀 Features

### For Candidates (B2C Phase 1)
- ✅ AI-powered mock interviews tailored to specific job roles and experience levels
- ✅ Comprehensive feedback reports analyzing communication, technical skills, and behavioral competencies
- ✅ Personalized learning plans with progress tracking across multiple interview sessions
- ✅ Free basic tier for accessibility with premium features for serious job seekers

### Current Implementation
- ✅ Landing page with hero, features, and pricing sections
- ✅ Authentication system (sign up/login pages)
- ✅ Dashboard with interview management
- ✅ Interview creation flow with job role and experience level selection
- ✅ Video recording interface for interview responses
- ✅ Mock AI evaluation and feedback system

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Font**: Inter

## 📦 Installation

```bash
# Navigate to the project
cd interview-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
interview-platform/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   ├── HowItWorks.tsx    # How it works section
│   ├── Pricing.tsx       # Pricing section
│   └── Dashboard*.tsx    # Dashboard components
├── lib/
│   └── utils.ts          # Utility functions
└── README.md
```

## 🎯 Key Pages

1. **Landing Page** (`/`) - Public marketing page
2. **Login** (`/auth/login`) - User authentication
3. **Sign Up** (`/auth/signup`) - User registration
4. **Dashboard** (`/dashboard`) - Main dashboard
5. **Create Interview** (`/dashboard/interviews/new`) - Interview setup
6. **Interview Session** (`/dashboard/interviews/new/start`) - Live interview recording

## 🚧 Planned Features (Next Steps)

- [ ] AI Integration with OpenAI GPT-4
- [ ] Video recording with MediaRecorder API
- [ ] Cloud storage for videos (AWS S3)
- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Real-time transcription
- [ ] Subscription and payment (Stripe)
- [ ] Progress tracking dashboard
- [ ] Detailed PDF reports

## 🔧 Development Notes

This is a MVP implementation focusing on:
- Modern, responsive UI design
- Clean component architecture
- TypeScript for type safety
- Scalable folder structure
- Ready for backend integration

## 📝 License

MIT License
