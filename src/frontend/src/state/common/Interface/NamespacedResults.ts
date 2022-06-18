export default interface NamespacedResults<T> {
  readonly namespace: number
  readonly results: Array<T>
}
