import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      setLoading(true);
      setError("");
      try {
        if (!chart) return;
        
        const id = `mermaid-svg-${Math.round(Math.random() * 1000000)}`;
        const { svg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Failed to render diagram.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-destructive border border-destructive/20 bg-destructive/5 rounded-lg p-4">
        {error}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="flex w-full items-center justify-center overflow-x-auto py-4"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
