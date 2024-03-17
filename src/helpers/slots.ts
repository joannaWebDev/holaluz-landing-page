// From https://github.com/vuejs/core/issues/4733#issuecomment-1512876503
import { Comment, Fragment, Text } from 'vue'
import type { Slot, VNode } from 'vue'

const asArray = <T>(arg: T | T[] | null): T[] => {
  return Array.isArray(arg) ? arg : arg !== null ? [arg] : []
}

export const isVNodeEmpty = (node: VNode | VNode[] | undefined | null): boolean => {
  return (
    !node ||
    asArray(node).every(
      node =>
        node.type === Comment ||
        (node.type === Text && !node.children?.length) ||
        (node.type === Fragment && !node.children?.length)
    )
  )
}

export const isSlotEmpty = (slot: Slot | undefined | null, props: any = {}): boolean => {
  return isVNodeEmpty(slot?.(props))
}

export const hasSlotContent = (slot: Slot | undefined | null, props: any = {}): boolean => {
  return !isSlotEmpty(slot, props)
}
