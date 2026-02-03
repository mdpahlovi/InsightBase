"use server";

import { revalidateTag } from "next/cache";

export async function revalidate(tages: string) {
    revalidateTag(tages, "max");
}
