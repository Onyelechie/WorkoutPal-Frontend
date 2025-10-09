export interface Post {
    id: number,
    postedBy: string,
    title: string,
    caption: string,
    date: string,
    content: string,
    likes: number,
    comments: Comment[]
};