import { createServerFn } from "@tanstack/react-start";

export const GOOGLE_PLACE_ID = "ChIJfXXqe7gcGTkRfYEnBO0_5ms";
export const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;

export type GoogleReview = {
  name: string;
  author: string;
  photo?: string | undefined;
  rating: number;
  text: string;
  relative: string;
  uri?: string | undefined;
};

export type GooglePlaceReviews = {
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
};

const EMPTY: GooglePlaceReviews = { rating: null, total: null, reviews: [] };

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GooglePlaceReviews> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) {
      console.error("Google Maps connector credentials are missing");
      return EMPTY;
    }

    let response: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await fetch(
          `https://connector-gateway.lovable.dev/google_maps/places/v1/places/${GOOGLE_PLACE_ID}`,
          {
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": mapsKey,
              "X-Goog-FieldMask": "rating,userRatingCount,reviews",
            },
          },
        );
      } catch (err) {
        console.error(`Google Places network error (attempt ${attempt + 1}):`, err);
        response = null;
      }

      if (response?.ok) break;
      // Retry transient upstream failures only.
      if (response && response.status < 500) break;
      if (attempt < 2) await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }

    if (!response || !response.ok) {
      const body = response ? await response.text() : "network error";
      console.error(`Google Places request failed [${response?.status ?? 0}]: ${body}`);
      // Recoverable external-service failure: render the section without live data.
      return EMPTY;
    }


    const data = (await response.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        name?: string;
        rating?: number;
        text?: { text?: string };
        originalText?: { text?: string };
        relativePublishTimeDescription?: string;
        authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
      }>;
    };

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r, i) => ({
        name: r.name ?? `review-${i}`,
        author: r.authorAttribution?.displayName ?? "Google user",
        photo: r.authorAttribution?.photoUri,
        uri: r.authorAttribution?.uri,
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        relative: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.text.length > 0);

    return {
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      reviews,
    };
  },
);
