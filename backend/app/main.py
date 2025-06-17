from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import blogs
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Blog API!"}

# Routers
app.include_router(blogs.router, prefix="/blogs", tags=["Blogs"])
