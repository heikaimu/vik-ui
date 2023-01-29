declare const _sfc_main: import("vue").DefineComponent<{
    list: {
        type: import("vue").PropType<import("./types").Navigation[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        deafult: string;
    };
}, {
    handleClick: (id: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    list: {
        type: import("vue").PropType<import("./types").Navigation[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        deafult: string;
    };
}>>, {
    list: import("./types").Navigation[];
}>;
export default _sfc_main;
