import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import type { Post } from "./Post";
import PostComponent from "../components/PostComponent";
import { MdOutlinePostAdd } from "react-icons/md";
import endpoints from "../services/paths/paths";

export default function PostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [newMessage, setNewMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    if (liked[postId]) return;
    try {
      await fetch(endpoints.posts.like(postId), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setLiked((prev) => ({ ...prev, [postId]: true }));
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
      );
    } catch {
      alert("Error al dar like");
    }
  };

  const handleCreatePost = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(endpoints.posts.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await res.json();
      const userRes = await fetch(endpoints.users.getOne(data.userId));
      if (!userRes.ok) throw new Error("No se pudo obtener el usuario");

      const user = await userRes.json();

      const newPost = {
        ...data,
        user,
      };

      await fetchPosts();
      setPosts((prev) => [...prev, newPost]);
      setNewMessage("");
      containerRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);
      alert("Error al publicar");
    }
  };

  const fetchPosts = async () => {
    const res = await fetch(endpoints.posts.getAll);
    const data = await res.json();
    setPosts(data);
    const initialLikes: Record<number, boolean> = {};
    data.forEach((p: Post) => (initialLikes[p.id] = false));
    setLiked(initialLikes);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F4F4F4]">
      <Navbar />

      {/* Formulario fijo arriba */}
      <div className="fixed top-16 left-0 w-full bg-white/30 backdrop-blur-md p-4 rounded-t-3xl shadow-inner z-10 border border-white/20">
        <div className="max-w-2xl mx-auto">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#488B75]"
            rows={3}
            value={newMessage}
            placeholder="¿Qué estás pensando?"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleCreatePost}
              className="bg-[#488B75] hover:bg-[#36607A] text-white px-4 py-2 rounded-md transition"
            >
              Publicar
            </button>
          </div>
        </div>
      </div>

      {/* Lista scrollable debajo del input */}
      <div className="flex-1 px-4 py-6 mt-44">
        <h2 className="text-3xl font-bold text-[#36607A]  mt-[50px]">
          <MdOutlinePostAdd className="inline-block mr-2" size={30} />{" "}
          Publicaciones
        </h2>
        {PostComponent(containerRef, posts, liked, handleLike)}
      </div>
    </div>
  );
}
