import type { ExtractPropTypes } from 'vue';
export declare const containerProps: {
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    borderRadius: {
        type: NumberConstructor;
        default: number;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type ContainerProps = ExtractPropTypes<typeof containerProps>;
