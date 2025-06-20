
const base_name = 'myself_'
export const setStorage = (key: string, value: string) => {
  localStorage.setItem(base_name + key, JSON.stringify(value))
}

export const getStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(base_name + key) as string)
}