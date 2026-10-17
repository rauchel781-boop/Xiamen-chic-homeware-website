import nextVitals from 'eslint-config-next/core-web-vitals';

export default [
  ...nextVitals,
  {ignores: ['.next/**', '.next-inquiry-backup-20261016/**', '.old/**', 'node_modules/**', 'public/**', 'wp-data/**', 'messages/**']},
];
