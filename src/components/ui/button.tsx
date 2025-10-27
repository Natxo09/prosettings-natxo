import { ExternalLink } from "lucide-react";
import { AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-80";

  const variants = {
    primary: "bg-card-foreground text-card shadow-md hover:shadow-lg",
    secondary: "bg-accent text-accent-foreground hover:bg-accent/80 border-2 border-border"
  };

  return (
    <a
      className={`${baseStyles} ${variants[variant]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <ExternalLink size={16} />
    </a>
  );
}
