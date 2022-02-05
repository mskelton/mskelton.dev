export type InferLoaderData<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>
