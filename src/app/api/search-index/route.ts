import { getSearchIndex } from "@/lib/search";

/**
 * সার্চ ইনডেক্স — পাঠের কনটেন্ট থেকে বিল্ড-টাইমে স্বয়ংক্রিয়ভাবে তৈরি হয়।
 * force-static: বিল্ডে একবার JSON হয়ে স্ট্যাটিক ফাইলের মতোই সার্ভ হয়,
 * তাই প্রতি সার্চে সার্ভারে কোনো হিসাব চলে না।
 */
export const dynamic = "force-static";

export async function GET() {
  const { index, docs } = getSearchIndex();

  return Response.json({
    index: index.toJSON(),
    docs: docs.map((d) => ({
      id: d.id,
      lessonId: d.lessonId,
      title: d.title,
      subtitle: d.subtitle,
      sectionTitle: d.sectionTitle,
      headingId: d.headingId,
      body: d.body,
    })),
  });
}
