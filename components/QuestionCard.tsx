'use client'

import { Question } from '@/lib/quiz-logic'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | undefined
  onAnswer: (value: string) => void
  onBack: () => void
  showBack: boolean
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  onBack,
  showBack,
}: QuestionCardProps) {
  return (
    <div className="animate-fade-in-up w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Category label */}
        <div className="bg-[#002868]/5 px-6 py-3 border-b border-gray-100">
          <span className="text-xs font-semibold text-[#002868] uppercase tracking-widest">
            {question.category}
          </span>
        </div>

        {/* Question text */}
        <div className="px-6 pt-5 pb-4">
          <p className="text-gray-900 text-lg sm:text-xl font-semibold leading-snug">
            {question.text}
          </p>
        </div>

        {/* Answer options */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.value
            return (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={`
                  w-full min-h-[56px] px-5 py-3.5 rounded-xl border-2 text-base font-semibold
                  text-left transition-all duration-150
                  ${
                    isSelected
                      ? 'bg-[#002868] border-[#002868] text-white shadow-md'
                      : 'bg-white border-[#002868]/30 text-[#002868] hover:border-[#002868] hover:bg-[#002868]/5'
                  }
                `}
                aria-pressed={isSelected}
              >
                <span className="flex items-center gap-3">
                  {/* Selection indicator */}
                  <span
                    className={`
                      w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                      ${isSelected ? 'border-white bg-white' : 'border-[#002868]/40'}
                    `}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#002868]" />
                    )}
                  </span>
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Back button */}
        {showBack && (
          <div className="px-6 pb-5 border-t border-gray-100 pt-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
