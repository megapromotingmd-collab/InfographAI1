const STORAGE_KEY = 'infographai:userGeminiKey';

export const setUserGeminiKey = (key: string) => {
  localStorage.setItem(STORAGE_KEY, key.trim());
};

export const getUserGeminiKey = (): string | null => {
  const val = localStorage.getItem(STORAGE_KEY);
  return val && val.trim().length > 0 ? val.trim() : null;
};

export const clearUserGeminiKey = () => {
  localStorage.removeItem(STORAGE_KEY);
};
