"use client";

import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowJsonPreviewProps {
  workflowJson: object;
  filename?: string;
}

export function WorkflowJsonPreview({
  workflowJson,
  filename = "workflow.json",
}: WorkflowJsonPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = async () => {
    const jsonStr = JSON.stringify(workflowJson, null, 2);
    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const jsonStr = JSON.stringify(workflowJson, null, 2);

  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground">({jsonStr.split("\n").length} 行)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span className="hidden sm:inline">收起</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span className="hidden sm:inline">展开</span>
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="hidden sm:inline">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">复制</span>
              </>
            )}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              const blob = new Blob([jsonStr], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            下载
          </Button>
        </div>
      </div>

      {/* JSON Content */}
      {isExpanded && (
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm">
            <code
              dangerouslySetInnerHTML={{
                __html: syntaxHighlight(jsonStr),
              }}
            />
          </pre>
        </div>
      )}
    </div>
  );
}

// 简单的 JSON 语法高亮
function syntaxHighlight(json: string): string {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "text-orange-600 dark:text-orange-400"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-blue-600 dark:text-blue-400"; // key
        } else {
          cls = "text-green-600 dark:text-green-400"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-purple-600 dark:text-purple-400"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-gray-600 dark:text-gray-400"; // null
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
}
