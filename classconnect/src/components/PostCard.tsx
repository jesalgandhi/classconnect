import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/ClassConnect";

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  return (
    <Card className="bg-card border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-text">
          <span>{post.author}</span>
          <div className="flex space-x-2">
            <Badge className="bg-primary text-black">
              {post.role.charAt(0).toUpperCase() + post.role.slice(1)}
            </Badge>
            <Badge className="bg-secondary text-black">
              {post.type === "question" ? "❓ Question" : "📚 Resource"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted mb-4">{post.content}</p>
        <Button
          onClick={() => onDelete(post.id)}
          className="bg-accent text-white hover:bg-primary"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};
