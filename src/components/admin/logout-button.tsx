"use client";

import { signOut } from "next-auth/react";

type LogoutButtonProps = {
  label: string;
};

export function LogoutButton({ label }: LogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="cross-hover-btn institution-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path d="M10 6.5H7.5A2.5 2.5 0 005 9v6a2.5 2.5 0 002.5 2.5H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M14 8l5 4-5 4M19 12h-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  );
}
