interface ProgressParams {
    parts: number;
    speed: number;
    onProgress: (val: number) => void | null;
    onComplete: () => void | null;
}
export default class Progress {
    private _total;
    private _percent;
    private _completeParts;
    private _parts;
    private _speed;
    private _onePartPercent;
    private _onProgress;
    private _onComplete;
    constructor({ parts, speed, onProgress, onComplete }: ProgressParams);
    start(): void;
    handleTicker(val: number): void;
    _n: number;
    handleAutoAddPercent(val: number): void;
    addPercent(): void;
    getRandomSpeed(): number;
    next(): void;
    end(): void;
    get percent(): number;
}
export {};
