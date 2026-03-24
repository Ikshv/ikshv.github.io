import React from 'react';

/** Shared glass card wrapper for login / sign-up pages. */
export function AuthFormLayout({ title, subtitle, children, footer }) {
  return (
    <section className="max-w-md mx-auto px-6 py-10 text-white">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-300 text-center mb-6">{subtitle}</p>
        )}
        {children}
      </div>
      {footer && <div className="mt-6 text-center text-sm text-gray-300">{footer}</div>}
    </section>
  );
}
