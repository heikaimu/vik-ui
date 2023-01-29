import type { Product, SelectProduct } from './types';
declare const _sfc_main: import("vue").DefineComponent<{
    products: {
        type: import("vue").PropType<Product[]>;
        default: () => never[];
    };
    data: {
        type: import("vue").PropType<SelectProduct[]>;
        default: () => never[];
    };
}, {
    handleClick: (item: Product) => void;
    isActive: (item: Product) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    products: {
        type: import("vue").PropType<Product[]>;
        default: () => never[];
    };
    data: {
        type: import("vue").PropType<SelectProduct[]>;
        default: () => never[];
    };
}>>, {
    data: SelectProduct[];
    products: Product[];
}>;
export default _sfc_main;
