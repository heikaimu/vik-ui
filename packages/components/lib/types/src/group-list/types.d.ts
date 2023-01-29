import type { ExtractPropTypes, PropType } from 'vue';
export declare const groupListProps: {
    data: {
        type: ArrayConstructor;
        default: () => never[];
    };
    props: {
        type: PropType<PropsType>;
        default: () => {
            children: string;
            label: string;
            id: string;
        };
    };
    activeName: {
        type: StringConstructor;
    };
    posKey: {
        type: StringConstructor;
    };
    posValue: {
        type: (NumberConstructor | StringConstructor)[];
    };
    cardHeight: {
        type: NumberConstructor;
        default: number;
    };
    colSpace: {
        type: NumberConstructor;
        default: number;
    };
    rowSpace: {
        type: NumberConstructor;
        default: number;
    };
};
export declare type GroupListProps = ExtractPropTypes<typeof groupListProps>;
export interface Navigation {
    title: string;
    id: string;
    count: number;
    start: number;
    end: number;
}
export interface PropsType {
    label?: string;
    id?: string;
    children?: string;
}
export declare const navigationProps: {
    list: {
        type: PropType<Navigation[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        deafult: string;
    };
};
