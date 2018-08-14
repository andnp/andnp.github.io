declare module 'react-jss' {
  interface InjectSheet {
    (styles: any): <T>(x: T) => T;
  }

  const injectSheet: InjectSheet;
  export default injectSheet;
}