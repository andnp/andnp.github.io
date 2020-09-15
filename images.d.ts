declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare module '*.md' {
  const str: string;
  export default str;
}

declare module 'markdown-it-katex' {
  const katex: any;
  export default katex;
}
