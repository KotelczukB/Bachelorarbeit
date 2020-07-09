export const default_params = {
  provider: 'server'
}

export const addToDefaultParams = (custom: {}): {} => {return {
  ...default_params,
  ...custom
}}