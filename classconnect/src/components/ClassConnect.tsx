"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Post, UserRole, PostType } from "@/types/ClassConnect";
import { PostCard } from "@/components/PostCard";

export default function ClassConnect() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [author, setAuthor] = useState("");
  const [postType, setPostType] = useState<PostType>("question");
  const [userRole, setUserRole] = useState<UserRole>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() && author.trim()) {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          content: newPost,
          author,
          type: postType,
          role: userRole,
        },
      ]);
      setNewPost("");
    }
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-chocolate_cosmos-500">
        ClassConnect
      </h1>
      <Card className="mb-6 bg-card border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-text">Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              className="bg-background text-text border-border"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name"
            />
            <Textarea
              required
              className="bg-background text-text border-border"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Your question or resource"
            />
            <div className="flex space-x-2">
              <Select
                value={postType}
                onValueChange={(value: PostType) => setPostType(value)}
              >
                <SelectTrigger className="bg-background text-text border-border">
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent className="bg-white text-text border border-border">
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={userRole}
                onValueChange={(value: UserRole) => setUserRole(value)}
              >
                <SelectTrigger className="bg-background text-text border-border">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white text-text border border-border">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="ta">TA</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="bg-primary text-black hover:bg-accent"
            >
              Submit Post
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
