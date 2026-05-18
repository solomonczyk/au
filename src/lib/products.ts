export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: "bar" | "coin";
  weight_grams: number;
  weight_oz: number;
  purity: string;
  manufacturer: string;
  price: number;
  premium: number;
  inStock: boolean;
  images: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "1oz-gold-bar-pamp-suisse",
    name: "1oz Gold Bar - PAMP Suisse",
    description:
      "The PAMP Suisse 1oz gold bar is one of the most recognized investment-grade gold bars in the world. Featuring the iconic Lady Fortuna design, each bar comes with an assay certificate guaranteeing .9999 fine gold purity. Ideal for investors seeking liquid, globally recognized gold bullion.",
    type: "bar",
    weight_grams: 31.1,
    weight_oz: 1,
    purity: "99.99%",
    manufacturer: "PAMP Suisse",
    price: 2342.15,
    premium: 2.5,
    inStock: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbsMU5WgyDo-d7__d_g1AQ8lI4N9BLTK9LdbEVb_5n_Z4CBHFTiQ-toZKC8BeCvq1TmGHHJUP2faMaOPIHZs1cbzfu9v4J4PVefMZXSOVBgQ3lhNSjqadoGdfSybtiwjCNUU6Dbs4S6r4P4fsCswSryZe3CsyLCZ13C5r5ChDiZBiJJ7RQb8HkMC0d3Vooe9D5xiGr7O9L2Wx_t5KTEEWwAzWvvAxU7tJOOTuwG1U1_mlYf5SC4Ny0Nm-FxZN3Uob5WSS8y3xVjUzx",
    ],
    features: ["LBMA Accredited", "Assay Certificate Included", "Fully Insured Shipping"],
  },
  {
    id: "2",
    slug: "1oz-gold-american-eagle",
    name: "1oz Gold American Eagle",
    description:
      "The American Gold Eagle is the official gold bullion coin of the United States. Minted by the US Mint since 1986, it features Lady Liberty on the obverse and a family of eagles on the reverse. Struck in 22-karat gold, it is one of the most traded gold coins worldwide.",
    type: "coin",
    weight_grams: 31.1,
    weight_oz: 1,
    purity: "91.67% (22K)",
    manufacturer: "US Mint",
    price: 2415.8,
    premium: 3.8,
    inStock: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALQBoOsqmWUrZm68uup_OH0r6_8HKiibpqtZ5cFhc6fOiMCt7r-3pNt8tLR9LXWWi9Dh-V03_3nXWgHf9SFUgkZncmpOBu28qxUEPf6LWMSmfiLg_f8rY1lles0K53Q24MTyHbkhvHj7pYVK3-roOej1y8dsOwJbgApNIBYOwV0xrwGmtEsnANWYPVlLTP6EfA06-LOp_wOyzCEdSL5s7VSuKMMPielOBncucL2u0k6j7JkRWPz_YxCS1BujtymVzMylVQg7vQ5Jv3",
    ],
    features: ["US Legal Tender", "IRA Eligible", "Highly Liquid"],
  },
  {
    id: "3",
    slug: "1kg-gold-cast-bar-heraeus",
    name: "1kg Gold Cast Bar - Heraeus",
    description:
      "The Heraeus 1kg gold cast bar represents the pinnacle of institutional-grade gold investment. As an LBMA Good Delivery refiner, Heraeus guarantees the highest standard of purity and quality. This bar is ideal for serious investors seeking substantial wealth preservation.",
    type: "bar",
    weight_grams: 1000,
    weight_oz: 32.15,
    purity: "99.99%",
    manufacturer: "Heraeus",
    price: 75280.0,
    premium: 1.2,
    inStock: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeZzKxZHij4ZLbV4_TavGs5GTrtzkWveR-tK87N08McacO9zkcmH2qZ2jQFSOL8UgK8wK3-6ogFebEbRQfOyrlbjvL8qneJFDzt8z3dFPWZK_ZvAequpSbZgX8GLk7fTLWvXIdqg24sEeaihCsQNoHPNbyNpThKt6aNJxu2T5GDEZVjQ1xsS0KPsBZU-Zpi-pEXK4-l0bFiYU4QPJiekBv7IdCE8pIs9fhn-6VTF_Wj9abH9IagSMB9tfZvYltzm9uXY4Vhf6KC0_4",
    ],
    features: ["LBMA Good Delivery", "Institutional Grade", "Tax Efficient"],
  },
  {
    id: "4",
    slug: "1oz-south-african-krugerrand",
    name: "1oz South African Krugerrand",
    description:
      "The Krugerrand is the world's first modern gold bullion coin, first minted in 1967. It remains one of the most widely held and traded gold coins globally. Featuring Paul Kruger on the obverse and the iconic Springbok antelope on the reverse, it is instantly recognizable to dealers worldwide.",
    type: "coin",
    weight_grams: 31.1,
    weight_oz: 1,
    purity: "91.67% (22K)",
    manufacturer: "South African Mint",
    price: 2389.4,
    premium: 3.2,
    inStock: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaPtRRWIlCd3FsF2rCdz-zKzqsEGaE-B-kDWyGjGH7QkOPgKarfLYhR_jrJqMFiTsrYgrkX4EEyxeBAvvNAPtltJUhDAh0m1JKXI9uW27sbxQAqbzf9K_msx0z4Eae1r5wJqm_rzPRvH82CC6jPbz_IalGS7S2pDSK7xOLutSOlPO9wt2NA2CuIg56INoEiAcBquW1S8SWnUPecoD_NC25Z7JEmHoTf98FL3ArxUrYDWYsDmqMqn7Mh4js7s-141QwsSUu9j60-3Wb",
    ],
    features: ["Globally Recognized", "High Liquidity", "Easy to Trade"],
  },
  {
    id: "5",
    slug: "1oz-gold-canadian-maple-leaf",
    name: "1oz Gold Canadian Maple Leaf",
    description:
      "The Canadian Gold Maple Leaf is renowned for its exceptional purity of .9999 fine gold — one of the highest purity gold coins in the world. Minted by the Royal Canadian Mint, it features a detailed portrait of Queen Elizabeth II and Canada's iconic maple leaf. Advanced security features include a micro-engraved radial line pattern.",
    type: "coin",
    weight_grams: 31.1,
    weight_oz: 1,
    purity: "99.99%",
    manufacturer: "Royal Canadian Mint",
    price: 2398.1,
    premium: 3.1,
    inStock: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPtAlUZLQuCKCsXMh1PrkWq2LgOJ2QPazixmMwyJtZnLIbNL3xkZRIsNqVKJl_xi-BBVYAn3PP_sCunOfFZJkkIB2itOTkxb_ND1nN0Q4t5hGV2TD3FmZ5sGaW_46fCgRDZkrZNadZXYeUpzjkLo97DanNQntUf7F_aGzFAgRpJ7NlKtM1B86GgVBkEh84GS44fenASPdDxhR4YX4MzhM7DUfWmIxwxeQNDFYSJo2_1Ud2lFbnLIkcztxFHL52aGphjpjWXx6xvbfU",
    ],
    features: [".9999 Pure Gold", "Advanced Security", "Royal Canadian Mint"],
  },
  {
    id: "6",
    slug: "10oz-gold-bar-valcambi-suisse",
    name: "10oz Gold Bar - Valcambi Suisse",
    description:
      "The Valcambi Suisse 10oz gold bar combines substantial weight with excellent liquidity. As one of the world's most prestigious refiners, Valcambi produces bars of exceptional quality with crisp edges and fine detail. The 10oz size offers a cost-effective premium compared to 1oz bars while remaining easily tradable.",
    type: "bar",
    weight_grams: 311,
    weight_oz: 10,
    purity: "99.99%",
    manufacturer: "Valcambi Suisse",
    price: 23285.0,
    premium: 1.8,
    inStock: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkRKW1ld2X-YKW8hQ8ujybhJ_rLIl3BwavUC2J2QEQpTokxLVhQBmlW1_JDaFKyGi9g0H1tJhlnargp6vwPjkmrQ79eur2UiqpOAyTzU4d494V1_99OuAcCvTheO-Um4GWs57KGcwgc5V2P0ZGRaQkKk93NjQOW_zmM0KGW6tLhe7vYMTPCMQPx-9LtarkAlqHqU9WixhAZ76kFD7Y5w3EfEErR9BJhAvrLdwO8cs7yLBgwqfhz1q_7gwk8q_VlB-2UYH7aTxH2Uy8",
    ],
    features: ["LBMA Accredited", "Competitive Premium", "Valcambi Quality"],
  },
];
