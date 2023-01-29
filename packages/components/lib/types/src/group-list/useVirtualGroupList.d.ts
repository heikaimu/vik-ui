import type { PropsType } from './types';
export declare function useVirtualGroupList(list: any[], listProps: PropsType): {
    currentGroupId: any;
    currentGroupName: import("vue").ComputedRef<any>;
    listAll: import("vue").Ref<never[]>;
    vScroll: import("vue").Ref<({
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            height: number;
            rowSpace: number;
            grid: number;
            list: unknown[];
            bufferCount: number;
            onTouchEnd: Function;
            wrapperStyle: Record<string, any>;
            colSpace: number;
            rowKey: string;
            loadingText: string;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            list: {
                type: ArrayConstructor;
                default: () => never[];
            };
            grid: {
                type: NumberConstructor;
                default: number;
            };
            height: {
                type: NumberConstructor;
                default: number;
            };
            rowKey: {
                type: StringConstructor;
                default: string;
            };
            onTouchEnd: {
                type: FunctionConstructor;
                default: null;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            bufferCount: {
                type: NumberConstructor;
                default: number;
            };
            wrapperStyle: {
                type: ObjectConstructor;
                default: () => void;
            };
            colSpace: {
                type: NumberConstructor;
                default: number;
            };
            rowSpace: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            onScroll?: ((...args: any[]) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "height" | "list" | "grid" | "rowKey" | "onTouchEnd" | "loadingText" | "bufferCount" | "wrapperStyle" | "colSpace" | "rowSpace">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "scroll", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            list: {
                type: ArrayConstructor;
                default: () => never[];
            };
            grid: {
                type: NumberConstructor;
                default: number;
            };
            height: {
                type: NumberConstructor;
                default: number;
            };
            rowKey: {
                type: StringConstructor;
                default: string;
            };
            onTouchEnd: {
                type: FunctionConstructor;
                default: null;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            bufferCount: {
                type: NumberConstructor;
                default: number;
            };
            wrapperStyle: {
                type: ObjectConstructor;
                default: () => void;
            };
            colSpace: {
                type: NumberConstructor;
                default: number;
            };
            rowSpace: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            onScroll?: ((...args: any[]) => any) | undefined;
        }, {
            scrollToIndex: (index: number, offset?: number | undefined) => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            scroll: null;
        }, string, {
            height: number;
            rowSpace: number;
            grid: number;
            list: unknown[];
            bufferCount: number;
            onTouchEnd: Function;
            wrapperStyle: Record<string, any>;
            colSpace: number;
            rowKey: string;
            loadingText: string;
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        list: {
            type: ArrayConstructor;
            default: () => never[];
        };
        grid: {
            type: NumberConstructor;
            default: number;
        };
        height: {
            type: NumberConstructor;
            default: number;
        };
        rowKey: {
            type: StringConstructor;
            default: string;
        };
        onTouchEnd: {
            type: FunctionConstructor;
            default: null;
        };
        loadingText: {
            type: StringConstructor;
            default: string;
        };
        bufferCount: {
            type: NumberConstructor;
            default: number;
        };
        wrapperStyle: {
            type: ObjectConstructor;
            default: () => void;
        };
        colSpace: {
            type: NumberConstructor;
            default: number;
        };
        rowSpace: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        onScroll?: ((...args: any[]) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        scrollToIndex: (index: number, offset?: number | undefined) => void;
    }> & {} & import("vue").ComponentCustomProperties) | undefined>;
    navigation: import("vue").ComputedRef<any>;
    changeGroup: (id: string) => void;
    setActiveGroup: (start: number) => void;
    setBodyListAll: () => void;
    scrollToIndex: (index: number) => void;
};
