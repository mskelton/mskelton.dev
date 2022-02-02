export const truthy = Boolean as unknown as <T>(
  arg: T | false | null | undefined
) => arg is T
