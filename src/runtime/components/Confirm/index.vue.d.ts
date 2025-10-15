declare var __VLS_10: {}, __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_10) => any;
} & {
    default?: (props: typeof __VLS_12) => any;
} & {
    action?: (props: typeof __VLS_14) => any;
};
declare const __VLS_component: import("vue").DefineComponent<{}, {
    open: () => void;
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
