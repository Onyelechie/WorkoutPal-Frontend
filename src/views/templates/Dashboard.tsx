import { useEffect, useState } from "react";
import { getRequest } from "../../utils/RequestUtils";
import { notYetImplemented } from "../../utils/ViewUtils";

import '../../styles/templates/dashboard.css';

export default function Dashboard() {

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        fetchPosts(); // initialize lists of posts on load
    }, []);

    async function fetchPosts() {
        try {
            const response = await getRequest('/mock/posts');
            setPosts(response);
        } catch (error) {
            console.log("An error occured");
            console.log(error);
        }
    };

    return (
    <>
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard</h1>

            <div className="dashboard-action-buttons">
                <button onClick={notYetImplemented}>Create Post</button>
            </div>

            {posts.map((post) => (
                <div key={post.id} className="post-card" onClick={notYetImplemented}>
                    <div className="post-header">
                        <span>{post.postedBy}</span>
                        <span>{post.date}</span>
                    </div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-caption">{post.caption}</div>
                    <div className="post-footer">
                        <span className="post-likes post-clickable" onClick={notYetImplemented}>{post.likes} Likes</span>
                        <span className="post-comments post-clickable" onClick={notYetImplemented}>{post.comments.length} Comment(s)</span>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
};