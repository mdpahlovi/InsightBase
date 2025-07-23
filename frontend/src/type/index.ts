export type Article = {
    id: string;
    title: string;
    body: string;
    tags: string[];
    summary: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
