export type Post = {
    id: number;
    message: string;
    publishedAt: string;
    likes: number;
    userId: number;
    username: string;
    user: {
        id: number;
        name: string;
        lastname: string;
        birthdate: string;
        username: string;

    };
};
