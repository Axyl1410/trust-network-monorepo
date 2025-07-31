declare module '@workspace/ui/postcss.config' {
  const config: Record<string, unknown>;
  export default config;
}

declare module '@workspace/ui/globals.css' {
  const styles: string;
  export default styles;
}

declare module '@workspace/ui/lib/*' {
  export * from './src/lib/*';
}

declare module '@workspace/ui/components/*' {
  export * from './src/components/*';
}

declare module '@workspace/ui/hooks/*' {
  export * from './src/hooks/*';
}
