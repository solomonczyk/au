import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { MOCK_PRODUCTS, isDbUnavailable } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        categories: { include: { category: true } },
      },
    });

    if (!product) {
      return apiError("PRODUCT_NOT_FOUND", `Product with slug '${slug}' not found`, 404);
    }

    const spot = await prisma.goldPrice.findFirst({ orderBy: { fetchedAt: "desc" } });
    const spotPrice = spot ? Number(spot.xauUsd) : 0;

    const currentPriceUsd = spotPrice * Number(product.weightTroyOz) * (1 + Number(product.markupPercent) / 100);
    const buybackPriceUsd = spotPrice * Number(product.weightTroyOz) * (1 + Number(product.buybackMarkupPct) / 100);

    const relatedProducts = await prisma.product.findMany({
      where: {
        type: product.type,
        id: { not: product.id },
        isActive: true,
      },
      take: 4,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
      },
    });

    const data = {
      id: product.id,
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      type: product.type.toLowerCase(),
      weightGrams: Number(product.weightGrams),
      weightTroyOz: Number(product.weightTroyOz),
      purityPercent: Number(product.purityPercent),
      manufacturer: product.manufacturer,
      countryOfOrigin: product.countryOfOrigin,
      year: product.year,
      currentPriceUsd: Number(currentPriceUsd.toFixed(2)),
      buybackPriceUsd: Number(buybackPriceUsd.toFixed(2)),
      markupPercent: Number(product.markupPercent),
      stockQuantity: product.stockQuantity,
      isIrsReportable: product.isIrsReportable,
      images: product.images.map((img) => ({
        url: img.url,
        altText: img.altText,
        isPrimary: img.isPrimary,
      })),
      categories: product.categories.map((pc) => pc.category.slug),
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
      relatedProducts: relatedProducts.map((rp) => ({
        id: rp.id,
        slug: rp.slug,
        name: rp.name,
        weightGrams: Number(rp.weightGrams),
        weightTroyOz: Number(rp.weightTroyOz),
        primaryImage: rp.images[0]?.url || null,
      })),
    };

    return apiSuccess(data);
  } catch (error) {
    if (isDbUnavailable(error)) {
      const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
      if (!mock) {
        return apiError("PRODUCT_NOT_FOUND", `Product with slug '${slug}' not found`, 404);
      }
      const spotPrice = 2342.15;
      const data = {
        id: mock.id,
        slug: mock.slug,
        sku: mock.sku,
        name: mock.name,
        description: mock.description,
        shortDescription: mock.shortDescription,
        type: mock.type,
        weightGrams: mock.weightGrams,
        weightTroyOz: mock.weightTroyOz,
        purityPercent: mock.purityPercent,
        manufacturer: mock.manufacturer,
        countryOfOrigin: mock.countryOfOrigin,
        year: mock.year,
        currentPriceUsd: Number((spotPrice * mock.weightTroyOz * (1 + mock.markupPercent / 100)).toFixed(2)),
        buybackPriceUsd: Number((spotPrice * mock.weightTroyOz * (1 + mock.buybackMarkupPct / 100)).toFixed(2)),
        markupPercent: mock.markupPercent,
        stockQuantity: mock.stockQuantity,
        isIrsReportable: mock.isIrsReportable,
        images: mock.images.map((img) => ({
          url: img.url,
          altText: img.altText,
          isPrimary: img.isPrimary,
        })),
        categories: mock.categories.map((c) => c.category.slug),
        metaTitle: mock.metaTitle,
        metaDescription: mock.metaDescription,
        relatedProducts: [],
      };
      return apiSuccess(data);
    }
    throw error;
  }
}
