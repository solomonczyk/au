export function GoldTicker() {
  return (
    <div className="bg-surface-container-lowest border-b border-outline-variant/30 py-3 overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter flex items-center justify-center space-x-12 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-on-surface-variant">XAU/USD</span>
          <span className="font-body-md text-body-md font-bold text-on-surface">$2,042.50 /oz</span>
          <span className="flex items-center text-emerald-400 font-label-caps text-label-caps">
            <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l8 12H4z" />
            </svg>
            +0.45%
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-on-surface-variant">GOLD BARS (1oz)</span>
          <span className="font-body-md text-body-md text-on-surface">$2,104.12</span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-on-surface-variant">GOLD COINS (Eagle)</span>
          <span className="font-body-md text-body-md text-on-surface">$2,148.80</span>
        </div>
      </div>
    </div>
  );
}
