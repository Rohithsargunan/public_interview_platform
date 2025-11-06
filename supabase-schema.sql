-- Supabase Database Schema for InterviewAI
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  password_hash VARCHAR(255),
  profile_image_url TEXT,
  resume_url TEXT,
  phone VARCHAR(20),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_status VARCHAR(50) DEFAULT 'active',
  subscription_end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- Interviews table
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_role VARCHAR(255),
  experience_level VARCHAR(50),
  industry VARCHAR(100),
  job_description TEXT,
  resume_used_url TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  total_questions INT DEFAULT 0,
  completed_questions INT DEFAULT 0,
  overall_score DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  evaluated_at TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interview_id UUID REFERENCES interviews(id) ON DELETE CASCADE,
  question_number INT,
  question_text TEXT,
  question_type VARCHAR(50),
  expected_duration_seconds INT,
  difficulty_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Responses table
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  video_url TEXT,
  transcript TEXT,
  duration_seconds INT,
  attempt_number INT DEFAULT 1,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Evaluations table
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_id UUID REFERENCES responses(id) ON DELETE CASCADE,
  communication_score DECIMAL(5,2),
  content_score DECIMAL(5,2),
  behavioral_score DECIMAL(5,2),
  nonverbal_score DECIMAL(5,2),
  overall_score DECIMAL(5,2),
  strengths JSONB,
  improvements JSONB,
  detailed_feedback JSONB,
  processing_time_seconds INT,
  evaluated_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interview_id UUID REFERENCES interviews(id) ON DELETE CASCADE,
  pdf_url TEXT,
  report_data JSONB,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Learning plans table
CREATE TABLE learning_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  focus_areas JSONB,
  resources JSONB,
  milestones JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  plan_type VARCHAR(50),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_interviews_user_id ON interviews(user_id);
CREATE INDEX idx_interviews_status ON interviews(status);
CREATE INDEX idx_questions_interview_id ON questions(interview_id);
CREATE INDEX idx_responses_question_id ON responses(question_id);
CREATE INDEX idx_evaluations_response_id ON evaluations(response_id);
CREATE INDEX idx_reports_interview_id ON reports(interview_id);
CREATE INDEX idx_learning_plans_user_id ON learning_plans(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Interviews policies
CREATE POLICY "Users can view own interviews" ON interviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own interviews" ON interviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interviews" ON interviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own interviews" ON interviews
  FOR DELETE USING (auth.uid() = user_id);

-- Questions policies
CREATE POLICY "Users can view questions for own interviews" ON questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM interviews 
      WHERE interviews.id = questions.interview_id 
      AND interviews.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create questions for own interviews" ON questions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM interviews 
      WHERE interviews.id = questions.interview_id 
      AND interviews.user_id = auth.uid()
    )
  );

-- Responses policies
CREATE POLICY "Users can view responses for own interviews" ON responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM questions 
      JOIN interviews ON interviews.id = questions.interview_id
      WHERE questions.id = responses.question_id 
      AND interviews.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create responses for own interviews" ON responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM questions 
      JOIN interviews ON interviews.id = questions.interview_id
      WHERE questions.id = responses.question_id 
      AND interviews.user_id = auth.uid()
    )
  );

-- Evaluations policies
CREATE POLICY "Users can view evaluations for own responses" ON evaluations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM responses 
      JOIN questions ON questions.id = responses.question_id
      JOIN interviews ON interviews.id = questions.interview_id
      WHERE responses.id = evaluations.response_id 
      AND interviews.user_id = auth.uid()
    )
  );

-- Reports policies
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM interviews 
      WHERE interviews.id = reports.interview_id 
      AND interviews.user_id = auth.uid()
    )
  );

-- Learning plans policies
CREATE POLICY "Users can view own learning plans" ON learning_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own learning plans" ON learning_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning plans" ON learning_plans
  FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

