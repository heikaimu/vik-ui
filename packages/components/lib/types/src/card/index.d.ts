declare const _default: import("@vik-ui/utils/withinstall").SFCWithInstall<import("vue").DefineComponent<{
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
}, {
    ratioStyle: import("vue").ComputedRef<{
        'padding-bottom': string;
        'border-radius': string;
    }>;
    cardClass: import("vue").ComputedRef<{
        'viking-card--shadow': boolean;
        'viking-card--border': boolean;
    }>;
    cardStyle: import("vue").ComputedRef<{
        'border-radius': string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    title: string;
    src: string;
    radius: string;
    shadow: boolean;
    border: boolean;
    ratio: string | number;
}>>;
export default _default;
