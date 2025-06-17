from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.schemas.blogs import Blog  
from app.core.database import collection
from app.utils.helpers import blog_helper

router = APIRouter()

# CREATE
@router.post("/")
async def create_blog(blog: Blog):
    new_blog = await collection.insert_one(blog.dict())
    created_blog = await collection.find_one({"_id": new_blog.inserted_id})
    return blog_helper(created_blog)

# READ ALL
@router.get("/")
async def get_all_blogs():
    blogs = []
    async for blog in collection.find():
        blogs.append(blog_helper(blog))
    return blogs

# READ ONE
@router.get("/{blog_id}")
async def get_blog(blog_id: str):
    blog = await collection.find_one({"_id": ObjectId(blog_id)})
    if blog:
        return blog_helper(blog)
    raise HTTPException(status_code=404, detail="Blog not found")

# UPDATE
@router.put("/{blog_id}")
async def update_blog(blog_id: str, updated_blog: Blog):
    result = await collection.update_one(
        {"_id": ObjectId(blog_id)}, {"$set": updated_blog.dict()}
    )
    if result.modified_count:
        return await get_blog(blog_id)
    raise HTTPException(status_code=404, detail="Blog not found or no changes")

# DELETE
@router.delete("/{blog_id}")
async def delete_blog(blog_id: str):
    result = await collection.delete_one({"_id": ObjectId(blog_id)})
    if result.deleted_count:
        return {"message": "Blog deleted"}
    raise HTTPException(status_code=404, detail="Blog not found")
