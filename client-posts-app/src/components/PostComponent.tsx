import type { Post } from "../pages/Post";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";

import { GrLike } from "react-icons/gr";
export default function PostComponent(
  containerRef: any,
  posts: Post[],
  liked: Record<number, boolean>,
  handleLike: (postId: number) => Promise<void>
) {
  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto px-4 space-y-4 flex-1 mt-[30px]"
    >
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
            <span>
              <FaCalendarAlt className="inline-block mr-2" size={15} />{" "}
              {new Date(post.publishedAt).toLocaleString()}
            </span>
            <span>
              <FaUser className="inline-block mr-2" /> {post.user.username}
            </span>
          </div>
          <p className="text-gray-800 text-lg text-justify">{post.message}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-600">
              {liked[post.id] ? (
                <FcLike className="inline-block mr-1 text-red-500" size={20} />
              ) : (
                <FaRegHeart className="inline-block mr-1" size={20} />
              )}
              {post.likes} Me gusta
            </span>
            <button onClick={() => handleLike(post.id)}>
              <GrLike className="inline-block mr-2" size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
