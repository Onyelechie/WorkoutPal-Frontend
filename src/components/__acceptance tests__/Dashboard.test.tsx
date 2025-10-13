import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as postsHook from '../../hooks/usePosts';

import Dashboard from '../Dashboard/Dashboard';


const post = {
		"id" : 1,
		"postedBy" : 'bigworkoutman',
		"title" : 'Big Workout',
		"caption" : 'Bigger gains',
		"date" : '01/01/0001',
		"content" : 'https://some-cdn-link.com',
		"likes" : 100320234,
		"comments": []
	}

const listPosts = [post];

vi.mock('../../../hooks/usePosts');


beforeEach(() => {
    vi.resetAllMocks();
    // mock custom hook 
    vi.spyOn(postsHook, 'usePosts').mockReturnValue({
        posts: [],
        isLoading: false,
        error: null,
        fetchPosts: vi.fn(),
    });
});

describe('Dashboard', () => {

    it('renders the create post button', () => {
        render(<Dashboard />);
        const btn = screen.getByRole('button', { name: /create post/i });
        expect(btn).toBeInTheDocument();
     
    });

    it("must render no posts", () => {
        
        render(<Dashboard />);
        
        expect(screen.getByText(/there are currently no posts.../i)).toBeInTheDocument();

    });

    it("must render the required details of a post", () => {

        // mock usePost to return 1 post
        vi.spyOn(postsHook, 'usePosts').mockReturnValue({
            posts: listPosts,
            isLoading: false,
            error: null,
            fetchPosts: vi.fn(),
        })

        render(<Dashboard />);

        // author, title, caption, date must show
        expect(screen.getByText(post.postedBy)).toBeInTheDocument();
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.caption)).toBeInTheDocument();
        expect(screen.getByText(post.date)).toBeInTheDocument();
        expect(screen.getByText(post.likes + " Likes")).toBeInTheDocument();



    });


});