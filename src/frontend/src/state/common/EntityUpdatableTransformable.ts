import EntityBase from '@/state/common/EntityBase'
import EntityUpdatableTypes from '@/state/common/EntityUpdatableTypes'
import EntityBaseTransformable from '@/state/common/EntityBaseTransformable'
import EntityUpdatableItemFieldType from '@/state/common/EntityUpdatableItemFieldType'
import EntityUpdatableInputTextOption from '@/state/common/EntityUpdatableInputTextOption'
import { first, get, includes, isBoolean, isEmpty, isString, isUndefined, set } from 'lodash'

export default abstract class EntityUpdatableTransformable<DEST, SOURCE extends EntityBase> extends EntityBaseTransformable<DEST, SOURCE> {
  setupInputFieldText(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>, supportedActions?: Array<EntityUpdatableInputTextOption>): void {
    let finalValue = ''
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue) && isString(fieldValue)) finalValue = fieldValue

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<string, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.text,
        options: {
          actions: supportedActions || [],
        } as Record<never, unknown>,
      })
    )
  }

  setupInputFieldNumber(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>): void {
    let finalValue = 0
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue)) finalValue = Number(fieldValue)

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<number, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.number,
      })
    )
  }

  setupInputFieldVueEditor(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>): void {
    let finalValue = ''
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue) && isString(fieldValue)) finalValue = fieldValue

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<string, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.vue2editor,
      })
    )
  }

  setupInputFieldVuePrismEditor(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>): void {
    let finalValue = ''
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue) && isString(fieldValue)) finalValue = fieldValue

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<string, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.vuePrismEditor,
      })
    )
  }

  setupInputFieldCheckbox(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>): void {
    let finalValue = false
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue) && isBoolean(fieldValue)) finalValue = fieldValue

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<boolean, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.checkbox,
      })
    )
  }

  setupInputFieldSimpleDropdownBoolean(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>, prefix = '', firstEntryDisplayMessage?: string): void {
    let finalValue: string | boolean = get(from, sourceField) as unknown as boolean
    const finalOptions: Record<string, boolean | string> = {}
    if (!isUndefined(firstEntryDisplayMessage) && isString(firstEntryDisplayMessage)) {
      finalOptions[''] = firstEntryDisplayMessage
      if (isUndefined(finalValue) || !isBoolean(finalValue)) {
        finalValue = firstEntryDisplayMessage
      }
    }
    finalOptions['true'] = true
    finalOptions['false'] = false

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<string, EntityUpdatableTypes>({
        value: finalValue as string,
        type: EntityUpdatableTypes.simpleDropdown,
        options: <Record<string, never>>{
          data: finalOptions as never,
          prefix: prefix as never,
        },
      })
    )
  }

  setupInputFieldSimpleDropdown(
    destField: keyof DEST,
    sourceField: keyof SOURCE,
    from: Partial<SOURCE>,
    options: Record<string, never>,
    prefix: string | null = 'update.dynamic',
    firstEntryDisplayMessage?: string,
    additionalOptions?: Record<string, never>
  ): void {
    let finalValue: string | undefined = ''
    const fieldValue = get(from, sourceField) as unknown as string
    if (!isUndefined(fieldValue) && !isEmpty(fieldValue)) {
      finalValue = fieldValue
    }

    let finalOptions: Record<string, never> = {}
    if (!isUndefined(firstEntryDisplayMessage) && isString(firstEntryDisplayMessage)) {
      finalOptions[''] = firstEntryDisplayMessage as unknown as never
    }
    finalOptions = { ...finalOptions, ...options }

    if (!includes(Object.values(options), finalValue)) {
      finalValue = first(Object.values(finalOptions))
    }

    if (isUndefined(additionalOptions)) {
      additionalOptions = {}
    }

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<string, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.simpleDropdown,
        options: <Record<string, never>>{
          data: finalOptions as never,
          prefix: prefix as never,
          ...additionalOptions,
        },
      })
    )
  }

  setupInputFieldSimpleRadio(destField: keyof DEST, sourceField: keyof SOURCE, from: Partial<SOURCE>, options: Record<string, never>): void {
    let finalValue = ''
    const fieldValue = get(from, sourceField)
    if (!isUndefined(fieldValue) && isString(fieldValue)) finalValue = fieldValue

    set(
      this,
      destField,
      new EntityUpdatableItemFieldType<string, EntityUpdatableTypes>({
        value: finalValue,
        type: EntityUpdatableTypes.simpleRadio,
        options,
      })
    )
  }
}
