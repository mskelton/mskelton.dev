export interface LoaderProps {
  className?: string
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={className} role="status">
      <svg
        className="h-10 w-10 animate-[show_100ms_ease-in_300ms_forwards,spin_2s_linear_infinite] opacity-0"
        viewBox="0 0 50 50"
      >
        <circle
          className="animate-[dash_1.5s_ease-in-out_infinite] stroke-indigo-600"
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
