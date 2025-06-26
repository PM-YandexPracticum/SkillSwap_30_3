import React from "react";

export type HeaderSearchProps = {
  isAuthenticated: boolean;
} & React.ComponentPropsWithoutRef<'input'>;