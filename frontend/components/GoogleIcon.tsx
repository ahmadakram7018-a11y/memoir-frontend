// The standard multi-color Google "G" mark. Kept as its own component
// since it's used identically on both the signup and login screens.
export default function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.4 0 6.4 1.2 8.8 3.5l6.5-6.5C35.3 2.8 30 0.5 24 0.5 14.9 0.5 7.1 5.7 3.3 13.3l7.6 5.9C12.7 13.2 17.9 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-4 6.8-9.8 6.8-17.4Z"
      />
      <path
        fill="#FBBC05"
        d="M10.9 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.6-5.9C1.5 16.9.5 20.3.5 24s1 7.1 2.8 10.5l7.6-5.9Z"
      />
      <path
        fill="#34A853"
        d="M24 47.5c6 0 11.3-2 15-5.4l-7.3-5.7c-2 1.4-4.6 2.2-7.7 2.2-6.1 0-11.3-3.7-13.1-9.9l-7.6 5.9C7.1 42.3 14.9 47.5 24 47.5Z"
      />
    </svg>
  );
}
