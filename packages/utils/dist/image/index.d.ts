interface ImageResetRateParams {
    url: string;
    width: number;
    height: number;
}
interface ColorMatrixParams {
    brightness: number;
    contrast: number;
}
interface ImageResetParams {
    file: Blob;
    quality: number;
    targetSize: number;
    angle: number;
}
declare function getObjectUrl(file: Blob): string;
declare function dataURLtoBlob(str: string): Blob | null;
declare function base64toUrl(str: string): string | null;
declare function blobToDataURL(blob: Blob): Promise<string>;
declare function getBlobByUrl(url: string): Promise<Blob>;
declare function getFileSize(url: string): Promise<unknown>;
declare function download(url: string, filename: string, suffix: string): void;
declare function downloadBase64(str: string, filename: string, suffix: string): void;
declare function imageReset(option: ImageResetParams): Promise<string>;
declare function colorMatrix(url: string, option: ColorMatrixParams): Promise<string>;
declare function cropImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): string;
declare function loadImages(images: string[]): Promise<HTMLImageElement[]>;
declare function loadImage(url: string): Promise<HTMLImageElement>;
declare function clearImageEdgeBlank(url: string, padding?: number): Promise<string>;
declare function flipImage(data: Blob | string, type: string, isJPG: boolean): Promise<string | Blob>;
declare function imageResetRate(params: ImageResetRateParams): Promise<string>;
declare function shopifyImageSetSize(url: string, width: number): string;
export { getObjectUrl, base64toUrl, dataURLtoBlob, blobToDataURL, getBlobByUrl, getFileSize, download, downloadBase64, imageReset, colorMatrix, cropImage, loadImage, loadImages, clearImageEdgeBlank, flipImage, imageResetRate, shopifyImageSetSize, };
