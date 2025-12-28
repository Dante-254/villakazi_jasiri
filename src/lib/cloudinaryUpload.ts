import cloudinary from "./cloudinary";

export async function uploadMedia(source: string | Buffer, eventName: string, opts: { public_id?: string } = {}) {
  const folder = `events/${eventName}`;
  const tags = [eventName];
  try {
    const res = await cloudinary.uploader.upload(source as any, {
      resource_type: "auto",
      folder,
      tags,
      public_id: opts.public_id,
      use_filename: true,
      unique_filename: false,
    });
    return res;
  } catch (err) {
    throw err;
  }
}
