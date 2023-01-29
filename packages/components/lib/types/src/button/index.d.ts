declare const _default: import("@vik-ui/utils/withinstall").SFCWithInstall<import("vue").DefineComponent<{
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
}, {
    styleClass: import("vue").ComputedRef<{
        [x: string]: string | boolean | undefined;
        'is-round': boolean;
        'is-disabled': boolean;
        'is-fill': boolean;
    }>;
    iconFont: import("vue").ComputedRef<{
        iconName: string | undefined;
        position: string | undefined;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    fill: boolean;
    round: boolean;
    disabled: boolean;
}>>;
export default _default;
