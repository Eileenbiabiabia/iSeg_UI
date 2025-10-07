import { Activity, Brain } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-card border-b border-card-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                RadOnc Segmentation Demo
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-Powered Radiation Oncology Segmentation Workflow
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Demo Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
};