declare module '@workspace/eslint-config/next-js' {
  import type { Linter } from 'eslint';
  export const nextJsConfig: Linter.Config;
}

declare module '@workspace/eslint-config/node' {
  import type { Linter } from 'eslint';
  export const nodeConfig: Linter.Config;
}

declare module '@workspace/eslint-config/base' {
  import type { Linter } from 'eslint';
  export const config: Linter.Config;
}

declare module '@workspace/eslint-config/react-internal' {
  import type { Linter } from 'eslint';
  export const reactInternalConfig: Linter.Config;
}
