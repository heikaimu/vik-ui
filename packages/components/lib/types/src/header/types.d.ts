import type { ExtractPropTypes } from 'vue';
export declare const headerProps: {
    title: {
        type: StringConstructor;
    };
    sub: {
        type: StringConstructor;
    };
    iconName: {
        type: StringConstructor;
        default: string;
    };
};
export declare type HeaderProps = ExtractPropTypes<typeof headerProps>;
