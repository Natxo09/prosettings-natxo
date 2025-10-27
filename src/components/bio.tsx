"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "./icon";
import { Tooltip } from "./ui/tooltip";
import { Spinner } from "./ui/spinner";
import { LeetifyProfile } from "@/lib/leetify-api";

const socialLinks = [
  {
    name: "Steam",
    icon: "steam" as const,
    url: "https://steamcommunity.com/id/natxxo",
  },
  {
    name: "FACEIT",
    icon: "faceit" as const,
    url: "https://www.faceit.com/en/players/VGNatxo",
  },
  {
    name: "Twitch",
    icon: "twitch" as const,
    url: "https://twitch.tv/Natxo",
  },
  {
    name: "Twitter",
    icon: "twitter" as const,
    url: "https://twitter.com/NatxoDev",
  },
  {
    name: "YouTube",
    icon: "youtube" as const,
    url: "https://youtube.com/@NatxoNetwork",
  },
];

export function Bio() {
  const [profile, setProfile] = useState<LeetifyProfile | null>(null);
  const [faceitElo, setFaceitElo] = useState<number>(2323); // Fallback
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both Leetify and FACEIT data in parallel
        const [leetifyResponse, faceitResponse] = await Promise.all([
          fetch('/api/leetify'),
          fetch('/api/faceit')
        ]);

        // Handle Leetify response
        if (leetifyResponse.ok) {
          const leetifyData = await leetifyResponse.json();
          setProfile(leetifyData);
        } else {
          console.error('Failed to fetch Leetify profile');
        }

        // Handle FACEIT response
        if (faceitResponse.ok) {
          const faceitData = await faceitResponse.json();
          if (faceitData.elo) {
            setFaceitElo(faceitData.elo);
          }
        } else {
          console.error('Failed to fetch FACEIT ELO');
        }

        setIsLoading(false);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchData();

    // Poll every 1 hour (3600000ms) for updates
    // Server handles caching, so this just checks for new data
    const pollInterval = setInterval(() => {
      fetchData();
    }, 3600000); // 1 hour

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Logo - Large on left */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-border select-none">
            <Image
              src="/Natxo_logo_18.svg"
              alt="Natxo Logo"
              fill
              className="object-cover"
              draggable={false}
              priority
            />
          </div>
        </div>

        {/* Right side content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Name and nationality */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h2 className="text-3xl sm:text-4xl font-bold">Natxo</h2>
              <Image
                src="/icons/españa.svg"
                alt="Spain"
                width={32}
                height={32}
                className="select-none"
                draggable={false}
              />
              <Tooltip content={lastUpdated ? `Updated: ${lastUpdated.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : 'Loading...'}>
                <Image
                  src="/icons/info.svg"
                  alt="Last updated info"
                  width={20}
                  height={20}
                  className="select-none cursor-help opacity-60 hover:opacity-100 transition-opacity"
                  draggable={false}
                />
              </Tooltip>
            </div>
          </div>

          {/* ELO Stats */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {/* CS2 Premier ELO */}
            <div className="bg-background rounded-lg py-3 px-3 border border-border">
              {/* Premier Rating - same style as cs2-elo */}
              <div
                className="flex items-center justify-center bg-no-repeat font-bold italic"
                style={{
                  backgroundImage: 'url(/icons/ancient.png)',
                  color: '#EB4B4B',
                  textShadow: '0 2px 0 black',
                  width: '140px',
                  height: '48px',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  fontSize: '30px',
                }}
              >
                {isLoading ? (
                  <Spinner className="size-6" />
                ) : (
                  <span
                    style={{
                      paddingLeft: '0.88rem',
                      paddingTop: '0.47rem',
                      display: 'block'
                    }}
                  >
                    {profile?.ranks?.premier?.toLocaleString() || '—'}
                  </span>
                )}
              </div>
            </div>

            {/* FACEIT */}
            <div className="bg-background rounded-lg py-3 px-3 border border-border">
              {/* FACEIT Rating - same style as cs2-elo */}
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <Spinner className="size-6" />
                ) : (
                  <>
                    <div
                      className="bg-no-repeat flex-shrink-0"
                      style={{
                        backgroundImage: 'url(/icons/faceit-level-10.svg)',
                        width: '40px',
                        height: '40px',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                      }}
                    />
                    <span
                      className="font-bold"
                      style={{
                        color: '#EB4B4B',
                        textShadow: '0 2px 0 black',
                        fontSize: '30px',
                      }}
                    >
                      {faceitElo.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 justify-center sm:justify-start">
            {socialLinks.map((social) => (
              <Tooltip key={social.name} content={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background hover:scale-110 transition-all duration-200 text-foreground/70 hover:text-foreground"
                  aria-label={social.name}
                >
                  {social.icon === "faceit" ? (
                    <Image
                      src="/icons/faceit-pheasant.png"
                      alt="FACEIT"
                      width={20}
                      height={20}
                      className="select-none transition-all duration-200"
                      draggable={false}
                    />
                  ) : (
                    <Icon
                      name={social.icon}
                      size={20}
                      className="transition-all duration-200"
                    />
                  )}
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
