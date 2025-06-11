from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from bson import ObjectId
import os

app = FastAPI()

load_dotenv() 

MONGODB_URI = os.getenv("MONGODB_URI")

# MongoDB Connection
client = AsyncIOMotorClient(MONGODB_URI)
db = client.fastAPI
collection = db.blogs

# Pydantic Model
class Blog(BaseModel):
    title: str
    author:str
    content: str
    published: Optional[bool] = True

# Helper to convert ObjectId to str
def blog_helper(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "author": blog["author"],
        "content": blog["content"],
        "published": blog["published"],
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Blog API!"}

# CREATE blog
@app.post("/blogs/")
async def create_blog(blog: Blog):
    new_blog = await collection.insert_one(blog.dict())
    created_blog = await collection.find_one({"_id": new_blog.inserted_id})
    return blog_helper(created_blog)

# READ all blogs
@app.get("/blogs/")
async def get_all_blogs():
    blogs = []
    async for blog in collection.find():
        blogs.append(blog_helper(blog))
    return blogs

# READ single blog
@app.get("/blogs/{blog_id}")
async def get_blog(blog_id: str):
    blog = await collection.find_one({"_id": ObjectId(blog_id)})
    if blog:
        return blog_helper(blog)
    raise HTTPException(status_code=404, detail="Blog not found")

# UPDATE blog
@app.put("/blogs/{blog_id}")
async def update_blog(blog_id: str, updated_blog: Blog):
    result = await collection.update_one(
        {"_id": ObjectId(blog_id)}, {"$set": updated_blog.dict()}
    )
    if result.modified_count:
        return await get_blog(blog_id)
    raise HTTPException(status_code=404, detail="Blog not found or no changes")

# DELETE blog
@app.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    result = await collection.delete_one({"_id": ObjectId(blog_id)})
    if result.deleted_count:
        return {"message": "Blog deleted"}
    raise HTTPException(status_code=404, detail="Blog not found")
