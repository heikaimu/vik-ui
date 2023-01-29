import type { PropType } from 'vue';
import type { ExtractPropTypes } from 'vue';
export interface Product {
    uuid: string;
    title: string;
    url: string;
    id: string;
    hasText: boolean;
    price: number;
}
export interface SelectProduct {
    url: string;
    uuid: string;
    id: string;
    hasText: boolean;
}
export declare const productSelectorProps: {
    products: {
        type: PropType<Product[]>;
        default: () => never[];
    };
    data: {
        type: PropType<SelectProduct[]>;
        default: () => never[];
    };
};
export declare type ProductSelectorProps = ExtractPropTypes<typeof productSelectorProps>;
