/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidPhone(str) {
  return /^1[3456789]\d{9}$/.test(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
