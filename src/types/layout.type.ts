import React from "react";
// import { IconType } from "react-icons";

export interface NavItemProps {
  to: string;
  icon: any;
  label: string;
  isDashboard?: boolean;
  onClick?: () => void;
}

export interface FooterItemProps {
  to: string;
  icon: any;
  label: string;
  fontSize: string;
  weight: string;
  onClick?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}
