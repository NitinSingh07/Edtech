"use client";

import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/actions/comment";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface CommentSectionProps {
  incidentId: string;
  comments: any[];
  currentUser: any;
}

export const CommentSection = ({ incidentId, comments, currentUser }: CommentSectionProps) => {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!content.trim()) return;

    startTransition(() => {
      addComment(incidentId, content).then((data) => {
        if (data.error) toast.error(data.error);
        if (data.success) {
          toast.success("Comment added");
          setContent("");
        }
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-9 w-9 shrink-0 border border-border/50">
              <AvatarImage src={comment.user.image || ""} />
              <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                {comment.user.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{comment.user.name}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">
                  {comment.user.role}
                </span>
                <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
              </div>
              <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/10">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-border/50">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={currentUser?.image || ""} />
          <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your update or internal note here..."
            className="min-h-[100px] bg-background/50 focus-visible:ring-primary/50"
            disabled={isPending}
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              disabled={isPending || !content.trim()}
              size="sm"
              className="gap-2"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Post Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
