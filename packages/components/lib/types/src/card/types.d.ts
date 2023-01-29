import type { ExtractPropTypes } from 'vue';
export declare const cardProps: {
    src: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    radius: {
        type: StringConstructor;
        default: string;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    ratio: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
};
export declare type CardProps = ExtractPropTypes<typeof cardProps>;
