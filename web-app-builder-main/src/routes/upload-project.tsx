import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Cloud, Download, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/upload-project")({
  head: () => ({
    meta: [
      { title: "Upload Project — OneBank Platform" },
      {
        name: "description",
        content: "Upload your application project for AI-powered analysis and modernization insights.",
      },
    ],
  }),
  component: UploadProjectPage,
});

const guidelines = [
  "Include complete source code",
  "Include configuration files",
  "Include database schemas (if any)",
  "Include deployment scripts",
  "Remove sensitive data",
];

const exampleProjects = [
  { name: "Retail Banking System", size: "~45 MB" },
  { name: "Loan Management System", size: "~32 MB" },
  { name: "Payment Gateway", size: "~28 MB" },
];

function UploadProjectPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const fileInputRef = useState<HTMLInputElement | null>(null)[1];

  const processingSteps = [
    "File uploaded successfully",
    "Extracting project files",
    "Analyzing code structure",
    "Identifying dependencies",
    "AI analysis in progress",
    "Generating insights",
  ];

  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            navigate({ to: "/dashboard" });
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isProcessing, navigate, processingSteps.length]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelected(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      handleFileSelected(files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(0);
    setIsProcessing(true);
  };

  const handleChooseFile = () => {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <PageHeader title="Upload Your Project" description="Upload your application project ZIP file for AI-powered analysis" />

        {!isProcessing ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Upload Area */}
            <div className="lg:col-span-2">
              <Card
                className="border-2 border-dashed border-border bg-card/50 p-12 relative transition-colors overflow-hidden"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  borderColor: isDragging ? "var(--primary)" : "var(--border)",
                }}
              >
                {isDragging && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/5 backdrop-blur-sm z-50">
                    <div className="text-center">
                      <Cloud className="mx-auto h-12 w-12 text-primary" />
                      <p className="mt-2 text-sm font-medium text-primary">
                        Drop your file here
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center gap-6 py-8">
                  {/* Upload Icon */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Cloud className="h-10 w-10 text-primary" />
                  </div>

                  {/* Upload Text */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {selectedFile
                        ? `Selected: ${selectedFile.name}`
                        : "Drag & drop your project ZIP file here"}
                    </h3>
                    {!selectedFile && (
                      <p className="mt-2 text-sm text-muted-foreground">or</p>
                    )}
                  </div>

                  {/* Choose File Button */}
                  <>
                    <input
                      type="file"
                      accept=".zip"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-input"
                    />
                    <Button 
                      onClick={handleChooseFile}
                      className="h-11 px-8 bg-gradient-primary shadow-glow hover:opacity-95 cursor-pointer"
                    >
                      Choose File
                    </Button>
                  </>

                  {/* File Info */}
                  <p className="text-xs text-muted-foreground">
                    Supported formats: <span className="font-medium">.zip</span> •{" "}
                    <span className="font-medium">Max file size: 500MB</span>
                  </p>
                </div>
              </Card>

              {/* What Happens Next */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-6">What happens next?</h3>
                <div className="space-y-4">
                  {[
                    "We extract and analyze your code, configurations, and dependencies",
                    "AI identifies architecture patterns, modules, and services",
                    "You get insights on duplicates, risks, and optimization opportunities",
                    "Receive recommendations and modernization roadmap",
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <p className="pt-0.5 text-sm text-foreground/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Upload Guidelines */}
              <Card className="p-6 border-border">
                <h3 className="font-semibold mb-4">Upload Guidelines</h3>
                <ul className="space-y-3">
                  {guidelines.map((guideline) => (
                    <li key={guideline} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Example Projects */}
              <Card className="p-6 border-border">
                <h3 className="font-semibold mb-4">Example Projects</h3>
                <div className="space-y-3">
                  {exampleProjects.map((project) => (
                    <div
                      key={project.name}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 hover:bg-secondary transition-colors group cursor-pointer"
                    >
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.size}</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          // Processing Screen
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Left: Processing Steps */}
            <div className="flex flex-col gap-6">
              {/* File Info Card */}
              <Card className="p-6 border-border">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{selectedFile?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedFile && (selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </Card>

              {/* Progress Bar */}
              <Card className="p-6 border-border">
                <p className="mb-3 text-sm font-medium">Processing Progress</p>
                <Progress value={(currentStep / (processingSteps.length - 1)) * 100} className="h-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {currentStep + 1} of {processingSteps.length}
                </p>
              </Card>

              {/* Steps */}
              <div className="space-y-3">
                {processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {index < currentStep ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : index === currentStep ? (
                      <div className="animate-spin">
                        <Circle className="h-5 w-5 text-primary flex-shrink-0" />
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">📊</div>
                <p className="text-sm text-muted-foreground">Analyzing your project...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
