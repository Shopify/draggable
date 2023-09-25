declare module 'rollup-plugin-includepaths' {
  interface Options {
    include: {[key: string]: string};
    paths: string[];
    extensions: string[];
  }
  export = includePaths;
  function includePaths(object: Options);
}
