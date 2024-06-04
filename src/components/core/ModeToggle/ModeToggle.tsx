"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const currentTheme = theme === "dark" ? "dark" : "light";

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="mode-toggle"
        onCheckedChange={handleToggle}
        checked={theme === "dark"}
      />
      <Label htmlFor="mode-toggle">
        {theme === "dark" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
      </Label>
    </div>
  );
}
