# Test System - Setup Guide

## Overview
یہ ایک complete test management system ہے جس میں:
- **Admin Panel**: سوالات add/edit/delete کرنے کے لیے
- **Test Taking Interface**: Users کے لیے tests دینے کا system
- **Results Tracking**: Test results save اور display کرنے کا system

## Database Setup

### Step 1: Generate Prisma Client
```bash
npx prisma generate
```

### Step 2: Create Migration
```bash
npx prisma migrate dev --name add_test_system
```

## Database Schema

### Models Created:
1. **User** - Updated with `isAdmin` field
2. **Test** - Test information (title, description, category, subject)
3. **Question** - Questions belonging to tests
4. **Option** - Multiple choice options for questions
5. **TestResult** - User test results and scores

## Admin Access

### Make a User Admin
Database میں جا کر کسی user کی `isAdmin` field کو `true` کریں:

```sql
UPDATE "User" SET "isAdmin" = true WHERE email = 'your-admin-email@example.com';
```

## Usage

### Admin Panel
- URL: `/admin/tests`
- Admin users can:
  - Create new tests
  - Add questions with multiple options (minimum 2, unlimited maximum)
  - Mark correct answers
  - Edit existing tests
  - Delete tests

### Test Taking
1. User login کرتا ہے
2. "Test Yourself" button پر click کرتا ہے
3. Subject select کرتا ہے (Math, Urdu, English, Arabic)
4. Available tests میں سے کوئی test select کرتا ہے
5. Questions کے answers دیتا ہے
6. Submit کرنے پر results دیکھتا ہے

### Features:
- **Multiple Choice Questions**: ہر question میں 2 سے unlimited options
- **Progress Tracking**: کتنے questions answered ہیں
- **Navigation**: Previous/Next buttons اور question numbers پر click کر کے jump
- **Results Display**: 
  - Score and percentage
  - Correct/incorrect answers کا review
  - Correct answers کی display
- **Test History**: User کی تمام test results save ہوتی ہیں

## API Endpoints

### Tests
- `GET /api/tests` - Get all tests (with filters)
- `POST /api/tests` - Create new test (Admin only)
- `GET /api/tests/[id]` - Get specific test
- `PUT /api/tests/[id]` - Update test (Admin only)
- `DELETE /api/tests/[id]` - Delete test (Admin only)

### Test Results
- `POST /api/test-results` - Submit test result
- `GET /api/test-results` - Get user's test results

## File Structure

```
app/
├── admin/
│   └── tests/
│       └── page.tsx                    # Admin panel for managing tests
├── test-yourself/
│   ├── page.tsx                        # Test categories page
│   ├── foundation/
│   │   └── [subject]/
│   │       └── page.tsx                # Subject-specific tests list
│   └── take/
│       └── [testId]/
│           └── page.tsx                # Test taking interface
└── api/
    ├── tests/
    │   ├── route.ts                    # GET all tests, POST new test
    │   └── [id]/
    │       └── route.ts                # GET, PUT, DELETE specific test
    └── test-results/
        └── route.ts                    # POST result, GET user results

prisma/
└── schema.prisma                       # Database schema
```

## Example: Creating a Math Test

1. Admin panel (`/admin/tests`) پر جائیں
2. "Create New Test" button click کریں
3. Test details fill کریں:
   - Title: "Basic Arithmetic"
   - Description: "Test your basic math skills"
   - Category: "foundation"
   - Subject: "math"
4. Questions add کریں:
   - Question: "2 + 2 = ?"
   - Options:
     - "3" (incorrect)
     - "4" (correct - checkbox check کریں)
     - "5" (incorrect)
5. More questions add کرنے کے لیے "Add Question" button use کریں
6. "Create Test" button click کریں

## Notes

- Prisma client errors fix کرنے کے لیے `npx prisma generate` ضرور چلائیں
- Database connection string `.env` file میں ہونا چاہیے
- Admin access کے لیے database میں manually `isAdmin` field update کریں
