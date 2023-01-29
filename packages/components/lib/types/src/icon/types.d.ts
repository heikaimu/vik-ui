import type { ExtractPropTypes } from 'vue';
export declare const iconProps: {
    name: {
        type: StringConstructor;
    };
    dot: {
        type: BooleanConstructor;
    };
    badge: {
        type: StringConstructor;
    };
};
export declare type IconProps = ExtractPropTypes<typeof iconProps>;
