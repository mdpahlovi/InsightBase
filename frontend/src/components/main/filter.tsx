"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import axios from "@/lib/axios";
import { Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "../ui/icon";

export default function Filter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const [availableTags, setAvailableTags] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get("/article/tags")
            .then((response) => setAvailableTags(response.data.data))
            .catch(() => setAvailableTags([]));
    }, []);

    const [tags, setTags] = useState<string[]>(searchParams.get("tags")?.split(",") || []);
    const [summary, setSummary] = useState<string>(searchParams.get("summary") || "all");

    const updateUrlWithFilters = ({ tags, summary }: { tags: string[]; summary: string }) => {
        const params = new URLSearchParams(searchParams.toString());

        if (tags.length) {
            params.set("tags", tags.join(","));
        } else {
            params.delete("tags");
        }

        if (summary !== "all") {
            params.set("summary", summary);
        } else {
            params.delete("summary");
        }

        router.push(`/?${params.toString()}`, { scroll: true });
    };

    const handleApplyFilters = () => {
        updateUrlWithFilters({ tags, summary });
        setIsOpen(false);
    };

    const handleResetFilters = () => {
        setTags([]);
        setSummary("all");
        updateUrlWithFilters({ tags: [], summary: "all" });
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Icon name="Filter" />
                    Filter
                </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader className="border-b">
                    <SheetTitle className="flex items-center gap-2">
                        <Icon name="Filter" />
                        Filter Articles
                    </SheetTitle>
                    <SheetDescription className="leading-3.5">Refine your search results using the filters below</SheetDescription>
                </SheetHeader>

                <div className="px-4 space-y-4">
                    <div className="space-y-4">
                        <Label className="flex items-center">
                            <Icon name="Tag" size={14} />
                            Tags
                        </Label>
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                            {availableTags.map((tag) => (
                                <div key={tag} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`tag-${tag}`}
                                        checked={tags.includes(tag)}
                                        onCheckedChange={() => {
                                            if (tags.includes(tag)) {
                                                setTags((prev) => prev.filter((t) => t !== tag));
                                            } else {
                                                setTags((prev) => [...prev, tag]);
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                                        {tag.replace(/(?:^|\s|[-/])\S/g, (m) => m.toUpperCase())}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                            <Sparkles className="size-3" />
                            AI Summary Status
                        </Label>
                        <RadioGroup value={summary} onValueChange={setSummary}>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="all" id="all" />
                                <Label htmlFor="all" className="cursor-pointer">
                                    All articles
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="with" id="with" />
                                <Label htmlFor="with" className="cursor-pointer">
                                    With AI summary
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="without" id="without" />
                                <Label htmlFor="without" className="cursor-pointer">
                                    Without AI summary
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                        <Button variant="outline" onClick={handleResetFilters}>
                            <Icon name="Refresh" />
                            Reset
                        </Button>
                        <Button onClick={handleApplyFilters}>Apply Filters</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
