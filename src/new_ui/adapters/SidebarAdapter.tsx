import React from 'react';
import Sidebar from '../components/Sidebar';

type LegacyProps = any;

/**
 * SidebarAdapter
 * - If `LegacySidebar` is provided, it will be rendered with an adapted prop shape.
 * - Otherwise the built-in `Sidebar` is used.
 */
export const SidebarAdapter: React.FC<{
  LegacySidebar?: React.ComponentType<LegacyProps>;
  items?: { label: string; href?: string; children?: any[] }[];
  onNavigate?: (href?: string) => void;
}> = ({ LegacySidebar, items = [], onNavigate }) => {
  if (LegacySidebar) {
    const legacyProps = {
      menuItems: items.map((it) => ({
        label: it.label,
        link: it.href,
        children: it.children,
      })),
      onSelect: onNavigate,
    };
    // @ts-ignore
    return <LegacySidebar {...legacyProps} />;
  }

  return <Sidebar items={items} onNavigate={onNavigate} />;
};

export default SidebarAdapter;
