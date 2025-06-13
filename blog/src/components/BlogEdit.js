import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "../services/api";
import "./BlogEdit.css";

function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", author: "", content: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await getBlogById(id);
      setBlog(res.data);
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(id, blog);
    navigate("/blogs");
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h2>Edit Blog</h2>
      <input
        className="edit-input"
        name="title"
        value={blog.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        className="edit-input"
        name="author"
        value={blog.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <textarea
        className="edit-textarea"
        name="content"
        value={blog.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <button type="submit" className="update-button">
        Update
      </button>
    </form>
  );
}

export default BlogEdit;
