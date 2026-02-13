import React, { useRef, useState, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsPillProps {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  /** Show animated glider under active tab */
  glider?: boolean;
}

const TabsPill: React.FC<TabsPillProps> = ({
  tabs,
  value,
  onChange,
  className = '',
  glider = true,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [gliderStyle, setGliderStyle] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = tabs.findIndex((t) => t.id === value);

  useEffect(() => {
    if (!glider || !wrapperRef.current) {
      if (glider && activeIndex < 0) setGliderStyle(null);
      return;
    }
    if (activeIndex < 0) {
      setGliderStyle(null);
      return;
    }
    const el = tabRefs.current[activeIndex];
    if (!el) return;
    const wrapper = wrapperRef.current;
    const wr = wrapper.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setGliderStyle({
      left: er.left - wr.left + wrapper.scrollLeft,
      width: er.width,
    });
  }, [activeIndex, glider, tabs.length]);

  return (
    <div
      ref={wrapperRef}
      role="tablist"
      aria-label="Tabs"
      className={`inline-flex rounded-full border border-[#E6E8F5] bg-[#F9FAFF] p-1.5 dark:border-strokedark dark:bg-white/5 ${className}`}
    >
      <div className="relative flex gap-1.5">
        {glider && gliderStyle && (
          <span
            className="pointer-events-none absolute top-0 rounded-full bg-white shadow-sm transition-all duration-200 ease-out dark:bg-white/10"
            style={{
              left: gliderStyle.left,
              width: gliderStyle.width,
              height: '100%',
              minHeight: 36,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
            aria-hidden
          />
        )}
        {tabs.map((tab, index) => {
          const isActive = value === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`relative z-10 flex h-9 min-h-[36px] shrink-0 items-center justify-center rounded-full px-4 font-medium transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FC2BA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FAFF] sm:px-[18px] ${
                !isActive ? 'hover:bg-white/60 dark:hover:bg-white/10' : ''
              }`}
              style={{
                color: isActive ? '#3FC2BA' : '#A5A9C5',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabsPill;
