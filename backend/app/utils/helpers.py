def blog_helper(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "author": blog["author"],
        "content": blog["content"],
        "published": blog["published"],
    }
