import { isNil } from 'lodash';

export const isObjectEqual = (
  obj1: object | null,
  obj2: object | null
): boolean => {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (obj1.constructor !== obj2.constructor) return false;

  const keys = Object.keys(obj1);
  if (keys.length !== Object.keys(obj2).length) return false;

  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;

    const obj1Value = obj1[key];
    const obj2Value = obj2[key];
    if (typeof obj1Value !== typeof obj2Value) return false;

    if (typeof obj1Value === 'object') {
      if (!isObjectEqual(obj1Value, obj2Value)) return false;
    } else if (obj1Value !== obj2Value) {
      return false;
    }
  }
  return true;
};

interface DeleteNilValFunction {
  <T extends Record<string, unknown>>(obj: T): Partial<T>;
}

const filter: (val: unknown) => boolean = val => {
  switch (typeof val) {
    case 'number':
      return !isNaN(val);
    case 'function':
      return Boolean(val);
    case 'object':
      if (Array.isArray(val)) {
        return true;
      }
      return Boolean(val);
    case 'undefined':
      return false;
    case 'boolean':
      return true;
    case 'bigint':
      return true;
    case 'string':
      return Boolean(val);
    case 'symbol':
      return true;
    default:
      return Boolean(val) || false;
  }
};

/**
 * deleteNilVal: delete nil value in a given object with customized nil value definition.
 * @param obj T extends Record<string, unknown>
 * @returns Partial<T>
 */
export const deleteNilVal: DeleteNilValFunction = obj =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    if (typeof v === 'object') {
      if (Array.isArray(v)) {
        return { ...acc, [k]: v.filter(e => !isNil(e) && e !== '') };
      }
      if (JSON.stringify(v) === '{}') {
        return acc;
      }
      if (v instanceof Object) {
        return { ...acc, [k]: deleteNilVal(v as Record<string, unknown>) };
      }
      return filter(v) ? { ...acc, [k]: v } : acc;
    }
    return filter(v) ? { ...acc, [k]: v } : acc;
  }, {});

export const safeJSONParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};
