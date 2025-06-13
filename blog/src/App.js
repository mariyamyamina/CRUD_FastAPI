import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "./services/api";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import BlogEdit from "./components/BlogEdit";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await getBlogs();
    setBlogs(res.data);
  };

  const handleCreate = async (blog) => {
    await createBlog(blog);
    fetchBlogs();
  };

  const handleUpdate = async (blog) => {
    await updateBlog(blog.id, blog);
    setEditing(null);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    fetchBlogs();
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/blogs"
            element={
              <>
                {editing ? (
                  <BlogEdit blog={editing} onUpdate={handleUpdate} />
                ) : null}
                <BlogList blogs={blogs} onEdit={setEditing} onDelete={handleDelete} />
              </>
            }
          />
          <Route path="/create" element={<BlogForm onSubmit={handleCreate} />} />
          <Route path="*" element={<Navigate to="/blogs" />} />
          <Route path="/edit/:id" element={<BlogEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
