import NamespacedDataRecord from '@/state/common/Interface/NamespacedDataRecord'

export default interface NamespacedResults {
  readonly namespace: number
  readonly results: Array<NamespacedDataRecord>
}
