import "./BlogList.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function BlogList({ blogs, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="blog-list-container">
      <h2>All Blogs</h2>
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <h3 className="blog-title">
            {blog.title} 
          </h3>
          <p className="blog-author">Author :  {blog.author}</p>
          
          <p className="blog-content">{blog.content}</p>
          <div className="blog-buttons">
            <button
              className="edit-button"
              onClick={() => navigate(`/edit/${blog.id}`)}
            >
              Edit
            </button>

            <div className="delete-container">
            <button className="delete-button" onClick={() => onDelete(blog.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
