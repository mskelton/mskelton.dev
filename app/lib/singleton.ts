export function singleton<T>(name: string, value: () => T): T {
  const yolo = global as any

  yolo.__singletons ??= {}
  yolo.__singletons[name] ??= value()

  return yolo.__singletons[name]
}
