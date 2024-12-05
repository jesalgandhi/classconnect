import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/ClassConnect";

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleImageSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="bg-card border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-text">
          <span>
            <p className="text-xl">{post.author}</p>
          </span>
          <div className="flex space-x-2">
            <Badge className="bg-primary text-black text-md">
              {post.role.charAt(0).toUpperCase() + post.role.slice(1)}
            </Badge>
            <Badge className="bg-secondary text-black text-md">
              {post.type === "question" ? "❓ Question" : "📚 Resource"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted mb-4">{post.content}</p>
        {post.image && (
          <div className="mb-4">
            <img
              src={post.image}
              alt="Post Illustration"
              onClick={toggleImageSize}
              className={`cursor-pointer rounded-md transition-all duration-300 ${
                isExpanded ? "w-full h-auto" : "max-w-full md:max-w-md"
              }`}
            />
            <p className="text-sm text-muted mt-2">
              Click the image to {isExpanded ? "collapse" : "expand"}.
            </p>
          </div>
        )}
        <Button
          onClick={() => onDelete(post.id)}
          className="bg-red-300 text-black hover:bg-red-400"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};
