import { HttpTypes } from "@medusajs/types";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "kh";

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
};

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: ["regions"],
      },
    }).then((res) => res.json());

    if (!regions?.length) {
      notFound();
    }

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region);
      });
    });

    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode;
    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase();
    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode;
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode;
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION;
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value;
    }

    return countryCode;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error getting the country code.");
    }
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Aggiungi gli header CORS
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Gestisci le richieste OPTIONS
  if (request.method === "OPTIONS") {
    return response;
  }

  const searchParams = request.nextUrl.searchParams;
  const isOnboarding = searchParams.get("onboarding") === "true";
  const cartId = searchParams.get("cart_id");
  const checkoutStep = searchParams.get("step");
  const onboardingCookie = request.cookies.get("_medusa_onboarding");
  const cartIdCookie = request.cookies.get("_medusa_cart_id");

  const regionMap = await getRegionMap();
  const countryCode = regionMap && (await getCountryCode(request, regionMap));

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode);

  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return response;
  }

  let redirectUrl = request.nextUrl.href;
  let finalResponse = NextResponse.redirect(redirectUrl, 307);

  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${request.nextUrl.pathname}${request.nextUrl.search}`;
    finalResponse = NextResponse.redirect(`${redirectUrl}`, 307);
  }

  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`;
    finalResponse = NextResponse.redirect(`${redirectUrl}`, 307);
    finalResponse.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 });
  }

  if (isOnboarding) {
    finalResponse.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 });
  }

  return finalResponse;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Beer-can.gltf|Beer-can.bin|images/).*)"],
};
