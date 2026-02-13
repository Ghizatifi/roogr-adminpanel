import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export type DropdownListType =
  | 'User'
  | 'Ads'
  | 'Categories'
  | 'Subscription'
  | 'Support'
  | 'Reports'
  | 'BanList';

export interface SubmenuItemConfig {
  to: string;
  textKey: string;
  getVisible: (permission: Record<string, unknown>) => boolean;
}

const SUBMENU_ITEMS: Record<DropdownListType, SubmenuItemConfig[]> = {
  Ads: [
    { to: '/products', textKey: 'sidebar.ads.all', getVisible: (p: any) => p.ads?.all == 1 },
    { to: '/products/main', textKey: 'sidebar.ads.main', getVisible: (p: any) => p.ads?.primary == 1 },
    { to: '/products/subscriptions', textKey: 'sidebar.ads.subscriptions', getVisible: (p: any) => p.ads?.subscription == 1 },
  ],
  User: [
    { to: '/users', textKey: 'sidebar.users.all', getVisible: (p: any) => p.users?.all == 1 },
    { to: '/users/advertiser', textKey: 'sidebar.users.advertisers', getVisible: (p: any) => p.users?.advertisers == 1 },
    { to: '/users/customer', textKey: 'sidebar.users.customers', getVisible: (p: any) => p.users?.customers == 1 },
  ],
  Categories: [
    { to: '/categories/main', textKey: 'sidebar.categories.main', getVisible: (p: any) => p.categories?.primary == 1 },
    { to: '/categories/subscriptions', textKey: 'sidebar.categories.subscriptions', getVisible: (p: any) => p.categories?.subscription == 1 },
    { to: '/categories/map', textKey: 'sidebar.categories.map', getVisible: (p: any) => p.categories?.region == 1 },
  ],
  Subscription: [
    { to: '/confirm/subscription', textKey: 'sidebar.requests.attestation', getVisible: (p: any) => p.requests?.attestation == 1 },
    { to: '/part/subscription', textKey: 'sidebar.requests.category', getVisible: (p: any) => p.requests?.category == 1 },
  ],
  Support: [
    { to: '/contact-us/inquiries', textKey: 'sidebar.support.inquiries', getVisible: (p: any) => p.contact?.inquiries == 1 },
    { to: '/contact-us/issues', textKey: 'sidebar.support.issues', getVisible: (p: any) => p.contact?.issues == 1 },
    { to: '/contact-us/suggestions', textKey: 'sidebar.support.suggestions', getVisible: (p: any) => p.contact?.suggestions == 1 },
  ],
  Reports: [
    { to: '/reports/chat', textKey: 'sidebar.reports.chat', getVisible: (p: any) => p.reports?.chats == 1 },
    { to: '/reports/product', textKey: 'sidebar.reports.product', getVisible: (p: any) => p.reports?.products == 1 },
  ],
  BanList: [
    { to: '/Ban/users', textKey: 'sidebar.ban-list.users', getVisible: (p: any) => p.banlist?.chats == 1 },
    { to: '/Ban/products', textKey: 'sidebar.ban-list.products', getVisible: (p: any) => p.banlist?.products == 1 },
    { to: '/Ban/chats', textKey: 'sidebar.ban-list.chats', getVisible: (p: any) => p.banlist?.products == 1 },
  ],
};

const POPOVER_OFFSET = 10;
const POPOVER_EDGE = 8;

interface CollapsedSubmenuPopoverProps {
  isOpen: boolean;
  anchorRect: DOMRect | null;
  dropdownType: DropdownListType | null;
  permission: Record<string, unknown>;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  closeSideBar: () => void;
}

export function CollapsedSubmenuPopover({
  isOpen,
  anchorRect,
  dropdownType,
  permission,
  onClose,
  onMouseEnter,
  onMouseLeave,
  closeSideBar,
}: CollapsedSubmenuPopoverProps) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !anchorRect || !dropdownType) return null;

  const items = SUBMENU_ITEMS[dropdownType].filter((item) => item.getVisible(permission));
  if (items.length === 0) return null;

  const isRtl = typeof document !== 'undefined' && document.documentElement.getAttribute('dir') === 'rtl';
  const estimatedHeight = items.length * 44 + 24;
  const top = Math.max(
    POPOVER_EDGE,
    Math.min(anchorRect.top, window.innerHeight - estimatedHeight - POPOVER_EDGE),
  );

  // RTL: place popover to the LEFT of the sidebar. right (CSS) = distance from viewport right,
  // so we need right = innerWidth - (anchorRect.left - POPOVER_OFFSET) so popover's right edge is at anchorRect.left - POPOVER_OFFSET.
  const style: React.CSSProperties = {
    position: 'fixed',
    top,
    minWidth: '11rem',
    maxWidth: '16rem',
    background: '#ffffff',
    border: '1px solid #E6E8F5',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    padding: '8px 0',
    zIndex: 10000,
    ...(isRtl
      ? { right: window.innerWidth - anchorRect.left + POPOVER_OFFSET, left: 'auto' }
      : { left: anchorRect.right + POPOVER_OFFSET, right: 'auto' }),
  };

  const handleLinkClick = () => {
    closeSideBar();
    onClose();
  };

  const panel = (
    <div
      ref={panelRef}
      role="menu"
      aria-orientation="vertical"
      className="collapsed-submenu-popover flex flex-col gap-0.5 py-1 rounded-xl"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* optional caret toward sidebar (white triangle with soft shadow) */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: anchorRect.top - top + anchorRect.height / 2 - 6,
          ...(isRtl
            ? { right: '-6px', left: 'auto', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '6px solid #fff', filter: 'drop-shadow(-2px 0 2px rgba(0,0,0,0.06))' }
            : { left: '-6px', right: 'auto', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '6px solid #fff', filter: 'drop-shadow(2px 0 2px rgba(0,0,0,0.06))' }),
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
      {items.map((item) => (
        <NavLink
          key={item.to + item.textKey}
          to={item.to}
          onClick={handleLinkClick}
          role="menuitem"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2.5 text-[15px] font-[400] transition-colors rounded-xl mx-1.5 ${
              isActive
                ? 'bg-[#F9FAFF] text-[#3FC2BA]'
                : 'text-[#A5A9C5] hover:bg-[#F9FAFF] hover:text-[#3FC2BA]'
            }`
          }
        >
          {t(item.textKey)}
        </NavLink>
      ))}
    </div>
  );

  return createPortal(panel, document.body);
}
