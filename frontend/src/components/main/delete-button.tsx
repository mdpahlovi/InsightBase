"use client";

import { revalidate } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import axios from "@/lib/axios";
import { useAuthState } from "@/stores/useAuthStore";
import { Article } from "@/type";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteButton({ article }: { article: Article }) {
    const { user } = useAuthState();
    const [isDeleting, setIsDeleting] = useState(false);

    if (user?.id === article.userId) {
        return (
            <Button
                variant="denger"
                size="sm"
                onClick={() => {
                    setIsDeleting(true);
                    axios
                        .delete(`/article/${article.id}`)
                        .then((res) => {
                            revalidate("articles");
                            toast.success(res.data.message);
                        })
                        .catch((error) => toast.error(error?.message))
                        .finally(() => setIsDeleting(false));
                }}
                disabled={isDeleting}
            >
                {isDeleting ? <Spinner /> : <Icon name="Trash" />}
            </Button>
        );
    } else {
        return null;
    }
}
