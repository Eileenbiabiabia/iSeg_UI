import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Play, Download } from "lucide-react";

interface SegmentationPanelProps {
  onRunSegmentation: () => void;
  isLoading: boolean;
  canRun: boolean;
}

export const SegmentationPanel = ({ onRunSegmentation, isLoading, canRun }: SegmentationPanelProps) => {
  return (
    <Card className="border-card-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">AI Segmentation</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <p className="text-sm font-medium text-foreground">Running AI Segmentation</p>
              <p className="text-xs text-muted-foreground">Processing medical imaging data...</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-muted-foreground">Processing...</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p>• Analyzing DICOM structure</p>
              <p>• Identifying anatomical regions</p>
              <p>• Applying segmentation models</p>
              <p>• Calculating volumetric data</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to run AI-powered segmentation on imported DICOM data
              </p>
              
              <Button 
                onClick={onRunSegmentation}
                disabled={!canRun}
                className="w-full"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Segmentation
              </Button>
            </div>
            
            {!canRun && (
              <div className="bg-medical-warning/10 border border-medical-warning/20 rounded-lg p-3">
                <p className="text-sm text-medical-warning">
                  Complete patient information and DICOM import before running segmentation.
                </p>
              </div>
            )}
            
            <div className="border-t border-card-border pt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                disabled
              >
                <Download className="w-4 h-4 mr-2" />
                Export Results (Coming Soon)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};