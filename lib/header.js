let defaultHeaderOptions = {  
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Set header
// options param is an Object
// ex: options = {Authorization: "Bearer 1283jkhasdfkjasdfha2iu3"}

const setHeader = options => {
  defaultHeaderOptions = Object.assign({}, defaultHeaderOptions, options);
};

export const getHeaders = () => {
  return defaultHeaderOptions;
};