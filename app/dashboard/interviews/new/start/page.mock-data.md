# Mock Data in Interview Start Page

This file documents where mock/static data is used in the interview session.

**File:** `app/dashboard/interviews/new/start/page.tsx`

## Current Implementation

Lines 10-33: Hardcoded questions array
```typescript
const questions = [
  {
    id: 1,
    text: "Tell me about yourself...",
    type: "behavioral",
    duration: 120,
  },
  // ...
];
```

## To Connect to Real Data

1. Fetch questions from database after interview creation
2. Store responses in database
3. Implement actual video recording
4. Upload videos to cloud storage
5. Store transcripts in database

## API Endpoints to Create

- `GET /api/interviews/[id]/questions` - Fetch questions for an interview
- `POST /api/responses` - Save a response
- `POST /api/interviews/[id]/complete` - Mark interview as complete
- `POST /api/videos/upload` - Upload video files

