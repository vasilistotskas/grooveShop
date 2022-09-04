import EntityBase from '@/state/common/EntityBase'
import Coordinates from '@/state/common/Coordinates'
import { get, set, isUndefined, first, join, keys, pickBy } from 'lodash'

export default abstract class EntityBaseTransformable<DEST, SOURCE extends EntityBase> {
  public abstract makeEntityBase(): SOURCE

  public abstract transformFromEntityBase(entity: Partial<SOURCE>): Promise<void>

  public findFieldTruth<T>(dummyInstance: T): keyof T {
    return first(
      keys(pickBy((<unknown>dummyInstance) as object | null | undefined, (field) => field === true))
    ) as keyof T
  }

  protected setFieldIfExists(
    destField: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>,
    preProcessor = (item: unknown): unknown => item
  ): void {
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue)) set(this, destField, preProcessor(fieldValue))
  }

  protected setFieldIfExistsBooleanFromEnumYN(
    destField: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>
  ): void {
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue)) set(this, destField, fieldValue ? 'Y' : 'N')
  }

  protected setFieldIfExistsBooleanFromEnumYND(
    destField: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>
  ): void {
    const fieldValue = get(from, sourceField) as unknown as boolean
    if (isUndefined(fieldValue)) return
    if (fieldValue === null) {
      set(this, destField, 'D')
      return
    }
    set(this, destField, fieldValue ? 'Y' : 'N')
  }

  protected setFieldIfExistsBooleanFromTinyInt(
    destField: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>
  ): void {
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue)) set(this, destField, fieldValue ? 1 : 0)
  }

  protected setFieldIfExistsConcat(
    destField: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>,
    delimeter = ' '
  ): void {
    const fieldValue = (<unknown>get(from, sourceField)) as Array<string>
    if (!isUndefined(fieldValue)) set(this, destField, join(fieldValue, delimeter))
  }

  protected setFieldCoordinatesIfExists(
    destFieldLatitude: keyof DEST,
    destFieldLongitude: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>
  ): void {
    const fieldValue = get(from, sourceField) as unknown as Coordinates
    if (!isUndefined(fieldValue)) {
      set(this, destFieldLatitude, fieldValue.latitude)
      set(this, destFieldLongitude, fieldValue.longitude)
    }
  }
}
