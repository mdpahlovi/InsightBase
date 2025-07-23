"use client";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    );

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                router.push(`/?${createQueryString("search", value)}`);
            }, 300),
        [createQueryString, router]
    );

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Icon name="SearchNormal" />
            </div>
            <Input
                placeholder="Search articles..."
                className="pl-10"
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => debouncedSearch(e.target.value)}
            />
        </div>
    );
}
