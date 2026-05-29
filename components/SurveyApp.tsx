'use client'

import { useState, useCallback } from 'react'
import Header from './Header'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import ResultsCard from './ResultsCard'
import {
  QUESTIONS,
  getVisibleQuestions,
  computeRecommendations,
  Recommendation,
} from '@/lib/quiz-logic'

type Phase = 'intro' | 'survey' | 'results'

export default function SurveyApp() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0) // 0-based index into visible questions
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  // Derive visible questions based on current answers
  const visibleQuestionIds = getVisibleQuestions(answers)
  const visibleQuestions = visibleQuestionIds.map(
    (id) => QUESTIONS.find((q) => q.id === id)!
  )

  const handleStart = () => {
    setPhase('survey')
    setCurrentStep(0)
    setAnswers({})
  }

  const handleAnswer = useCallback(
    (value: string) => {
      const currentQuestion = visibleQuestions[currentStep]
      if (!currentQuestion) return

      const newAnswers = { ...answers, [currentQuestion.id]: value }

      // If q3 was visible but now conditions change (shouldn't happen mid-answer, but clean up)
      // Recalculate visible questions after this answer
      const newVisibleIds = getVisibleQuestions(newAnswers)
      const isLastQuestion = currentStep === newVisibleIds.length - 1

      setAnswers(newAnswers)

      if (isLastQuestion) {
        // Compute recommendations and submit
        const recs = computeRecommendations(newAnswers)
        setRecommendations(recs)
        setPhase('results')

        // Fire-and-forget API submission — do NOT block results display
        submitToAPI(newAnswers, recs)
      } else {
        setCurrentStep((s) => s + 1)
      }
    },
    [answers, currentStep, visibleQuestions]
  )

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      // Go back to intro
      setPhase('intro')
    } else {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep])

  const handleStartOver = () => {
    setAnswers({})
    setCurrentStep(0)
    setRecommendations([])
    setPhase('intro')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6">
        {phase === 'intro' && (
          <IntroScreen onStart={handleStart} />
        )}

        {phase === 'survey' && visibleQuestions.length > 0 && (
          <>
            <ProgressBar
              current={currentStep + 1}
              total={visibleQuestions.length}
            />
            <div className="mt-6">
              <QuestionCard
                key={visibleQuestions[currentStep].id}
                question={visibleQuestions[currentStep]}
                selectedAnswer={answers[visibleQuestions[currentStep].id]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                showBack={true}
              />
            </div>
          </>
        )}

        {phase === 'results' && (
          <ResultsCard
            recommendations={recommendations}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-4 px-4 border-t border-gray-100">
        &copy; {new Date().getFullYear()} SolutionsRx&#174;. All rights reserved.
      </footer>
    </div>
  )
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[60vh] py-8 px-2 text-center">
      {/* Icon / logo area */}
      <div className="w-20 h-20 rounded-full bg-[#002868] flex items-center justify-center mb-6 shadow-lg">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002868] leading-tight mb-4">
        Supplement Advisor™
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-base sm:text-lg max-w-md leading-relaxed mb-8">
        Answer a few quick questions and receive personalized supplement recommendations.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['Takes under 2 minutes', 'Personalized results', 'Easy to understand'].map(
          (feat) => (
            <span
              key={feat}
              className="inline-flex items-center gap-1.5 bg-[#002868]/8 text-[#002868] text-xs font-medium px-3 py-1.5 rounded-full"
            >
              <svg
                className="w-3.5 h-3.5 text-[#bf0a30]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feat}
            </span>
          )
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="
          px-8 py-4 bg-[#bf0a30] hover:bg-[#a00828] text-white
          text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl
          transition-all duration-200 active:scale-95
        "
      >
        Get Started
        <svg
          className="inline-block ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <p className="text-xs text-gray-400 mt-4 max-w-xs">
        Your answers are private and used only to generate your recommendations.
      </p>
    </div>
  )
}

// ─── Fire-and-forget API submission ──────────────────────────────────────────

async function submitToAPI(
  answers: Record<string, string>,
  recommendations: Recommendation[]
) {
  try {
    const payload = {
      answers,
      recommendations: recommendations.map((r) => ({
        product_id: r.product.id,
        product_name: r.product.name,
        reason: r.reason,
        priority_tag: r.priority_tag,
      })),
    }

    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    // Silently swallow — submission failure must never break results display
    console.warn('Survey submission failed (non-blocking):', err)
  }
}
