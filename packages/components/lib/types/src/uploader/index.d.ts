declare const _default: import("@vik-ui/utils/withinstall").SFCWithInstall<import("vue").DefineComponent<{
    website: {
        type: StringConstructor;
        deafult: string;
    };
    data: {
        type: import("vue").PropType<import("./types").FileItem[]>;
        default: () => never[];
    };
    gifUrl: {
        type: StringConstructor;
        default: string;
    };
    barColor: {
        type: StringConstructor;
        default: string;
    };
}, {
    progressStyle: import("vue").ComputedRef<{
        width: string;
        background: string;
        'border-color': string;
        'background-image': string;
    }>;
    percent: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    website: {
        type: StringConstructor;
        deafult: string;
    };
    data: {
        type: import("vue").PropType<import("./types").FileItem[]>;
        default: () => never[];
    };
    gifUrl: {
        type: StringConstructor;
        default: string;
    };
    barColor: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    data: import("./types").FileItem[];
    gifUrl: string;
    barColor: string;
}>>;
export default _default;
