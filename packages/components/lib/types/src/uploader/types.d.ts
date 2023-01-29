import type { ExtractPropTypes, PropType } from 'vue';
export interface FileItem {
    name: string;
    file: Blob;
}
export interface UploadRes {
    [key: string]: string;
}
export interface UploadFunParams {
    name: string;
    file: Blob;
    onSuccess: (val: string) => void;
    onError: () => void;
}
export declare const uploaderProps: {
    website: {
        type: StringConstructor;
        deafult: string;
    };
    data: {
        type: PropType<FileItem[]>;
        default: () => never[];
    };
    gifUrl: {
        type: StringConstructor;
        default: string;
    };
    barColor: {
        type: StringConstructor;
        default: string;
    };
};
export declare type UploaderProps = ExtractPropTypes<typeof uploaderProps>;
