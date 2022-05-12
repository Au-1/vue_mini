import { ShapeFlags } from "../shared/ShapeFlag"

export function initSlots(instance, children) {  
  const {vnode} = instance 
  
  if(vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjctSlots(children, instance.slots = {}) 
  }
}

function normalizeObjctSlots(children: any, slots: any) {  
  for (const key in children) {
    const value = children[key]
    slots[key] = (props) => normalizeSlotValue(value(props))
  } 
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value: [value]
}