import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-section-padding-sm">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-gutter lg:gap-12">
        <div className="col-span-2 md:col-span-1 space-y-6">
          <span className="font-display text-display-lg leading-none text-primary">AUREUM GOLD</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Premium precious metals trading for the discerning investor. Based in NYC, shipping
            nationwide.
          </p>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-on-surface mb-6">Products</h5>
          <ul className="space-y-4">
            <li>
              <Link
                href="/catalog?type=bars"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                Gold Bars
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?type=coins"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                Gold Coins
              </Link>
            </li>
            <li>
              <Link
                href="/sell"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                Sell Gold
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-on-surface mb-6">Resources</h5>
          <ul className="space-y-4">
            <li>
              <Link
                href="/about"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-on-surface mb-6">Legal</h5>
          <ul className="space-y-4">
            <li>
              <Link
                href="/legal/terms"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/legal/privacy"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter mt-16 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          &copy; 2024 Aureum Gold. US-Based Precious Metals Service. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
