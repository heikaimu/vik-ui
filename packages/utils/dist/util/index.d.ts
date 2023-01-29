declare function debounce(fn: Function, delay: number): (this: void) => void;
declare function throttle(fn: Function, delay: number, atleast: number): () => void;
declare function getRandomID(length?: number): string;
declare function number(val: number, inscriber?: number): string;
export { debounce, throttle, getRandomID, number, };
