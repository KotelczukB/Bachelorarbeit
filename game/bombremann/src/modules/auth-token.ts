export const getAuthToken = (): string | null => localStorage.getItem('authToken');

export const setAuthToken = (token: string): void => localStorage.setItem('authToken', token);