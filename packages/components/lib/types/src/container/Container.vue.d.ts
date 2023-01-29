declare const _sfc_main: import("vue").DefineComponent<{
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
}, {
    containerClass: import("vue").ComputedRef<{
        'viking-container--border': boolean;
        'viking-container--shadow': boolean;
    }>;
    containerStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
        backgroundColor: string;
        borderRadius: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    width: number;
    height: number;
    shadow: boolean;
    border: boolean;
    backgroundColor: string;
    borderRadius: number;
    loading: boolean;
}>;
export default _sfc_main;
