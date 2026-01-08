"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowPreviewProps {
  thumbnail: string;
  title: string;
  videoUrl?: string;
}

export function WorkflowPreview({ thumbnail, title, videoUrl }: WorkflowPreviewProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-border bg-muted">
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
      {videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50">
          <Button size="lg" className="gap-2">
            <Play className="h-5 w-5" />
            查看演示
          </Button>
        </div>
      )}
    </div>
  );
}
