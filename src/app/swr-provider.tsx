"use client";
import React from "react";
import { SWRConfig } from "swr";

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url, {
            // headers: {
            //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            // },
          }).then((r) => r.json()),
        
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
