declare const _default: import("@vik-ui/utils/withinstall").SFCWithInstall<import("vue").DefineComponent<{
    products: {
        type: import("vue").PropType<import("./types").Product[]>;
        default: () => never[];
    };
    data: {
        type: import("vue").PropType<import("./types").SelectProduct[]>;
        default: () => never[];
    };
}, {
    handleClick: (item: import("./types").Product) => void;
    isActive: (item: import("./types").Product) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    products: {
        type: import("vue").PropType<import("./types").Product[]>;
        default: () => never[];
    };
    data: {
        type: import("vue").PropType<import("./types").SelectProduct[]>;
        default: () => never[];
    };
}>>, {
    data: import("./types").SelectProduct[];
    products: import("./types").Product[];
}>>;
export default _default;
