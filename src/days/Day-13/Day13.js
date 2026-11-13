
import { useState, useOptimistic, useTransition } from "react";

const initialPosts = [
  {
    id: 1,
    username: "Jasper_developer",
    avatar: "👨‍💻",
    time: "2 hours ago",
    content:
      "Just completed my React project! Learning something new every day makes coding exciting. 🚀",
    likes: 24,
    liked: false,
    comments: [
      { id: 101, username: "john", text: "Amazing work! 🔥" },
      { id: 102, username: "sarah", text: "Keep going!" },
    ],
  },
  {
    id: 2,
    username: "sarah_design",
    avatar: "👩‍🎨",
    time: "4 hours ago",
    content:
      "Beautiful UI design is not just about colors. It's about creating a great user experience. ✨",
    likes: 42,
    liked: true,
    comments: [
      { id: 201, username: "alex", text: "Totally agree!" },
    ],
  },
  {
    id: 3,
    username: "john_coder",
    avatar: "🧑‍💻",
    time: "Yesterday",
    content:
      "Working with React 19 and exploring the useOptimistic hook. Optimistic UI makes applications feel faster! 💡",
    likes: 15,
    liked: false,
    comments: [],
  },
];

// Simulate an API/server delay
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Update posts based on an optimistic action
function postsReducer(currentPosts, action) {
  return currentPosts.map((post) => {
    if (post.id !== action.postId) return post;

    if (action.type === "LIKE") {
      return {
        ...post,
        liked: !post.liked,
        likes: post.likes + (post.liked ? -1 : 1),
      };
    }

    if (action.type === "COMMENT") {
      return {
        ...post,
        comments: [...post.comments, action.comment],
      };
    }

    return post;
  });
}

function Day13() {
  // Actual state (server-confirmed data in this demo)
  const [posts, setPosts] = useState(initialPosts);

  // Input state for comments
  const [commentInputs, setCommentInputs] = useState({});

  // React 19 optimistic state
  const [optimisticPosts, addOptimistic] = useOptimistic(
    posts,
    postsReducer
  );

  // Track pending operations
  const [isPending, startTransition] = useTransition();

  // Like a post
  const handleLike = (postId) => {
    const action = {
      type: "LIKE",
      postId,
    };

    startTransition(async () => {
      // Update UI immediately
      addOptimistic(action);

      // Simulate server request
      await delay(700);

      // Update actual state after server confirmation
      setPosts((currentPosts) =>
        postsReducer(currentPosts, action)
      );
    });
  };

  // Add a comment
  const handleComment = (e, postId) => {
    e.preventDefault();

    const text = (commentInputs[postId] || "").trim();

    if (!text) return;

    const comment = {
      id: Date.now(),
      username: "you",
      text,
    };

    const action = {
      type: "COMMENT",
      postId,
      comment,
    };

    // Clear input immediately
    setCommentInputs((previous) => ({
      ...previous,
      [postId]: "",
    }));

    startTransition(async () => {
      // Show comment immediately
      addOptimistic(action);

      // Simulate API request
      await delay(1000);

      // Confirm comment in actual state
      setPosts((currentPosts) =>
        postsReducer(currentPosts, action)
      );
    });
  };

  const handleInputChange = (postId, value) => {
    setCommentInputs((previous) => ({
      ...previous,
      [postId]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="sticky top-0 z-20 bg-slate-950 px-5 py-4 text-white shadow-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <h1 className="text-2xl font-extrabold text-cyan-400">
            SocialFeed
          </h1>

          <div className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2">
            <span>👤</span>
            <span className="text-sm font-semibold">You</span>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-4 py-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Community Feed ❤️
          </h2>
          <p className="mt-2 text-slate-500">
            Share ideas, like posts, and connect with people.
          </p>
        </div>

        {/* Optimistic status */}
        <div className="mb-5 flex items-center justify-center gap-2 text-sm text-slate-500">
          <span
            className={`h-2 w-2 rounded-full ${
              isPending ? "animate-pulse bg-amber-500" : "bg-green-500"
            }`}
          />
          {isPending
            ? "Syncing changes..."
            : "All changes synchronized"}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {optimisticPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >
              {/* Post header */}
              <div className="flex items-center gap-3 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-2xl">
                  {post.avatar}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {post.username}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {post.time}
                  </p>
                </div>

                <button
                  className="ml-auto text-xl text-slate-400"
                  aria-label="More options"
                >
                  ⋮
                </button>
              </div>

              {/* Post content */}
              <div className="px-5 pb-5">
                <p className="leading-7 text-slate-700">
                  {post.content}
                </p>
              </div>

              {/* Like and comment count */}
              <div className="flex justify-between border-b border-slate-100 px-5 py-3 text-sm text-slate-500">
                <span>❤️ {post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>

              {/* Like button */}
              <div className="flex gap-3 px-5 py-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 font-semibold transition ${
                    post.liked
                      ? "bg-rose-50 text-rose-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-xl">
                    {post.liked ? "❤️" : "🤍"}
                  </span>
                  {post.liked ? "Liked" : "Like"}
                </button>

                <div className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 font-semibold text-slate-600">
                  💬 Comment
                </div>
              </div>

              {/* Comments section */}
              <div className="space-y-3 bg-slate-50 px-5 py-4">

                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-2"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm">
                      👤
                    </div>

                    <div className="min-w-0 rounded-xl bg-white px-4 py-2 shadow-sm">
                      <p className="text-xs font-bold text-cyan-700">
                        {comment.username}
                      </p>
                      <p className="break-words text-sm text-slate-700">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}

                {post.comments.length === 0 && (
                  <p className="text-center text-sm text-slate-400">
                    No comments yet. Be the first!
                  </p>
                )}

                {/* Add comment form */}
                <form
                  onSubmit={(e) => handleComment(e, post.id)}
                  className="flex gap-2 pt-2"
                >
                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      handleInputChange(post.id, e.target.value)
                    }
                    placeholder="Write a comment..."
                    className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500"
                  />

                  <button
                    type="submit"
                    disabled={!commentInputs[post.id]?.trim()}
                    className="rounded-full bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Post
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-slate-400">
          Built with React 19 and Tailwind CSS ❤️
        </footer>
      </main>
    </div>
  );
}

export default Day13;
