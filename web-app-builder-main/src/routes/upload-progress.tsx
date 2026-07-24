import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import uploadVisual from "@/assets/login-visual.jpg";
import { getDefaultRouteForRole, getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/upload-progress")({
  beforeLoad: () => {
    const role = getStoredUserRole();

    if (role === "admin") {
      throw redirect({ to: "/applications" });
    }

    if (!role) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Upload Progress — OneBank Platform" },
      { name: "description", content: "Processing your uploaded project..." },
    ],
  }),
  component: UploadProgressPage,
});

const steps = [
  "File uploaded successfully",
  "Extracting project files",
  "Analyzing code structure",
  "Identifying dependencies",
  "AI analysis in progress",
  "Generating insights",
];

function UploadProgressPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("retail-banking-system.zip");
  const [fileSize] = useState("45.2 MB");

  useEffect(() => {
    // Simulate overall progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (steps.length * 3000 / 100); // Complete in steps.length * 3 seconds
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Move to next step every 2-3 seconds
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2500); // 2.5 seconds per step

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      // Redirect to the correct landing page after all steps complete
      const timer = setTimeout(() => {
        navigate({ to: getDefaultRouteForRole(getStoredUserRole()) });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);

  return (
    <div className="dark min-h-screen w-full bg-gradient-hero text-foreground">
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left side - Steps */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Upload Progress</h1>
              <p className="mt-2 text-muted-foreground">
                Please wait while we analyze your project
              </p>
            </div>

            {/* File Info */}
            <Card className="border-border bg-card/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{fileName}</p>
                  <p className="text-sm text-muted-foreground">{fileSize}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-sm text-muted-foreground">
                  {Math.round(uploadProgress)}%
                </p>
              </div>
            </Card>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full">
                    {index < currentStep ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : index === currentStep ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground/50" />
                    )}
                  </div>
                  <p
                    className={`text-sm transition-colors ${
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Info Message */}
            <div className="flex items-start gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <svg
                className="h-5 w-5 text-blue-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-blue-500">
                This may take a few minutes depending on the size and complexity of your project.
              </p>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden items-center justify-center lg:flex">
            <img
              src={uploadVisual}
              alt="Upload progress illustration"
              className="h-full w-full object-contain opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
