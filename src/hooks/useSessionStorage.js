import { useState, useEffect } from "react";
export function useSessionStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.warn(`Ошибка чтения sessionStorage[${key}]:`, error);
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.warn(`Ошибка записи sessionStorage[${key}]:`, error);
        }
    }, [key, value]);
    return [value, setValue];
}
