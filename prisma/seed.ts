import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── 1. Admin User ──
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@aureumgold.com" },
    update: {},
    create: {
      email: "admin@aureumgold.com",
      passwordHash: adminPassword,
      name: "Admin Aureum",
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("  ✓ Admin user created");

  // ── 2. Categories ──
  const categories = [
    { slug: "bars", name: "Gold Bars" },
    { slug: "coins", name: "Gold Coins" },
    { slug: "rounds", name: "Gold Rounds" },
    { slug: "plates", name: "Gold Plates" },
  ];
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("  ✓ Categories created");

  // ── 3. Products ──
  const products = [
    {
      slug: "1oz-gold-bar-pamp-suisse",
      sku: "GB-1OZ-PAMP",
      name: "1oz Gold Bar - PAMP Suisse",
      description: "The PAMP Suisse 1oz gold bar is one of the most recognized investment-grade gold bars in the world. Featuring the iconic Lady Fortuna design, each bar comes with an assay certificate guaranteeing .9999 fine gold purity. Ideal for investors seeking liquid, globally recognized gold bullion.",
      shortDescription: "LBMA Accredited .9999 Fine Gold Bar",
      type: "BAR" as const,
      weightGrams: 31.1035,
      weightTroyOz: 1.0,
      purityPercent: 99.99,
      manufacturer: "PAMP Suisse",
      countryOfOrigin: "Switzerland",
      markupPercent: 3.5,
      buybackMarkupPct: -1.8,
      stockQuantity: 12,
      lowStockThreshold: 3,
      isActive: true,
      isFeatured: true,
      categories: ["bars"],
      images: [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbsMU5WgyDo-d7__d_g1AQ8lI4N9BLTK9LdbEVb_5n_Z4CBHFTiQ-toZKC8BeCvq1TmGHHJUP2faMaOPIHZs1cbzfu9v4J4PVefMZXSOVBgQ3lhNSjqadoGdfSybtiwjCNUU6Dbs4S6r4P4fsCswSryZe3CsyLCZ13C5r5ChDiZBiJJ7RQb8HkMC0d3Vooe9D5xiGr7O9L2Wx_t5KTEEWwAzWvvAxU7tJOOTuwG1U1_mlYf5SC4Ny0Nm-FxZN3Uob5WSS8y3xVjUzx", altText: "PAMP Suisse 1oz Gold Bar", isPrimary: true },
      ],
    },
    {
      slug: "1oz-gold-american-eagle",
      sku: "GC-1OZ-AEAGLE",
      name: "1oz Gold American Eagle",
      description: "The American Gold Eagle is the official gold bullion coin of the United States. Minted by the US Mint since 1986, it features Lady Liberty on the obverse and a family of eagles on the reverse. Struck in 22-karat gold, it is one of the most traded gold coins worldwide.",
      shortDescription: "Official US Mint Gold Bullion Coin",
      type: "COIN" as const,
      weightGrams: 31.1035,
      weightTroyOz: 1.0,
      purityPercent: 91.67,
      manufacturer: "US Mint",
      countryOfOrigin: "USA",
      markupPercent: 4.5,
      buybackMarkupPct: -2.0,
      stockQuantity: 25,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: true,
      categories: ["coins"],
      images: [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuALQBoOsqmWUrZm68uup_OH0r6_8HKiibpqtZ5cFhc6fOiMCt7r-3pNt8tLR9LXWWi9Dh-V03_3nXWgHf9SFUgkZncmpOBu28qxUEPf6LWMSmfiLg_f8rY1lles0K53Q24MTyHbkhvHj7pYVK3-roOej1y8dsOwJbgApNIBYOwV0xrwGmtEsnANWYPVlLTP6EfA06-LOp_wOyzCEdSL5s7VSuKMMPielOBncucL2u0k6j7JkRWPz_YxCS1BujtymVzMylVQg7vQ5Jv3", altText: "Gold American Eagle Coin", isPrimary: true },
      ],
    },
    {
      slug: "1kg-gold-cast-bar-heraeus",
      sku: "GB-1KG-HERAEUS",
      name: "1kg Gold Cast Bar - Heraeus",
      description: "The Heraeus 1kg gold cast bar represents the pinnacle of institutional-grade gold investment. As an LBMA Good Delivery refiner, Heraeus guarantees the highest standard of purity and quality. This bar is ideal for serious investors seeking substantial wealth preservation.",
      shortDescription: "Institutional Grade 1kg Gold Bar",
      type: "BAR" as const,
      weightGrams: 1000,
      weightTroyOz: 32.1507,
      purityPercent: 99.99,
      manufacturer: "Heraeus",
      countryOfOrigin: "Germany",
      markupPercent: 1.5,
      buybackMarkupPct: -2.5,
      stockQuantity: 5,
      lowStockThreshold: 2,
      isActive: true,
      isFeatured: false,
      categories: ["bars"],
      images: [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeZzKxZHij4ZLbV4_TavGs5GTrtzkWveR-tK87N08McacO9zkcmH2qZ2jQFSOL8UgK8wK3-6ogFebEbRQfOyrlbjvL8qneJFDzt8z3dFPWZK_ZvAequpSbZgX8GLk7fTLWvXIdqg24sEeaihCsQNoHPNbyNpThKt6aNJxu2T5GDEZVjQ1xsS0KPsBZU-Zpi-pEXK4-l0bFiYU4QPJiekBv7IdCE8pIs9fhn-6VTF_Wj9abH9IagSMB9tfZvYltzm9uXY4Vhf6KC0_4", altText: "Heraeus 1kg Gold Cast Bar", isPrimary: true },
      ],
    },
    {
      slug: "1oz-south-african-krugerrand",
      sku: "GC-1OZ-KRUGER",
      name: "1oz South African Krugerrand",
      description: "The Krugerrand is the world's first modern gold bullion coin, first minted in 1967. It remains one of the most widely held and traded gold coins globally. Featuring Paul Kruger on the obverse and the iconic Springbok antelope on the reverse, it is instantly recognizable to dealers worldwide.",
      shortDescription: "World's First Modern Gold Bullion Coin",
      type: "COIN" as const,
      weightGrams: 31.1035,
      weightTroyOz: 1.0,
      purityPercent: 91.67,
      manufacturer: "South African Mint",
      countryOfOrigin: "South Africa",
      markupPercent: 3.8,
      buybackMarkupPct: -1.5,
      stockQuantity: 18,
      lowStockThreshold: 4,
      isActive: true,
      isFeatured: false,
      categories: ["coins"],
      images: [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaPtRRWIlCd3FsF2rCdz-zKzqsEGaE-B-kDWyGjGH7QkOPgKarfLYhR_jrJqMFiTsrYgrkX4EEyxeBAvvNAPtltJUhDAh0m1JKXI9uW27sbxQAqbzf9K_msx0z4Eae1r5wJqm_rzPRvH82CC6jPbz_IalGS7S2pDSK7xOLutSOlPO9wt2NA2CuIg56INoEiAcBquW1S8SWnUPecoD_NC25Z7JEmHoTf98FL3ArxUrYDWYsDmqMqn7Mh4js7s-141QwsSUu9j60-3Wb", altText: "Krugerrand Gold Coin", isPrimary: true },
      ],
    },
    {
      slug: "1oz-gold-canadian-maple-leaf",
      sku: "GC-1OZ-MAPLE",
      name: "1oz Gold Canadian Maple Leaf",
      description: "The Canadian Gold Maple Leaf is renowned for its exceptional purity of .9999 fine gold. Minted by the Royal Canadian Mint, it features a detailed portrait of King Charles III and Canada's iconic maple leaf. Advanced security features include a micro-engraved radial line pattern.",
      shortDescription: ".9999 Pure Gold Coin from Royal Canadian Mint",
      type: "COIN" as const,
      weightGrams: 31.1035,
      weightTroyOz: 1.0,
      purityPercent: 99.99,
      manufacturer: "Royal Canadian Mint",
      countryOfOrigin: "Canada",
      markupPercent: 3.6,
      buybackMarkupPct: -1.8,
      stockQuantity: 20,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: false,
      categories: ["coins"],
      images: [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPtAlUZLQuCKCsXMh1PrkWq2LgOJ2QPazixmMwyJtZnLIbNL3xkZRIsNqVKJl_xi-BBVYAn3PP_sCunOfFZJkkIB2itOTkxb_ND1nN0Q4t5hGV2TD3FmZ5sGaW_46fCgRDZkrZNadZXYeUpzjkLo97DanNQntUf7F_aGzFAgRpJ7NlKtM1B86GgVBkEh84GS44fenASPdDxhR4YX4MzhM7DUfWmIxwxeQNDFYSJo2_1Ud2lFbnLIkcztxFHL52aGphjpjWXx6xvbfU", altText: "Canadian Maple Leaf Coin", isPrimary: true },
      ],
    },
    {
      slug: "10oz-gold-bar-valcambi-suisse",
      sku: "GB-10OZ-VALCAMBI",
      name: "10oz Gold Bar - Valcambi Suisse",
      description: "The Valcambi Suisse 10oz gold bar combines substantial weight with excellent liquidity. As one of the world's most prestigious refiners, Valcambi produces bars of exceptional quality with crisp edges and fine detail. The 10oz size offers a cost-effective premium compared to 1oz bars while remaining easily tradable.",
      shortDescription: "Premium 10oz Gold Bar from Valcambi",
      type: "BAR" as const,
      weightGrams: 311.035,
      weightTroyOz: 10.0,
      purityPercent: 99.99,
      manufacturer: "Valcambi Suisse",
      countryOfOrigin: "Switzerland",
      markupPercent: 2.2,
      buybackMarkupPct: -2.0,
      stockQuantity: 8,
      lowStockThreshold: 2,
      isActive: true,
      isFeatured: true,
      categories: ["bars"],
      images: [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkRKW1ld2X-YKW8hQ8ujybhJ_rLIl3BwavUC2J2QEQpTokxLVhQBmlW1_JDaFKyGi9g0H1tJhlnargp6vwPjkmrQ79eur2UiqpOAyTzU4d494V1_99OuAcCvTheO-Um4GWs57KGcwgc5V2P0ZGRaQkKk93NjQOW_zmM0KGW6tLhe7vYMTPCMQPx-9LtarkAlqHqU9WixhAZ76kFD7Y5w3EfEErR9BJhAvrLdwO8cs7yLBgwqfhz1q_7gwk8q_VlB-2UYH7aTxH2Uy8", altText: "Valcambi 10oz Gold Bar", isPrimary: true },
      ],
    },
  ];

  for (const product of products) {
    const { categories: catSlugs, images, ...productData } = product;

    const created = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    });

    // Link categories
    for (const slug of catSlugs) {
      const category = await prisma.category.findUnique({ where: { slug } });
      if (category) {
        await prisma.productCategory.upsert({
          where: { productId_categoryId: { productId: created.id, categoryId: category.id } },
          update: {},
          create: { productId: created.id, categoryId: category.id },
        });
      }
    }

    // Create images
    for (const img of images) {
      await prisma.productImage.create({
        data: { ...img, productId: created.id },
      });
    }
  }
  console.log(`  ✓ ${products.length} products created`);

  // ── 4. State Tax Rules ──
  const taxRules = [
    // Full exemption states for precious metals
    { stateCode: "TX", stateName: "Texas", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Precious metals exempt" },
    { stateCode: "NY", stateName: "New York", isExempt: true, taxRate: null, minThresholdUsd: 1000, notes: "Exempt over $1,000" },
    { stateCode: "CA", stateName: "California", isExempt: false, taxRate: 0.0725, minThresholdUsd: null, notes: "Fully taxable" },
    { stateCode: "FL", stateName: "Florida", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Exempt since Aug 2025" },
    { stateCode: "DE", stateName: "Delaware", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "No sales tax state" },
    { stateCode: "AK", stateName: "Alaska", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "No sales tax state" },
    { stateCode: "MT", stateName: "Montana", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "No sales tax state" },
    { stateCode: "NH", stateName: "New Hampshire", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "No sales tax state" },
    { stateCode: "OR", stateName: "Oregon", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "No sales tax state" },
    { stateCode: "AZ", stateName: "Arizona", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Precious metals exempt" },
    { stateCode: "CO", stateName: "Colorado", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Precious metals exempt" },
    { stateCode: "GA", stateName: "Georgia", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Precious metals exempt" },
    { stateCode: "IL", stateName: "Illinois", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Precious metals exempt" },
    { stateCode: "PA", stateName: "Pennsylvania", isExempt: true, taxRate: null, minThresholdUsd: null, notes: "Precious metals exempt" },
    { stateCode: "WA", stateName: "Washington", isExempt: false, taxRate: 0.065, minThresholdUsd: null, notes: "Taxable since Jan 2026" },
    { stateCode: "HI", stateName: "Hawaii", isExempt: false, taxRate: 0.04, minThresholdUsd: null, notes: "4% taxable" },
    { stateCode: "ME", stateName: "Maine", isExempt: false, taxRate: 0.055, minThresholdUsd: null, notes: "5.5% taxable" },
    { stateCode: "MD", stateName: "Maryland", isExempt: false, taxRate: 0.06, minThresholdUsd: null, notes: "6% since Jul 2025" },
    { stateCode: "VT", stateName: "Vermont", isExempt: false, taxRate: 0.06, minThresholdUsd: null, notes: "~6% taxable" },
    { stateCode: "NM", stateName: "New Mexico", isExempt: false, taxRate: 0.05125, minThresholdUsd: null, notes: "5.125% - 8.8% taxable" },
    { stateCode: "DC", stateName: "District of Columbia", isExempt: false, taxRate: 0.06, minThresholdUsd: null, notes: "6% taxable" },
  ];

  for (const rule of taxRules) {
    await prisma.stateTaxRule.upsert({
      where: { stateCode: rule.stateCode },
      update: {},
      create: {
        ...rule,
        effectiveDate: new Date("2026-01-01"),
      },
    });
  }
  console.log(`  ✓ ${taxRules.length} state tax rules created`);

  // ── 5. FAQ Items ──
  const faqs = [
    { question: "How do I buy gold from Aureum?", answer: "Simply browse our catalog, select your desired bars or coins, and proceed to checkout. You can create an account during checkout or continue as a guest. We offer multiple payment methods including bank wire and card.", category: "buying", sortOrder: 1 },
    { question: "Is my gold insured during shipping?", answer: "Yes, every shipment is fully insured from the moment it leaves our vault until it reaches your door. Coverage is included in the shipping cost.", category: "shipping", sortOrder: 2 },
    { question: "What purity are your gold bars?", answer: "All our gold bars are .9999 fine (99.99% pure), sourced exclusively from LBMA Good Delivery refiners.", category: "products", sortOrder: 3 },
    { question: "How is the price determined?", answer: "Our prices are based on the real-time LBMA spot price of gold, plus a premium that covers refining, minting, logistics, and our margin.", category: "pricing", sortOrder: 4 },
    { question: "Can I store my gold with Aureum?", answer: "Yes, we offer institutional-grade vaulting solutions through our partner vaults. Your gold is fully allocated, insured, and audited regularly.", category: "storage", sortOrder: 5 },
    { question: "What is your return policy?", answer: "We accept returns within 14 days of delivery for products in their original condition. A restocking fee may apply.", category: "returns", sortOrder: 6 },
    { question: "Do you ship internationally?", answer: "Currently we ship within the United States including all 50 states. International shipping may be available for qualifying orders.", category: "shipping", sortOrder: 7 },
    { question: "What payment methods do you accept?", answer: "We accept bank wire transfers, credit/debit cards (via Stripe), and ACH transfers. Cash payments are accepted for in-person pickup only.", category: "payment", sortOrder: 8 },
    { question: "Is gold a good investment?", answer: "Gold has historically served as a hedge against inflation and economic uncertainty. However, past performance does not guarantee future results.", category: "investing", sortOrder: 9 },
    { question: "How do I sell gold back to Aureum?", answer: "You can request a sell quote through our Sell page. We'll provide a competitive buyback price based on current spot rates and the condition of your items.", category: "selling", sortOrder: 10 },
  ];

  for (const faq of faqs) {
    await prisma.faqItem.create({ data: faq });
  }
  console.log(`  ✓ ${faqs.length} FAQ items created`);

  // ── 6. Initial GoldPrice ──
  await prisma.goldPrice.create({
    data: {
      xauUsd: 2342.15,
      xagUsd: 27.45,
      source: "seed",
    },
  });
  console.log("  ✓ Initial gold price recorded");

  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
