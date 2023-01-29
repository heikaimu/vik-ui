import type { ExtractPropTypes, Ref } from 'vue';
export declare const tabPaneProps: {
    label: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
};
export declare type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>;
export declare type ChangeTabNameFun = (val: string) => void;
export declare type CurrentName = Ref<string>;
