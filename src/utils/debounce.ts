export function debounce<T extends (...args: unknown[]) => void>(
    callback: T, 
    delay: number
): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}
