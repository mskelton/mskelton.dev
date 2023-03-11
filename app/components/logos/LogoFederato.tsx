export function LogoFederato(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="128" cy="128" r="128" fill="#E6EFF7" />
      <path
        d="M128 205C158.928 205 184 178.585 184 146C184 113.415 158.928 87 128 87C97.0721 87 72 113.415 72 146C72 178.585 97.0721 205 128 205ZM128 190C105.356 190 87 170.301 87 146C87 121.699 105.356 102 128 102C150.644 102 169 121.699 169 146C169 170.301 150.644 190 128 190Z"
        fill="#363A42"
      />
      <path d="M88 50H168V66H88V50Z" fill="#23DEA3" />
    </svg>
  )
}
