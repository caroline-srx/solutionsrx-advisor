interface ProgressBarProps {
  current: number  // 1-based current question number
  total: number    // total visible questions
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full px-4 py-3 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Your Progress
          </span>
          <span className="text-xs font-semibold text-[#002868]">
            Question {current} of {total}
          </span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#bf0a30] rounded-full progress-fill"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Question ${current} of ${total}`}
          />
        </div>
      </div>
    </div>
  )
}
