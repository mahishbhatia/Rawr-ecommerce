export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Cart", href: "/cart" },
] as const;

export const footerQuickLinks: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks: readonly NavItem[] = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X", href: "#" },
  { label: "TikTok", href: "#" },
] as const;
