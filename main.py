from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# Initialize the FastAPI app
app = FastAPI()

# Define the blog data model using Pydantic
class Blog(BaseModel):
    id: int
    title: str
    content: str
    published: Optional[bool] = True

# In-memory database (a simple list to store blogs)
blog_db: List[Blog] = []

# Create a new blog
@app.post("/blogs/", response_model=Blog)
def create_blog(blog: Blog):
    blog_db.append(blog)
    return blog

# Get all blogs
@app.get("/blogs/", response_model=List[Blog])
def get_all_blogs():
    return blog_db

# Get a specific blog by ID
@app.get("/blogs/{blog_id}", response_model=Blog)
def get_blog(blog_id: int):
    for blog in blog_db:
        if blog.id == blog_id:
            return blog
    raise HTTPException(status_code=404, detail="Blog not found")

# Update a blog by ID
@app.put("/blogs/{blog_id}", response_model=Blog)
def update_blog(blog_id: int, updated_blog: Blog):
    for index, blog in enumerate(blog_db):
        if blog.id == blog_id:
            blog_db[index] = updated_blog
            return updated_blog
    raise HTTPException(status_code=404, detail="Blog not found")

# Delete a blog by ID
@app.delete("/blogs/{blog_id}")
def delete_blog(blog_id: int):
    for index, blog in enumerate(blog_db):
        if blog.id == blog_id:
            blog_db.pop(index)
            return {"message": "Blog deleted"}
    raise HTTPException(status_code=404, detail="Blog not found")
