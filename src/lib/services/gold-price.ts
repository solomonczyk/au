import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";

interface NfusionResponse {
  metal: string;
  currency: string;
  currentPrice: number;
  previousClosePrice: number;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  timestamp: string;
}

export async function fetchGoldPriceFromNfusion(): Promise<{
  xauUsd: number;
  change: number;
  changePct: number;
} | null> {
  if (!env.NFUSION_API_KEY) {
    console.log("[GoldPrice] No NFUSION_API_KEY configured, using mock data");
    return null;
  }

  try {
    const url = `https://api.nfusionsolutions.biz/api/v1/Metals/spot/summary?metals=gold&currency=USD&format=json&token=${env.NFUSION_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error("nFusion API error:", res.status, await res.text());
      return null;
    }

    const data: NfusionResponse[] = await res.json();
    const gold = data[0];
    if (!gold) return null;

    return {
      xauUsd: gold.currentPrice,
      change: gold.currentPrice - gold.previousClosePrice,
      changePct: gold.percentChange,
    };
  } catch (error) {
    console.error("Failed to fetch gold price:", error);
    return null;
  }
}

export async function updateGoldPriceInDb(): Promise<{ xauUsd: number } | null> {
  const fetched = await fetchGoldPriceFromNfusion();

  if (fetched) {
    await prisma.goldPrice.create({
      data: {
        xauUsd: fetched.xauUsd,
        source: "nfusion",
      },
    });

    // Clean old prices (keep last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await prisma.goldPrice.deleteMany({
      where: { fetchedAt: { lt: thirtyDaysAgo } },
    });

    return { xauUsd: fetched.xauUsd };
  }

  // Fallback: get the latest known price
  const latest = await prisma.goldPrice.findFirst({
    orderBy: { fetchedAt: "desc" },
  });

  return latest ? { xauUsd: Number(latest.xauUsd) } : null;
}

export async function getLatestGoldPrice(): Promise<{
  xauUsd: number;
  changeUsd: number;
  changePct: number;
  direction: "up" | "down" | "flat";
  fetchedAt: string;
  source: string;
}> {
  const latest = await prisma.goldPrice.findFirst({
    orderBy: { fetchedAt: "desc" },
  });

  if (!latest) {
    return {
      xauUsd: 2342.15,
      changeUsd: 0,
      changePct: 0,
      direction: "flat",
      fetchedAt: new Date().toISOString(),
      source: "default",
    };
  }

  // Get previous price for change calculation
  const previous = await prisma.goldPrice.findFirst({
    where: { id: { not: latest.id } },
    orderBy: { fetchedAt: "desc" },
  });

  const currentPrice = Number(latest.xauUsd);
  const previousPrice = previous ? Number(previous.xauUsd) : currentPrice;
  const changeUsd = currentPrice - previousPrice;
  const changePct = previousPrice > 0 ? (changeUsd / previousPrice) * 100 : 0;

  return {
    xauUsd: currentPrice,
    changeUsd: Number(changeUsd.toFixed(2)),
    changePct: Number(changePct.toFixed(2)),
    direction: changeUsd > 0 ? "up" : changeUsd < 0 ? "down" : "flat",
    fetchedAt: latest.fetchedAt.toISOString(),
    source: latest.source,
  };
}

export async function getPriceHistory(period: string) {
  const now = new Date();
  const periods: Record<string, Date> = {
    "1d": new Date(now.getTime() - 24 * 60 * 60 * 1000),
    "1w": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    "1m": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    "6m": new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000),
    "1y": new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
    "5y": new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000),
  };

  const since = periods[period] || periods["1m"];

  const prices = await prisma.goldPrice.findMany({
    where: { fetchedAt: { gte: since } },
    orderBy: { fetchedAt: "asc" },
    select: { xauUsd: true, fetchedAt: true },
  });

  const points = prices.map((p) => ({
    timestamp: p.fetchedAt.toISOString(),
    xauUsd: Number(p.xauUsd),
  }));

  const values = points.map((p) => p.xauUsd);
  const stats = {
    min: values.length ? Math.min(...values) : 0,
    max: values.length ? Math.max(...values) : 0,
    avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0,
  };

  return { period, points, stats };
}
