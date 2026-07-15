# Digital School Project Report

## 📋 Project Overview

**Name:** Common Man Lessons (Digital School)  
**Tech Stack:** Next.js 16, React 19, TypeScript, Prisma, NextAuth, PostgreSQL, TailwindCSS  
**Purpose:** Educational platform providing foundational lessons in Urdu, Mathematics, English, and Arabic grammar

---

## 🗄️ Database Schema

### User Model
- **Fields:** id (cuid), email (unique), password, createdAt, updatedAt
- **Purpose:** Store user credentials for authentication

---

## 🔐 Server Actions

### Location: `actions/auth.ts`

#### `RegisterUser(email, password)`
- **Type:** Server Action (async)
- **Purpose:** Create new user account
- **Implementation:** Uses Prisma to create user with email/password
- **Error Handling:** Wrapped in `safeAction` utility for error management
- **Returns:** `{ success: true }` or error object

---

## 🌐 Pages & Routes

### 1. **Home Page** (`/`)
- **File:** `app/page.tsx`
- **Type:** Client Component
- **Features:**
  - Hero section with tagline: "Understand naturally, Speed comes automatically!"
  - Three main action buttons:
    - **Explorer** → Links to `/explorer`
    - **Test Yourself** → Opens login dialog (requires authentication)
    - **Result & Certificate** → Placeholder
  - Logout button (visible when authenticated)
  - Mission section explaining platform purpose
- **Authentication:** Uses NextAuth session management

---

### 2. **Explorer Page** (`/explorer`)
- **File:** `app/explorer/page.tsx`
- **Type:** Client Component
- **Purpose:** Learning path selection hub
- **Options:**
  - **Foundation** (largest button) → `/explorer/foundation`
  - **PCTB** → External link to Punjab Curriculum Textbook Board
  - **Cambridge** → `/explorer/cambridge` (not implemented)
  - **Madrasah Nisab** → `/explorer/madrasah` (not implemented)
  - **Combined/Balanced** → `/explorer/combined` (not implemented)

---

### 3. **Foundation Page** (`/explorer/foundation`)
- **File:** `app/explorer/foundation/page.tsx`
- **Type:** Client Component
- **Purpose:** Subject selection for foundational learning
- **Subjects:**
  - **Urdu Grammar** (اردو قواعد) → `/explorer/foundation/urdu-grammar`
  - **Mathematics** (ریاضی) → `/explorer/foundation/mathematics`
  - **English Grammar** → `/explorer/foundation/english-grammar`
  - **Arabic with Sarf o Nahw** (عربی مع صرف و نحو) → `/explorer/foundation/arabic-grammar`
- **Features:** Back button to return to explorer

---

### 4. **Urdu Grammar Lessons** (`/explorer/foundation/urdu-grammar`)
- **File:** `app/explorer/foundation/urdu-grammar/page.tsx`
- **Type:** Client Component
- **Lessons:** 9 lessons (6 active with YouTube links, 3 placeholders)
  - Lesson 1: Symbol of Alphabet (حرف کی علامت)
  - Lesson 2: Letters, Vowels & Words (حرف، حرکات، لفظ)
  - Lesson 3: Types of Words (لفظ کی اقسام)
  - Lesson 4: Noun (اسم)
  - Lesson 5-6: Pronoun Parts 1-2 (اسم ضمیر)
  - Lessons 7-9: Empty placeholders
- **Content:** Links to YouTube video lessons

---

### 5. **Mathematics Lessons** (`/explorer/foundation/mathematics`)
- **File:** `app/explorer/foundation/mathematics/page.tsx`
- **Type:** Client Component
- **Lessons:** 9 lessons (6 active, 3 placeholders)
  - Lesson 1: Introduction to Numbers (نمبروں کا تعارف)
  - Lesson 2: Basic Operations (بنیادی عملیات)
  - Lesson 3: Fractions (کسر)
  - Lesson 4: Decimals (اعشاریہ)
  - Lesson 5: Percentages (فیصد)
  - Lesson 6: Basic Geometry (بنیادی جیومیٹری)
  - Lessons 7-9: Empty placeholders
- **Content:** Placeholder links (not yet connected to videos)

---

### 6. **English Grammar Lessons** (`/explorer/foundation/english-grammar`)
- **File:** `app/explorer/foundation/english-grammar/page.tsx`
- **Type:** Client Component
- **Lessons:** 9 lessons (6 active, 3 placeholders)
  - Lesson 1: Parts of Speech (کلام کی اقسام)
  - Lesson 2: Nouns and Pronouns (اسم اور اسم ضمیر)
  - Lesson 3: Verbs and Tenses (فعل اور اوقات)
  - Lesson 4: Adjectives (صفت)
  - Lesson 5: Adverbs (متعلق فعل)
  - Lesson 6: Prepositions (حرف جار)
  - Lessons 7-9: Empty placeholders
