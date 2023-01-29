import type { ExtractPropTypes } from 'vue';
export declare const ButtonType: string[];
export declare const ButtonSize: string[];
export declare const buttonProps: {
    type: {
        type: StringConstructor;
        validator(value: string): boolean;
    };
    size: {
        type: StringConstructor;
        validator(value: string): boolean;
    };
    round: BooleanConstructor;
    disabled: BooleanConstructor;
    fill: BooleanConstructor;
    icon: StringConstructor;
    iconPosition: StringConstructor;
};
export declare type ButtonProps = ExtractPropTypes<typeof buttonProps>;
