import React from 'react';

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export interface SocialItem {
  label: string;
  url: string;
  icon?: string;
  isImg?: boolean;
  component?: React.ComponentType<{ className?: string }>;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
}
