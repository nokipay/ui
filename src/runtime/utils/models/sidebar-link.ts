export interface SidebarLink {
    title: string,
    route_link?: string,
    icon?: string,
    isTitle?: boolean,
    permission?: string,
    children?: SidebarLink[]
}