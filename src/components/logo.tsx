type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
    >
      <path d="M32 8c1.6 5 1.4 7.4 0 9.6-1.4-2.2-1.6-4.6 0-9.6Z" fill="currentColor" />
      <path
        d="M32 14c6.2-6.4 13.2-4.2 15.4 2-6.6 2.4-11 2.6-15.4-2Z"
        fill="currentColor"
      />
      <path
        d="M32 14C25.8 7.6 18.8 9.8 16.6 16c6.6 2.4 11 2.6 15.4-2Z"
        fill="currentColor"
      />
      <circle cx="32" cy="39" r="17" fill="currentColor" />
      <circle cx="26" cy="36" r="2.5" fill="#F6F1E7" />
      <circle cx="34" cy="33.5" r="1.8" fill="#F6F1E7" opacity="0.85" />
      <circle cx="38" cy="41" r="2.2" fill="#F6F1E7" />
      <circle cx="28.5" cy="44" r="1.7" fill="#F6F1E7" opacity="0.8" />
    </svg>
  );
}
