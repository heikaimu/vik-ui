import type { ExtractPropTypes } from 'vue';
export declare const cropperProps: {
    url: {
        type: StringConstructor;
        default: string;
    };
    ratio: {
        type: NumberConstructor;
        default: undefined;
    };
};
export declare type CropperProps = ExtractPropTypes<typeof cropperProps>;
