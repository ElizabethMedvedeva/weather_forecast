export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const rowDataFromLS = localStorage.getItem(key);

  const dataFromLS = rowDataFromLS === null ? null : JSON.parse(rowDataFromLS);

  return dataFromLS;
};
