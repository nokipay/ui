interface CardProps {
    title: string;
    number: number;
    icon: string;
    currency?: 'FCFA' | 'USD' | 'EUR';
    showCompact?: boolean;
    compactThreshold?: number;
    accentColor?: 'primary' | 'success' | 'warning' | 'danger';
}
declare const _default: import("vue").DefineComponent<CardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CardProps> & Readonly<{}>, {
    currency: "FCFA" | "USD" | "EUR";
    showCompact: boolean;
    compactThreshold: number;
    accentColor: "primary" | "success" | "warning" | "danger";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
