import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: "steam" | "twitch" | "twitter" | "youtube" | "mouse" | "crosshair" | "viewmodel" | "launch" | "video" | "hud" | "radar" | "knife";
  size?: number;
}

const icons = {
  steam: (
    <>
      <path d="M16.5 5a4.5 4.5 0 1 1 -.653 8.953l-4.347 3.009l0 .038a3 3 0 0 1 -2.824 3l-.176 0a3 3 0 0 1 -2.94 -2.402l-2.56 -1.098v-3.5l3.51 1.755a2.989 2.989 0 0 1 2.834 -.635l2.727 -3.818a4.5 4.5 0 0 1 4.429 -5.302z" />
      <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
    </>
  ),
  twitch: (
    <>
      <path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1z" />
      <path d="M16 8l0 4" />
      <path d="M12 8l0 4" />
    </>
  ),
  twitter: (
    <>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </>
  ),
  youtube: (
    <>
      <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
      <path d="M10 9l5 3l-5 3z" />
    </>
  ),
  mouse: <path />,
  crosshair: <path />,
  viewmodel: <path />,
  launch: <path />,
  video: <path />,
  hud: <path />,
  radar: <path />,
  knife: <path />,
};

export function Icon({ name, size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {icons[name]}
    </svg>
  );
}
