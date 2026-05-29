'use client'

import { Recommendation } from '@/lib/quiz-logic'

const FDA_DISCLAIMER =
  'These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.'

const ADVICE_DISCLAIMER =
  'These recommendations are not a substitute for medical advice. Always ask your healthcare provider if you are unsure whether a supplement is right for you.'

interface ResultsCardProps {
  recommendations: Recommendation[]
  onStartOver: () => void
}

function PriorityBadge({ tag }: { tag: Recommendation['priority_tag'] }) {
  if (tag === 'Top Priority') {
    return (
      <span className="priority-top inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#bf0a30] uppercase tracking-wide">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Top Priority
      </span>
    )
  }
  if (tag === 'High Priority') {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#002868] uppercase tracking-wide">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        High Priority
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-gray-600 bg-gray-100 uppercase tracking-wide">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      Recommended
    </span>
  )
}

export default function ResultsCard({ recommendations, onStartOver }: ResultsCardProps) {
  if (recommendations.length === 0) {
    return (
      <div className="animate-fade-in-up w-full text-center py-10 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <p className="text-gray-500 text-lg">
            Based on your answers, no specific supplement recommendations were identified at this time.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Talk to your pharmacist for personalized guidance.
          </p>
          <button
            onClick={onStartOver}
            className="mt-6 px-6 py-3 bg-[#bf0a30] text-white font-semibold rounded-xl hover:bg-[#a00828] transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up w-full space-y-4">
      {/* Intro header */}
      <div className="text-center mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#002868]">
          Your Personalized Recommendations
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Based on your answers, here are your personalized recommendations.
        </p>
      </div>

      {/* Recommendation cards */}
      {recommendations.map((rec, index) => (
        <div
          key={`${rec.product.id}-${index}`}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* Top stripe for top priority */}
          {rec.priority_tag === 'Top Priority' && (
            <div className="h-1.5 w-full bg-[#bf0a30]" />
          )}
          {rec.priority_tag === 'High Priority' && (
            <div className="h-1.5 w-full bg-[#002868]" />
          )}
          {rec.priority_tag === 'Recommended' && (
            <div className="h-1.5 w-full bg-gray-200" />
          )}

          <div className="p-5">
            {/* Badge + product name */}
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <PriorityBadge tag={rec.priority_tag} />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-2 leading-tight">
              {rec.product.name}
            </h3>

            {/* Refrigeration note — Superior Probiotic only */}
            {rec.product.id === 'superior_probiotic' && (
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200">
                🧊 Keep refrigerated — to maintain live, active cultures
              </span>
            )}

            {/* Dosage */}
            <div className="flex items-start gap-1.5 mt-2">
              <svg
                className="w-4 h-4 text-[#002868] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-[#002868] font-medium">{rec.product.dose}</p>
            </div>

            {/* Reason */}
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{rec.reason}</p>

            {/* Learn More button */}
            <a
              href={rec.product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4 inline-flex items-center gap-2 px-5 py-2.5
                bg-[#bf0a30] hover:bg-[#a00828] text-white
                text-sm font-semibold rounded-xl transition-colors
              "
            >
              Learn More
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}

      {/* Disclaimers */}
      <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-5 space-y-3">
        <div className="flex gap-2">
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-gray-500 leading-relaxed">{FDA_DISCLAIMER}</p>
        </div>
        <div className="flex gap-2">
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-gray-500 leading-relaxed">{ADVICE_DISCLAIMER}</p>
        </div>
      </div>

      {/* Start Over */}
      <div className="text-center pt-2 pb-6">
        <button
          onClick={onStartOver}
          className="px-6 py-3 border-2 border-[#002868] text-[#002868] font-semibold rounded-xl hover:bg-[#002868] hover:text-white transition-all text-sm"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}
