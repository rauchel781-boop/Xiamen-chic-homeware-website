import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Share the default locale so English links are canonical even before hydration.
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
