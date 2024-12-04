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
import { useLocation } from "react-router-dom";

export default function ClassConnect() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: "What are the prerequisites for this class?",
      author: "John Doe",
      type: "question",
      role: "student",
    },
    {
      id: 2,
      content: "Here is a link to the syllabus: [Syllabus PDF]",
      author: "Dr. Clara Nguyen",
      type: "resource",
      role: "professor",
    },
    {
      id: 3,
      content: "Can someone explain the second assignment?",
      author: "Emily Davis",
      type: "question",
      role: "student",
    },
    {
      id: 4,
      content: "Sure! The key is to use recursion effectively.",
      author: "Jane Smith",
      type: "resource",
      role: "ta",
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [author, setAuthor] = useState("");
  const [postType, setPostType] = useState<PostType>("question");
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<PostType | "all">("all");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");

  const location = useLocation();
  const classInfo = location.state as {
    id: number;
    title: string;
    professor: string;
    assistants: string[];
    semester: string;
    description: string;
  };

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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || post.type === filterType;
    const matchesRole = filterRole === "all" || post.role === filterRole;
    return matchesSearch && matchesType && matchesRole;
  });

  return (
    <div className="container mx-auto p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-chocolate_cosmos-500">
        {classInfo.title} - Class Connect
      </h1>
      <div className="mb-4">
        <p>
          <strong>Professor:</strong> {classInfo.professor}
        </p>
        <p>
          <strong>Assistants:</strong>{" "}
          {classInfo.assistants.length > 0 ? classInfo.assistants.join(", ") : "None"}
        </p>
        <p>
          <strong>Semester:</strong> {classInfo.semester}
        </p>
        <p>
          <strong>Description:</strong> {classInfo.description}
        </p>
      </div>

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

      <div className="mb-4 flex space-x-4">
        <Input
          className="bg-background text-text border-border w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts"
        />
        <Select
          value={filterType}
          onValueChange={(value: PostType | "all") => setFilterType(value)}
        >
          <SelectTrigger className="bg-background text-text border-border">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-white text-text border border-border">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="question">Question</SelectItem>
            <SelectItem value="resource">Resource</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filterRole}
          onValueChange={(value: UserRole | "all") => setFilterRole(value)}
        >
          <SelectTrigger className="bg-background text-text border-border">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-white text-text border border-border">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="ta">TA</SelectItem>
            <SelectItem value="professor">Professor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
