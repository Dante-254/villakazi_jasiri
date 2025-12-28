import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function GET(req: Request, context: { params: { event: string } }) {
  try {
    const { event } = context.params;
    if (!event) return NextResponse.json({ error: "Missing event parameter" }, { status: 400 });

    // Cloudinary tag lookup - return images/videos (resource_type: image|video)
    // resources_by_tag returns { resources: [...] }
    const tag = decodeURIComponent(event);

    const res = await cloudinary.api.resources_by_tag(tag, { resource_type: "all", max_results: 500 });
    const items = (res.resources || []).map((r: any) => {
      // Build a transformed URL (f_auto,q_auto,w_500) for responsive delivery
      let url: string;
      try {
        url = cloudinary.url(r.public_id, {
          resource_type: r.resource_type === "video" ? "video" : "image",
          transformation: [
            { fetch_format: "auto" },
            { quality: "auto" },
            { width: 500, crop: "scale" },
          ],
        });
      } catch (e) {
        url = r.secure_url || r.url;
      }
      return {
        public_id: r.public_id,
        secure_url: r.secure_url,
        url,
        resource_type: r.resource_type,
        width: r.width,
        height: r.height,
      };
    });

    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("Cloudinary fetch error", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
