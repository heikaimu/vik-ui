declare const _sfc_main: import("vue").DefineComponent<{
    url: {
        type: StringConstructor;
        default: string;
    };
    ratio: {
        type: NumberConstructor;
        default: undefined;
    };
}, {
    handleZoom: (val: number) => void;
    handleReset: () => void;
    handleConfirm: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    url: {
        type: StringConstructor;
        default: string;
    };
    ratio: {
        type: NumberConstructor;
        default: undefined;
    };
}>>, {
    url: string;
    ratio: number;
}>;
export default _sfc_main;
