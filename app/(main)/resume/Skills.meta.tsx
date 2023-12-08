interface Skill {
  disabled?: boolean
  icon: JSX.Element
  name: string
  url: string
}

export const skills: Skill[] = [
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path d="M22.67 47h99.67v73.67H22.67z" fill="#fff" />
        <path
          d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
          data-name="original"
          fill="#007acc"
        />
      </svg>
    ),
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <g fill="#61DAFB">
          <circle cx="64" cy="64" r="11.4" />
          <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
        </g>
      </svg>
    ),
    name: "React",
    url: "https://react.dev/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"
          fill="#E44D26"
        />
        <path d="M64 116.8l36.378-10.086 8.559-95.878H64z" fill="#F16529" />
        <path
          d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"
          fill="#EBEBEB"
        />
        <path
          d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"
          fill="#fff"
        />
      </svg>
    ),
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"
          fill="#1572B6"
        />
        <path
          d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"
          fill="#33A9DC"
        />
        <path
          d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"
          fill="#fff"
        />
        <path
          d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"
          fill="#EBEBEB"
        />
        <path
          d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"
          fill="#fff"
        />
        <path
          d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"
          fill="#EBEBEB"
        />
      </svg>
    ),
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
          fill="#83CD29"
        />
      </svg>
    ),
    name: "Node.js",
    url: "https://nodejs.org/en/",
  },
  {
    icon: (
      <svg viewBox="0 0 126 48">
        <path
          clipRule="evenodd"
          d="M10.156 14.829C9.913 14.829 9.853 14.707 9.974 14.526L11.247 12.889C11.367 12.707 11.671 12.586 11.913 12.586H33.55C33.793 12.586 33.853 12.768 33.732 12.95L32.702 14.526C32.581 14.707 32.278 14.889 32.096 14.889L10.156 14.829ZM1.004 20.404C0.761998 20.404 0.700998 20.284 0.821998 20.101L2.095 18.465C2.216 18.283 2.519 18.162 2.762 18.162H30.398C30.64 18.162 30.762 18.344 30.701 18.526L30.216 19.98C30.156 20.223 29.913 20.344 29.671 20.344L1.004 20.404ZM15.67 25.98C15.428 25.98 15.368 25.798 15.489 25.616L16.337 24.101C16.459 23.919 16.701 23.738 16.944 23.738H29.064C29.307 23.738 29.428 23.919 29.428 24.162L29.308 25.616C29.308 25.859 29.065 26.041 28.883 26.041L15.67 25.98ZM78.58 13.738C74.761 14.708 72.155 15.435 68.398 16.404C67.488 16.647 67.428 16.707 66.64 15.798C65.731 14.768 65.064 14.101 63.792 13.495C59.973 11.617 56.276 12.162 52.822 14.405C48.701 17.071 46.58 21.01 46.64 25.919C46.7 30.768 50.034 34.768 54.822 35.435C58.943 35.98 62.398 34.525 65.125 31.435C65.67 30.768 66.155 30.041 66.761 29.192H55.064C53.792 29.192 53.489 28.404 53.913 27.374C54.701 25.495 56.155 22.344 57.003 20.768C57.186 20.404 57.61 19.798 58.519 19.798H80.579C80.459 21.435 80.459 23.071 80.216 24.708C79.549 29.071 77.913 33.071 75.246 36.586C70.882 42.344 65.186 45.919 57.973 46.889C52.034 47.677 46.519 46.525 41.671 42.889C37.186 39.495 34.641 35.01 33.974 29.435C33.186 22.829 35.125 16.889 39.125 11.677C43.428 6.041 49.125 2.465 56.095 1.192C61.792 0.162 67.246 0.828997 72.155 4.162C75.367 6.283 77.67 9.192 79.185 12.707C79.549 13.253 79.307 13.556 78.579 13.737L78.58 13.738Z"
          fill="#00ACD7"
          fillRule="evenodd"
        />
        <path
          d="M98.64 47.253C93.125 47.131 88.094 45.556 83.852 41.919C80.276 38.829 78.034 34.889 77.307 30.222C76.216 23.374 78.094 17.313 82.216 11.92C86.64 6.101 91.973 3.071 99.186 1.798C105.367 0.707999 111.186 1.314 116.458 4.889C121.246 8.162 124.215 12.586 125.003 18.404C126.033 26.586 123.67 33.253 118.033 38.95C114.033 43.01 109.124 45.556 103.488 46.707C101.852 47.01 100.215 47.071 98.64 47.253ZM113.064 22.768C113.004 21.98 113.004 21.374 112.882 20.768C111.792 14.768 106.276 11.374 100.519 12.708C94.882 13.98 91.246 17.556 89.913 23.253C88.822 27.98 91.125 32.768 95.488 34.707C98.822 36.162 102.155 35.98 105.367 34.344C110.155 31.859 112.761 27.98 113.064 22.768Z"
          fill="#00ACD7"
        />
      </svg>
    ),
    name: "Go",
    url: "https://golang.org/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <g fill="#E434AA">
          <path d="M18.39 96.852l-4.6-2.657L65.04 5.434l4.597 2.656zm0 0" />
          <path d="M12.734 87.105H115.23v5.31H12.734zm0 0" />
          <path d="M66.031 119.688L14.766 90.09l2.656-4.602 51.266 29.602zm0 0M110.566 42.543L59.301 12.941l2.656-4.597 51.266 29.597zm0 0" />
          <path d="M17.434 42.523l-2.657-4.601 51.27-29.598 2.656 4.598zm0 0" />
          <path d="M109.621 96.852L58.375 8.09l4.598-2.656 51.25 88.761zm0 0M16.8 34.398h5.313v59.204h-5.312zm0 0" />
          <path d="M105.887 34.398h5.312v59.204h-5.312zm0 0" />
          <path d="M65.129 117.441l-2.32-4.02 44.586-25.745 2.32 4.02zm0 0" />
          <path d="M118.238 95.328c-3.07 5.344-9.918 7.168-15.261 4.098-5.344-3.074-7.168-9.922-4.098-15.266 3.074-5.344 9.922-7.168 15.266-4.097 5.375 3.105 7.199 9.921 4.093 15.265M29.09 43.84c-3.074 5.344-9.922 7.168-15.266 4.097-5.344-3.074-7.168-9.921-4.097-15.265 3.074-5.344 9.921-7.168 15.265-4.098 5.344 3.106 7.168 9.922 4.098 15.266M9.762 95.328c-3.075-5.344-1.25-12.16 4.093-15.266 5.344-3.07 12.16-1.246 15.266 4.098 3.07 5.344 1.246 12.16-4.098 15.266-5.375 3.07-12.191 1.246-15.261-4.098M98.91 43.84c-3.07-5.344-1.246-12.16 4.098-15.266 5.344-3.07 12.16-1.246 15.265 4.098 3.07 5.344 1.247 12.16-4.097 15.266-5.344 3.07-12.192 1.246-15.266-4.098M64 126.656a11.158 11.158 0 01-11.168-11.168A11.158 11.158 0 0164 104.32a11.158 11.158 0 0111.168 11.168c0 6.145-4.992 11.168-11.168 11.168M64 23.68a11.158 11.158 0 01-11.168-11.168A11.158 11.158 0 0164 1.344a11.158 11.158 0 0111.168 11.168A11.158 11.158 0 0164 23.68" />
        </g>
      </svg>
    ),
    name: "GraphQL",
    url: "https://graphql.org/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          className="dark:fill-white"
          d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
        />
      </svg>
    ),
    name: "Next.js",
    url: "https://nextjs.org/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
          fill="#38b2ac"
        />
      </svg>
    ),
    name: "Tailwind",
    url: "https://tailwindcss.com/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M107.346 2.012L100.432 2.443L100.971 16.82C100.999 17.615 100.082 18.079 99.457 17.586L94.827 13.936L89.342 18.098C89.2008 18.2053 89.0319 18.2701 88.8552 18.2849C88.6785 18.2997 88.5012 18.2639 88.344 18.1817C88.1869 18.0995 88.0565 17.9742 87.9679 17.8205C87.8794 17.6669 87.8364 17.4912 87.844 17.314L88.461 3.191L19.873 7.48C18.2415 7.58166 16.7143 8.3171 15.6175 9.52931C14.5208 10.7415 13.9414 12.3344 14.003 13.968L17.863 116.806C17.9219 118.377 18.5696 119.869 19.6774 120.985C20.7853 122.1 22.2722 122.759 23.843 122.829L107.455 126.583C108.3 126.62 109.144 126.486 109.936 126.189C110.728 125.892 111.452 125.437 112.064 124.853C112.676 124.269 113.163 123.566 113.496 122.788C113.829 122.011 114 121.173 114 120.327V8.264C114 7.40833 113.825 6.56166 113.486 5.77631C113.146 4.99096 112.649 4.28362 112.025 3.698C111.402 3.11205 110.665 2.66012 109.86 2.37013C109.055 2.08014 108.2 1.95826 107.346 2.012ZM65.886 23.199C82.194 23.199 91.1 31.922 91.1 48.518C88.896 50.231 72.48 51.398 72.48 48.961C72.826 39.661 68.663 39.254 66.35 39.254C64.152 39.254 60.451 39.916 60.451 44.898C60.451 57.186 92.141 56.523 92.141 81.322C92.141 95.272 80.806 102.977 66.35 102.977C51.43 102.977 38.393 96.941 39.865 76.014C40.443 73.557 59.41 74.141 59.41 76.014C59.18 84.649 61.145 87.189 66.117 87.189C69.934 87.189 71.67 85.086 71.67 81.543C71.67 68.922 40.443 68.48 40.443 45.342C40.443 32.057 49.58 23.199 65.886 23.199Z"
          fill="#FF4785"
        />
        <path
          clipRule="evenodd"
          d="M100.432 2.4442L107.346 2.012L100.432 2.443L100.432 2.4442ZM88.4609 3.19252L100.432 2.4442L100.971 16.82C100.999 17.615 100.082 18.079 99.457 17.586L94.827 13.936L89.342 18.098C89.2008 18.2053 89.0319 18.2701 88.8552 18.2849C88.6785 18.2997 88.5012 18.2639 88.344 18.1817C88.1869 18.0995 88.0564 17.9742 87.9679 17.8205C87.8793 17.6669 87.8364 17.4912 87.844 17.314L88.4609 3.19252ZM19.873 7.48L88.4609 3.19252L88.461 3.191L19.873 7.48ZM91.1 48.518C91.1 31.922 82.194 23.199 65.886 23.199C49.58 23.199 40.443 32.057 40.443 45.342C40.443 58.6507 50.7742 64.4507 59.5519 69.3784C66.0347 73.0178 71.67 76.1815 71.67 81.543C71.67 85.086 69.934 87.189 66.117 87.189C61.145 87.189 59.18 84.649 59.41 76.014C59.41 74.141 40.443 73.557 39.865 76.014C38.393 96.941 51.43 102.977 66.35 102.977C80.806 102.977 92.141 95.272 92.141 81.322C92.141 66.7679 81.226 60.9837 72.2076 56.2046C65.8594 52.8405 60.451 49.9744 60.451 44.898C60.451 39.916 64.152 39.254 66.35 39.254C68.663 39.254 72.826 39.661 72.48 48.961C72.48 51.398 88.896 50.231 91.1 48.518Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    ),

    name: "Storybook",
    url: "https://storybook.js.org/",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 399 440">
        <path
          d="M334.919 218.102c-.54.328-18.349-2.66-40.665-4.171-18.225-1.235-39.456-1.188-56.744-.017-14.019.949-32.438-6.098-34.639 2.277-8.238 31.351-25.963 58.655-48.511 79.928-16.963 16.003-36.377 28.138-57.375 35.615-24.999-12.842-36.805-41.404-26.152-66.447 8.449-19.863 18.28-41.74.13-46.745-13.213-3.644-20.468 9.013-25.547 22.545-9.73 25.923-28.219 52.748-33.488 84.521-5.562 33.542-.018 69.147 28.992 89.253 67.562 46.826 140.9-29.028 218.225-48.096 28.024-6.911 58.785-5.797 83.475-20.097 18.541-10.739 30.764-28.535 34.233-48.516 5.58-32.137-11.139-64.066-41.934-80.05Z"
          fill="#C21325"
          stroke="#fff"
          strokeWidth="20"
        />
        <path
          d="M202.871 216.191c-8.238 31.351-25.963 58.655-48.511 79.928-16.963 16.003-36.377 28.138-57.376 35.615-24.999-12.842-36.805-41.404-26.152-66.447 8.449-19.863 18.28-41.74.13-46.745-13.213-3.644-20.468 9.013-25.547 22.545-9.73 25.923-28.219 52.748-33.488 84.521-5.562 33.542-.018 69.147 28.992 89.253 67.562 46.826 140.9-29.028 218.226-48.096 28.024-6.911 58.785-5.797 83.475-20.097 18.541-10.739 30.764-28.535 34.233-48.515 5.58-32.137-11.139-64.066-41.934-80.05"
          stroke="#fff"
          strokeWidth="20"
        />
        <path
          d="m264.892 91.17 54.321 110.812L384.306 10H145.317l64.943 191.641L264.892 91.17Z"
          fill="#C21325"
        />
        <path
          d="m264.892 91.17 54.321 110.812L384.305 10H145.317l64.943 191.641L264.892 91.17Z"
          stroke="#fff"
          strokeWidth="20"
        />
        <path
          d="M198.988 257.528c22.613 0 40.945-18.332 40.945-40.945s-18.332-40.945-40.945-40.945-40.945 18.332-40.945 40.945 18.332 40.945 40.945 40.945Z"
          fill="#C21325"
        />
        <path
          d="M198.988 257.528c22.613 0 40.945-18.332 40.945-40.945s-18.332-40.945-40.945-40.945-40.945 18.332-40.945 40.945 18.332 40.945 40.945 40.945Z"
          stroke="#fff"
          strokeWidth="20"
        />
        <path
          d="M332.372 257.528c22.613 0 40.945-18.332 40.945-40.945s-18.332-40.945-40.945-40.945-40.945 18.332-40.945 40.945 18.332 40.945 40.945 40.945Z"
          fill="#C21325"
          stroke="#fff"
          strokeWidth="20"
        />
        <path
          d="M332.372 257.528c22.613 0 40.945-18.332 40.945-40.945s-18.332-40.945-40.945-40.945-40.945 18.332-40.945 40.945 18.332 40.945 40.945 40.945Z"
          stroke="#fff"
          strokeWidth="20"
        />
        <path
          d="M65.099 257.822c22.613 0 40.945-18.332 40.945-40.945s-18.332-40.945-40.945-40.945-40.945 18.332-40.945 40.945 18.332 40.945 40.945 40.945Z"
          fill="#C21325"
        />
        <path
          d="M65.099 257.822c22.613 0 40.945-18.332 40.945-40.945s-18.332-40.945-40.945-40.945-40.945 18.332-40.945 40.945 18.332 40.945 40.945 40.945Z"
          stroke="#fff"
          strokeWidth="20"
        />
      </svg>
    ),
    name: "Jest",
    url: "https://jestjs.io/",
  },
  {
    icon: (
      <svg viewBox="0 0 165 165">
        <path
          d="M120.831 57.2543L84.693 109.505C84.3099 110.059 83.7558 110.474 83.1148 110.687C82.4738 110.9 81.7809 110.898 81.1412 110.684C80.5015 110.469 79.95 110.052 79.5702 109.497C79.1905 108.941 79.0032 108.277 79.037 107.606L80.4833 78.7582L57.1343 73.8064C56.6353 73.7007 56.1704 73.474 55.7807 73.1465C55.391 72.8191 55.0885 72.4009 54.9001 71.929C54.7117 71.4571 54.6432 70.9461 54.7006 70.4412C54.758 69.9364 54.9395 69.4532 55.2291 69.0345L91.3675 16.7837C91.7507 16.2294 92.3048 15.8145 92.9458 15.6018C93.5869 15.3891 94.2798 15.3902 94.9196 15.6051C95.5593 15.8199 96.1109 16.2367 96.4906 16.7923C96.8703 17.3478 97.0575 18.0117 97.0236 18.6833L95.5773 47.5314L118.926 52.4828C119.425 52.5885 119.89 52.8152 120.28 53.1426C120.67 53.4701 120.972 53.8883 121.16 54.3602C121.349 54.8321 121.417 55.3431 121.36 55.8479C121.303 56.3528 121.121 56.836 120.831 57.2547L120.831 57.2543Z"
          fill="#FCC72B"
        />
        <path
          d="M82.9866 153.343C82.0254 153.344 81.0735 153.156 80.1855 152.788C79.2975 152.42 78.4909 151.88 77.8122 151.2L43.6658 117.056C42.2998 115.683 41.5341 113.824 41.5366 111.887C41.5392 109.95 42.3098 108.092 43.6796 106.723C45.0493 105.353 46.9064 104.582 48.8435 104.579C50.7807 104.577 52.6399 105.342 54.0134 106.708L82.9866 135.678L146.105 72.5626C147.481 71.2088 149.336 70.4536 151.266 70.4615C153.197 70.4693 155.046 71.2396 156.41 72.6045C157.775 73.9695 158.546 75.8184 158.554 77.7487C158.561 79.679 157.806 81.5342 156.452 82.9101L88.1597 151.2C87.4811 151.881 86.6747 152.42 85.7869 152.788C84.8992 153.156 83.9475 153.344 82.9866 153.343Z"
          fill="#729B1B"
        />
        <path
          d="M82.9572 153.343C83.9184 153.344 84.8703 153.156 85.7583 152.788C86.6463 152.42 87.4528 151.88 88.1316 151.2L122.278 117.056C123.644 115.683 124.41 113.824 124.407 111.887C124.405 109.95 123.634 108.092 122.264 106.723C120.894 105.353 119.037 104.582 117.1 104.579C115.163 104.577 113.304 105.342 111.93 106.708L82.9572 135.678L19.8389 72.5626C18.4629 71.2088 16.6077 70.4536 14.6775 70.4615C12.7472 70.4693 10.8982 71.2396 9.53331 72.6045C8.16839 73.9695 7.39811 75.8184 7.39025 77.7487C7.38239 79.679 8.13759 81.5342 9.49135 82.9101L77.784 151.2C78.4627 151.881 79.2691 152.42 80.1568 152.788C81.0446 153.156 81.9963 153.344 82.9572 153.343Z"
          fill="#729B1B"
          fillOpacity="0.5"
        />
      </svg>
    ),
    name: "Vitest",
    url: "https://vitest.dev/",
  },
  {
    icon: (
      <svg viewBox="0 0 346 260">
        <path
          d="M114.444 146.556C101.558 150.213 93.104 156.625 87.535 163.032C92.869 158.364 100.014 154.08 109.652 151.348C119.51 148.554 127.92 148.574 134.869 149.915V144.481C128.941 143.939 122.145 144.371 114.444 146.556ZM86.946 100.876L39.09 113.484C39.09 113.484 39.962 114.716 41.577 116.36L82.153 105.668C82.153 105.668 81.578 113.077 76.585 119.705C86.03 112.559 86.946 100.876 86.946 100.876ZM127.005 213.347C59.658 231.486 24.027 153.438 13.24 112.928C8.256 94.229 6.08 80.067 5.5 70.928C5.44489 70.1011 5.45626 69.2711 5.534 68.446C2.04 68.657 0.367001 70.473 0.708001 75.721C1.288 84.855 3.463 99.016 8.448 117.721C19.23 158.225 54.866 236.273 122.213 218.134C136.872 214.185 147.885 206.992 156.152 197.81C148.532 204.692 138.995 210.112 127.005 213.347ZM139.661 53.11V57.903H166.077C165.535 56.206 164.989 54.677 164.447 53.11H139.661Z"
          fill="#2D4552"
        />
        <path
          d="M171.981 92.584C183.861 95.958 190.144 104.287 193.465 111.658L206.711 115.42C206.711 115.42 204.904 89.623 181.57 82.995C159.741 76.793 146.308 95.124 144.674 97.496C151.024 92.972 160.297 89.268 171.981 92.584ZM277.422 111.777C255.573 105.547 242.145 123.916 240.535 126.255C246.89 121.736 256.158 118.031 267.837 121.362C279.698 124.741 285.976 133.06 289.307 140.436L302.572 144.212C302.572 144.212 300.736 118.41 277.422 111.777ZM264.262 179.795L154.072 148.99C154.072 148.99 155.265 155.038 159.842 162.869L252.617 188.805C260.255 184.386 264.262 179.795 264.262 179.795ZM187.867 246.102C100.618 222.71 111.166 111.543 125.284 58.865C131.097 37.156 137.073 21.02 142.029 10.204C139.072 9.595 136.623 11.153 134.203 16.074C128.941 26.747 122.212 44.124 115.7 68.45C101.586 121.127 91.038 232.29 178.283 255.682C219.406 266.699 251.442 249.955 275.323 223.659C252.655 244.19 223.714 255.701 187.867 246.102Z"
          fill="#2D4552"
        />
        <path
          d="M139.661 187.296V164.863L77.332 182.537C77.332 182.537 81.938 155.777 114.444 146.556C124.302 143.762 132.713 143.781 139.661 145.123V53.11H170.869C167.471 42.61 164.184 34.526 161.423 28.909C156.856 19.612 152.174 25.775 141.545 34.665C134.059 40.919 115.139 54.261 86.668 61.933C58.197 69.61 35.179 67.574 25.575 65.911C11.96 63.562 4.83901 60.572 5.50501 70.928C6.08501 80.062 8.26101 94.224 13.245 112.928C24.027 153.433 59.663 231.481 127.01 213.342C144.602 208.602 157.019 199.233 165.626 187.291H139.661V187.296ZM39.085 113.484L86.946 100.876C86.946 100.876 85.551 119.288 67.609 124.018C49.661 128.743 39.085 113.484 39.085 113.484Z"
          fill="#E2574C"
        />
        <path
          d="M319.786 54.174C307.345 56.355 277.498 59.072 240.612 49.185C203.716 39.304 179.236 22.022 169.537 13.899C155.788 2.383 149.74 -5.62 143.788 6.486C138.526 17.163 131.797 34.54 125.284 58.866C111.171 111.543 100.623 222.706 187.867 246.098C275.093 269.47 321.53 167.92 335.644 115.238C342.157 90.917 345.013 72.5 345.799 60.625C346.695 47.173 337.455 51.078 319.786 54.174ZM144.497 97.756C144.497 97.756 158.246 76.372 181.565 83C204.899 89.628 206.706 115.425 206.706 115.425L144.497 97.756ZM201.42 193.713C160.403 181.698 154.077 148.99 154.077 148.99L264.262 179.796C264.262 179.791 242.021 205.578 201.42 193.713ZM240.377 126.495C240.377 126.495 254.107 105.126 277.422 111.773C300.736 118.411 302.572 144.208 302.572 144.208L240.377 126.495Z"
          fill="#2EAD33"
        />
        <path
          d="M117.88 171.04L77.332 182.532C77.332 182.532 81.737 157.44 111.607 147.496L88.647 61.33L86.663 61.933C58.192 69.611 35.174 67.574 25.57 65.911C11.955 63.563 4.83401 60.572 5.50001 70.929C6.08001 80.063 8.25601 94.224 13.24 112.929C24.022 153.433 59.658 231.481 127.005 213.342L128.989 212.719L117.88 171.04ZM39.085 113.485L86.946 100.876C86.946 100.876 85.551 119.288 67.609 124.018C49.662 128.743 39.085 113.485 39.085 113.485Z"
          fill="#D65348"
        />
        <path
          d="M203.27 194.163L201.415 193.712C160.398 181.698 154.072 148.99 154.072 148.99L210.89 164.872L240.971 49.281L240.607 49.185C203.711 39.304 179.232 22.022 169.532 13.899C155.783 2.383 149.735 -5.62 143.783 6.486C138.526 17.163 131.797 34.54 125.284 58.866C111.171 111.543 100.623 222.706 187.867 246.097L189.655 246.5L203.27 194.163ZM144.497 97.756C144.497 97.756 158.246 76.372 181.565 83C204.899 89.628 206.706 115.425 206.706 115.425L144.497 97.756Z"
          fill="#1D8D22"
        />
        <path
          d="M119.946 170.451L109.072 173.537C111.641 188.019 116.169 201.917 123.276 214.195C124.513 213.922 125.74 213.687 127 213.342C130.302 212.451 133.364 211.348 136.312 210.145C128.371 198.361 123.118 184.789 119.946 170.451ZM115.7 68.451C110.112 89.307 105.113 119.326 106.489 149.436C108.952 148.367 111.554 147.371 114.444 146.551L116.457 146.101C114.003 113.939 119.308 81.165 125.284 58.866C126.701 53.5776 128.217 48.3163 129.832 43.085C127.2 44.7677 124.513 46.3626 121.776 47.867C119.573 54.6746 117.547 61.5382 115.7 68.451Z"
          fill="#C04B41"
        />
      </svg>
    ),
    name: "Playwright",
    url: "https://playwright.dev/",
  },
  {
    icon: (
      <svg viewBox="0 0 124 52">
        <path
          d="M0 0.5H124V44.21H62V51.5H34.44V44.21H0V0.5ZM6.89 36.93H20.67V15.07H27.56V36.93H34.45V7.79H6.89V36.93ZM41.33 7.79V44.21H55.11V36.93H68.89V7.79H41.33ZM55.11 15.08H62V29.64H55.11V15.08ZM75.78 7.79V36.93H89.56V15.07H96.45V36.93H103.34V15.07H110.23V36.93H117.12V7.79H75.78Z"
          fill="#CB3837"
        />
      </svg>
    ),
    name: "npm",
    url: "https://www.npmjs.com/",
  },
  {
    icon: (
      <svg viewBox="0 0 518 518">
        <path
          d="M259 48c116.498 0 211 94.502 211 211s-94.502 211-211 211S48 375.498 48 259 142.502 48 259 48Z"
          fill="#fff"
        />
        <path
          d="M259 0c143 0 259 116 259 259S402 518 259 518 0 402 0 259 116 0 259 0Zm176.2 337.5c-1.8-14.2-13.8-24-29.2-23.8-23 .3-42.3 12.2-55.1 20.1-5 3.1-9.3 5.4-13 7.1.8-11.6.1-26.8-5.9-43.5-7.3-20-17.1-32.3-24.1-39.4 8.1-11.8 19.2-29 24.4-55.6 4.5-22.7 3.1-58-7.2-77.8-2.1-4-5.6-6.9-10-8.1-1.8-.5-5.2-1.5-11.9.4C293.1 96 289.6 93.8 286.9 92c-5.6-3.6-12.2-4.4-18.4-2.1-8.3 3-15.4 11-22.1 25.2-1 2.1-1.9 4.1-2.7 6.1-12.7.9-32.7 5.5-49.6 23.8-2.1 2.3-6.2 4-10.5 5.6h.1c-8.8 3.1-12.8 10.3-17.7 23.3-6.8 18.2.2 36.1 7.1 47.7-9.4 8.4-21.9 21.8-28.5 37.5-8.2 19.4-9.1 38.4-8.8 48.7-7 7.4-17.8 21.3-19 36.9-1.6 21.8 6.3 36.6 9.8 42 1 1.6 2.1 2.9 3.3 4.2-.4 2.7-.5 5.6.1 8.6 1.3 7 5.7 12.7 12.4 16.3 13.2 7 31.6 10 45.8 2.9 5.1 5.4 14.4 10.6 31.3 10.6h1c4.3 0 58.9-2.9 74.8-6.8 7.1-1.7 12-4.7 15.2-7.4 10.2-3.2 38.4-12.8 65-30 18.8-12.2 25.3-14.8 39.3-18.2 13.6-3.3 22.1-15.7 20.4-29.4Zm-23.8 14.7c-16 3.8-24.1 7.3-43.9 20.2-30.9 20-64.7 29.3-64.7 29.3s-2.8 4.2-10.9 6.1c-14 3.4-66.7 6.3-71.5 6.4-12.9.1-20.8-3.3-23-8.6-6.7-16 9.6-23 9.6-23s-3.6-2.2-5.7-4.2c-1.9-1.9-3.9-5.7-4.5-4.3-2.5 6.1-3.8 21-10.5 27.7-9.2 9.3-26.6 6.2-36.9.8-11.3-6 .8-20.1.8-20.1s-6.1 3.6-11-3.8c-4.4-6.8-8.5-18.4-7.4-32.7 1.2-16.3 19.4-32.1 19.4-32.1s-3.2-24.1 7.3-48.8c9.5-22.5 35.1-40.6 35.1-40.6s-21.5-23.8-13.5-45.2c5.2-14 7.3-13.9 9-14.5 6-2.3 11.8-4.8 16.1-9.5 21.5-23.2 48.9-18.8 48.9-18.8s13-39.5 25-31.8c3.7 2.4 17 32 17 32s14.2-8.3 15.8-5.2c8.6 16.7 9.6 48.6 5.8 68-6.4 32-22.4 49.2-28.8 60-1.5 2.5 17.2 10.4 29 43.1 10.9 29.9 1.2 55 2.9 57.8.3.5.4.7.4.7s12.5 1 37.6-14.5c13.4-8.3 29.3-17.6 47.4-17.8 17.5-.3 18.4 20.2 5.2 23.4Z"
          fill="#2F2A69"
        />
      </svg>
    ),
    name: "Yarn",
    url: "https://yarnpkg.com/",
  },
  {
    icon: (
      <svg viewBox="66.092 33.5 184.5 184.5">
        <path d="M237.6 95h-50V45h50v50Z" fill="#f9ad00" />
        <path d="M182.59 95h-50V45h50v50Z" fill="#f9ad00" />
        <path d="M127.59 95h-50V45h50v50Z" fill="#f9ad00" />
        <path d="M237.6 150h-50v-50h50v50Z" fill="#f9ad00" />
        <path d="M182.59 150h-50v-50h50v50Z" fill="#4e4e4e" />
        <path d="M182.59 205h-50v-50h50v50Z" fill="#4e4e4e" />
        <path d="M237.6 205h-50v-50h50v50Z" fill="#4e4e4e" />
        <path d="M127.59 205h-50v-50h50v50Z" fill="#4e4e4e" />
      </svg>
    ),
    name: "pnpm",
    url: "https://pnpm.io/",
  },
  {
    icon: (
      <svg viewBox="0 0 410 404">
        <path
          d="m399.641 59.525-183.998 329.02c-3.799 6.793-13.559 6.833-17.415.073L10.582 59.556C6.38 52.19 12.68 43.266 21.028 44.76l184.195 32.923c1.175.21 2.378.208 3.553-.006l180.343-32.87c8.32-1.517 14.649 7.337 10.522 14.719Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M292.965 1.574 156.801 28.255a5 5 0 0 0-4.03 4.611l-8.376 141.464c-.197 3.332 2.863 5.918 6.115 5.168l37.91-8.749c3.547-.818 6.752 2.306 6.023 5.873l-11.263 55.153c-.758 3.712 2.727 6.886 6.352 5.785l23.415-7.114c3.63-1.102 7.118 2.081 6.35 5.796l-17.899 86.633c-1.12 5.419 6.088 8.374 9.094 3.728l2.008-3.103 110.954-221.428c1.858-3.707-1.346-7.935-5.418-7.15l-39.022 7.532c-3.667.707-6.787-2.708-5.752-6.296l25.469-88.291c1.036-3.594-2.095-7.012-5.766-6.293Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear"
            x1="6"
            x2="235"
            y1="33"
            y2="344"
          >
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear"
            x1="194.651"
            x2="236.076"
            y1="8.818"
            y2="292.989"
          >
            <stop stopColor="#FFEA83" />
            <stop offset=".083" stopColor="#FFDD35" />
            <stop offset="1" stopColor="#FFA800" />
          </linearGradient>
        </defs>
      </svg>
    ),
    name: "Vite",
    url: "https://vitejs.dev/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M117.29 98.1L66.24 127v-22.51L98 87l19.29 11.1zm3.5-3.16V34.55l-18.68 10.8v38.81l18.67 10.77zM10.71 98.1l51 28.88v-22.49L29.94 87zm-3.5-3.16V34.55l18.68 10.8v38.81zm2.19-64.3L61.76 1v21.76L28.21 41.21l-.27.15zm109.18 0L66.24 1v21.76L99.79 41.2l.27.15 18.54-10.71z"
          fill="#8ed6fb"
        />
        <path
          d="M61.76 99.37L30.37 82.1V47.92L61.76 66zm4.48 0l31.39-17.25v-34.2L66.24 66zM32.5 44L64 26.66 95.5 44 64 62.16 32.5 44z"
          fill="#1c78c0"
        />
      </svg>
    ),
    name: "webpack",
    url: "https://webpack.js.org/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <path
          d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"
          fill="#F34F29"
        />
      </svg>
    ),
    name: "Git",
    url: "https://git-scm.com/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <g className="fill-[#181616] dark:fill-white">
          <path
            clipRule="evenodd"
            d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
            fillRule="evenodd"
          />
          <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
        </g>
      </svg>
    ),
    name: "GitHub",
    url: "https://github.com/",
  },
  {
    icon: (
      <svg viewBox="0 0 128 128">
        <defs>
          <linearGradient
            gradientTransform="scale(4)"
            gradientUnits="userSpaceOnUse"
            id="jira-original-a"
            x1="22.034"
            x2="17.118"
            y1="9.773"
            y2="14.842"
          >
            <stop offset=".176" stopColor="#0052cc" />
            <stop offset="1" stopColor="#2684ff" />
          </linearGradient>
          <linearGradient
            gradientTransform="scale(4)"
            gradientUnits="userSpaceOnUse"
            id="jira-original-b"
            x1="16.641"
            x2="10.957"
            y1="15.564"
            y2="21.094"
          >
            <stop offset=".176" stopColor="#0052cc" />
            <stop offset="1" stopColor="#2684ff" />
          </linearGradient>
        </defs>
        <path
          d="M108.023 16H61.805c0 11.52 9.324 20.848 20.847 20.848h8.5v8.226c0 11.52 9.328 20.848 20.848 20.848V19.977A3.98 3.98 0 00108.023 16zm0 0"
          fill="#2684ff"
        />
        <path
          d="M85.121 39.04H38.902c0 11.519 9.325 20.847 20.844 20.847h8.504v8.226c0 11.52 9.328 20.848 20.848 20.848V43.016a3.983 3.983 0 00-3.977-3.977zm0 0"
          fill="url(#jira-original-a)"
        />
        <path
          d="M62.219 62.078H16c0 11.524 9.324 20.848 20.848 20.848h8.5v8.23c0 11.52 9.328 20.844 20.847 20.844V66.059a3.984 3.984 0 00-3.976-3.98zm0 0"
          fill="url(#jira-original-b)"
        />
      </svg>
    ),
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
  },
]
