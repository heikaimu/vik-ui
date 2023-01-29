import type { ExtractPropTypes } from 'vue';
export declare const rowProps: {
    gutter: {
        type: NumberConstructor;
        default: number;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
};
export declare type RowProps = ExtractPropTypes<typeof rowProps>;
