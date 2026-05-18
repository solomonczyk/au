export const metadata = {
  title: "Contact Us | AUREUM GOLD",
  description: "Get in touch with our team. Phone, email, or visit our office.",
};

export default function ContactPage() {
  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg">
      <header className="mb-section-padding-sm border-l-2 border-primary pl-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Contact Us</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Our dedicated team is available to assist with your bullion acquisition or liquidation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                First Name
              </label>
              <input
                type="text"
                className="bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                Last Name
              </label>
              <input
                type="text"
                className="bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Email</label>
            <input
              type="email"
              className="bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Message</label>
            <textarea
              rows={6}
              className="bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors resize-none"
              placeholder="How can we help you?"
            />
          </div>
          <button className="bg-primary-container text-on-primary-container py-4 px-8 font-label-caps text-label-caps hover:bg-primary transition-all uppercase tracking-widest">
            Send Message
          </button>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">
          {[
            {
              icon: "location_on",
              title: "Office",
              lines: ["One World Trade Center", "85th Floor", "New York, NY 10007"],
            },
            {
              icon: "call",
              title: "Phone",
              lines: ["+1 (212) 555-0189", "Mon–Fri, 9:00 AM – 6:00 PM EST"],
            },
            {
              icon: "mail",
              title: "Email",
              lines: ["concierge@aureumgold.com", "We respond within 2 hours"],
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-6">
              <span className="material-symbols-outlined text-primary text-[32px]">
                {item.icon}
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                  {item.title}
                </h3>
                {item.lines.map((line) => (
                  <p key={line} className="font-body-md text-body-md text-on-surface-variant">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
