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
  const roleColors = {
    student: "bg-blue-500",
    ta: "bg-green-500",
    professor: "bg-purple-500",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{post.author}</span>
          <div className="flex space-x-2">
            <Badge variant="secondary" className={roleColors[post.role]}>
              {post.role.charAt(0).toUpperCase() + post.role.slice(1)}
            </Badge>
            <Badge variant="outline">
              {post.type === "question" ? "❓ Question" : "📚 Resource"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{post.content}</p>
        <Button
          onClick={() => onDelete(post.id)}
          variant="destructive"
          size="sm"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};
