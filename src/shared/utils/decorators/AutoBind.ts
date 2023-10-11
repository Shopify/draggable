export function AutoBind<T extends (...args: any[]) => any>(
  originalMethod: T,
  {name, addInitializer}: ClassMethodDecoratorContext<ThisParameterType<T>, T>,
) {
  addInitializer(function (this: ThisParameterType<T>) {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    this[name as PropertyKey] = originalMethod.bind(this);
    /* eslint-enable @typescript-eslint/ban-ts-comment */
  });
}
