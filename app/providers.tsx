"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "../components/ThemeProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}