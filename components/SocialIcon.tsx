import { InstagramLogo, FacebookLogo, PinterestLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

// Houzz has no Phosphor icon, so it is drawn here
function HouzzIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.27 0v24h8.244v-7.148h4.972V24h8.244V9.492L12.483 6.24V0H1.27z" />
    </svg>
  );
}

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  pinterest: PinterestLogo,
  linkedin: LinkedinLogo,
  houzz: HouzzIcon,
};

// the icon for a social link, picked by its name in the Studio
export const socialIcon = (label: string) => ICONS[label.trim().toLowerCase()] ?? HouzzIcon;