- **Content:** Placeholder links (not yet connected to videos)

---

### 7. **Arabic Grammar Lessons** (`/explorer/foundation/arabic-grammar`)
- **File:** `app/explorer/foundation/arabic-grammar/page.tsx`
- **Type:** Client Component
- **Focus:** Quran Translation with Sarf o Nahw
- **Lessons:** 9 lessons (7 active with YouTube links, 2 placeholders)
  - Lesson 1: Beginning of speech (آغاز کلام)
  - Lesson 2: لا حول ولا قوة الا بالله (placeholder)
  - Lesson 3: اعوذ باللہ من الشیطان الرجیم (placeholder)
  - Lesson 4: Bismillah (بسم اللہ الرحمن الرحیم)
  - Lesson 5: Alhamdulillah (الحمد للہ رب العالمین)
  - Lesson 6: Owner of Day of Judgement (مالک یوم الدین)
  - Lesson 7: Guide us the right path (اھدنا الصراط المستقیم)
  - Lesson 8: Surah Al Qadr (انا انزلناہ)
  - Lesson 9: Surah Ikhlaas (قل ہو اللہ احد)
- **Content:** Links to YouTube video lessons

---

## 🔒 Authentication System

### NextAuth Configuration
- **File:** `app/api/auth/[...nextauth]/route.ts`
- **Provider:** Credentials-based authentication
- **Strategy:** JWT sessions
- **Sign-in Page:** Custom (redirects to `/`)
- **Process:**
  1. User provides email/password
  2. Validates against Prisma User model
  3. Returns user object with id and email
  4. Creates JWT session

### Login Dialog Component
- **File:** `components/LoginDialog.tsx`
- **Modes:** Login, Register, Reset Password (reset not implemented)
- **Features:**
  - Email/password input fields
  - Mode switching between login/register
  - Loading states during submission
  - Toast notifications for success/errors
  - Automatic login after registration

---

## 🧩 Key Components

### 1. **AppProviders** (`components/AppProviders.tsx`)
- Wraps app with NextAuth SessionProvider
- Enables session management across the app

### 2. **LoginDialog** (`components/LoginDialog.tsx`)
- Modal dialog for authentication
- Handles both login and registration
- Integrates with RegisterUser server action

### 3. **Layout** (`app/layout.tsx`)
- Root layout with Navbar and Footer
- Includes Toaster for notifications
- Wraps children with AppProviders

---

## 🛠️ Utilities

### `lib/utils.ts`

#### `cn(...inputs)` 
- Merges Tailwind classes using clsx and tailwind-merge

#### `safeAction<TArgs, TResult>(action)`
- Error handling wrapper for server actions
- Returns: `{ data?: T, error?: string }`
- Catches and formats errors automatically

---

## 📊 Project Structure Summary

```
digitalschool/
├── actions/           # Server actions (auth)
├── app/
│   ├── api/auth/     # NextAuth API routes
│   ├── explorer/     # Learning path pages
│   │   └── foundation/  # Subject-specific lesson pages
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # Reusable UI components
├── lib/             # Utilities (utils, prisma client)
├── prisma/          # Database schema
└── public/          # Static assets
```

---

## 🎯 Current Implementation Status

### ✅ Completed
- User authentication (login/register)
- Home page with navigation
- Explorer navigation system
- Foundation subject pages
- Urdu Grammar lessons (6 videos linked)
- Arabic Grammar lessons (7 videos linked)
- Responsive UI with TailwindCSS

### 🚧 Incomplete/Placeholder
- Mathematics lesson videos (structure ready)
- English Grammar lesson videos (structure ready)
- Test Yourself functionality
- Result & Certificate feature
- Cambridge curriculum section
- Madrasah Nisab section
- Combined/Balanced learning path
- Password reset functionality

---

## 🔑 Key Features

1. **Bilingual Support:** Urdu and English throughout
2. **Video-Based Learning:** YouTube integration for lessons
3. **Multi-Curriculum:** Foundation, PCTB, Cambridge, Madrasah
4. **Authentication:** Secure user accounts with NextAuth
5. **Modern UI:** Gradient designs, hover effects, responsive layout
6. **Structured Learning:** Organized by subject and lesson progression

---

## 📝 Notes

- **Security Concern:** Passwords stored in plain text (should be hashed)
- **External Links:** PCTB links to official government website
- **Content Status:** Urdu and Arabic have active video content; Math and English need content
- **Navigation:** Consistent back button pattern across lesson pages
