export interface LoaderProps {
  className?: string
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={className} role="status">
      <svg
        className="h-10 w-10 animate-[spin_2s_linear_infinite]"
        viewBox="0 0 50 50"
      >
        <circle
          className="stroke-indigo-600 animate-[dash_1.5s_ease-in-out_infinite]"
          cx="25"
          cy="25"
          fill="none"
          r="20"
          strokeLinecap="round"
          strokeWidth="5"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  )
}
