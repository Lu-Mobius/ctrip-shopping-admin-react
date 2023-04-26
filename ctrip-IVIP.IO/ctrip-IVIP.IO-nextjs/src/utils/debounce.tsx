import React from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const debouncedCallback = React.useCallback(
        debounce(callback, delay),
        [callback, delay]
    );

    return debouncedCallback;
}

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timerId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}