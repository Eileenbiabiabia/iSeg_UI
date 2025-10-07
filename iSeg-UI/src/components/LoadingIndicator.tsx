import { Brain, Loader2 } from "lucide-react";

export const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-card-border rounded-lg p-8 shadow-lg max-w-sm w-full mx-4">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <Loader2 className="w-6 h-6 text-primary animate-spin absolute -top-1 -right-1" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Running AI Segmentation
            </h3>
            <p className="text-sm text-muted-foreground">
              Processing medical imaging data with advanced AI models...
            </p>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Analyzing DICOM structure</span>
              <span className="text-medical-success">Complete</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Identifying anatomical regions</span>
              <span className="text-medical-success">Complete</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Applying segmentation models</span>
              <Loader2 className="w-3 h-3 animate-spin" />
            </div>
            <div className="flex items-center justify-between">
              <span>Calculating volumetric data</span>
              <span className="text-muted-foreground">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};