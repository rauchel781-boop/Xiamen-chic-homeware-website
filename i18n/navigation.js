import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware Link / redirect / usePathname / useRouter — auto-prefixes
// links with the active locale. Use these everywhere we used Next's
// next/link / next/navigation.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: routing.locales,
    localePrefix: routing.localePrefix,
  });
