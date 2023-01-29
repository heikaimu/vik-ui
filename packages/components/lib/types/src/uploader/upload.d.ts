import type { UploadFunParams } from './types';
/**
 * 上传文件到S3服务器
 * @param {Object} params
 * @param {Blob} params.file - 文件本体
 * @param {String} params.name - 文件名
 * @param {Function} params.onSuccess - 成功后回调
 * @param {Function} params.onError - 失败后回调
 * @param {Function} params.onProgress - 进度
 * @returns
 */
export declare const uploadFile: (params: UploadFunParams) => Promise<void>;
