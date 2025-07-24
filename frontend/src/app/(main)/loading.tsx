import { Spinner } from "@/components/ui/spinner";

export default function ArticlesLoading() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <Spinner size={48} />
            <h3 className="font-medium mt-4 mb-1">Loading Article</h3>
            <p className="text-sm text-muted-foreground mb-5">Please wait while we load your content...</p>
        </div>
    );
}
