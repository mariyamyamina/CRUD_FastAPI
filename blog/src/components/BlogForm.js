import { useState } from "react";
import "./BlogForm.css"; 
import { useNavigate } from "react-router-dom";

function BlogForm({ onSubmit }) {
  const [blog, setBlog] = useState({ title: "", author: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(blog);
    setBlog({ title: "", author: "", content: "" });
    navigate("/blogs");
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create a New Blog</h2>
      <input
        className="form-input"
        name="title"
        placeholder="Title"
        value={blog.title}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="author"
        placeholder="Author"
        value={blog.author}
        onChange={handleChange}
        required
      />
      <textarea
        className="form-textarea"
        name="content"
        placeholder="Content"
        value={blog.content}
        onChange={handleChange}
        required
      />
      <button className="form-button" type="submit">Add Blog</button>
    </form>
  );
}

export default BlogForm;
