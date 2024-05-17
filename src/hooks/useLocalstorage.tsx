import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string) {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved!);
    return initial || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    const removeValue = () => {
        localStorage.removeItem(key)
    }

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue, removeValue];
};