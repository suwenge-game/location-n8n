"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: "light" | "dark" | "system"; icon: React.ReactNode; label: string }[] = [
    {
      value: "light",
      icon: <Sun className="h-5 w-5" />,
      label: "浅色",
    },
    {
      value: "dark",
      icon: <Moon className="h-5 w-5" />,
      label: "深色",
    },
    {
      value: "system",
      icon: <Monitor className="h-5 w-5" />,
      label: "跟随系统",
    },
  ];

  const currentIndex = themes.findIndex((t) => t.value === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(nextTheme.value)}
      className="gap-2"
      title={`当前主题：${themes[currentIndex].label}，点击切换到${nextTheme.label}`}
    >
      {themes[currentIndex].icon}
      <span className="hidden sm:inline">{themes[currentIndex].label}</span>
    </Button>
  );
}
