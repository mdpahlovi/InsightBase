import * as Icons from "iconsax-reactjs";

type IconProps = Readonly<{ name: keyof typeof Icons; size?: number; color?: string; className?: string }>;

export function Icon({ name, size = 16, color, className }: IconProps) {
    const Icon = Icons[name];
    return <Icon size={size} color={color} className={className} />;
}
