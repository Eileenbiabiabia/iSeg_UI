import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { SegmentationResult } from "@/pages/Index";
import ctScanImage from "@/assets/ct-scan-chest.jpg";

interface ViewerDemoProps {
  results: SegmentationResult[];
  currentSlice: number;
  onSliceChange: (slice: number) => void;
  hasResults: boolean;
}

export const ViewerDemo = ({ results, currentSlice, onSliceChange, hasResults }: ViewerDemoProps) => {
  const totalSlices = 247;

  const handleSliceChange = (values: number[]) => {
    onSliceChange(values[0]);
  };

  const nextSlice = () => {
    if (currentSlice < totalSlices) {
      onSliceChange(currentSlice + 1);
    }
  };

  const prevSlice = () => {
    if (currentSlice > 1) {
      onSliceChange(currentSlice - 1);
    }
  };

  const getOverlayStyle = (index: number) => {
    const overlays = [
      { top: "25%", left: "45%", width: "12%", height: "8%" }, // Tumor
      { top: "35%", left: "40%", width: "20%", height: "25%" }, // Heart
      { top: "20%", left: "15%", width: "25%", height: "45%" }, // Left Lung
      { top: "20%", left: "60%", width: "25%", height: "45%" }, // Right Lung
      { top: "30%", left: "48%", width: "4%", height: "20%" }, // Spinal Cord
    ];
    return overlays[index] || overlays[0];
  };

  return (
    <Card className="border-card-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Medical Viewer</CardTitle>
        </div>
        <div className="ml-auto">
          <Badge variant="secondary">
            Slice {currentSlice} / {totalSlices}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Image Viewer */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
          <img 
            src={ctScanImage}
            alt="CT Scan Slice"
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Patient Info Overlay */}
          <div className="absolute top-3 left-3 text-white text-xs font-mono bg-black/70 px-2 py-1 rounded">
            <div>PATIENT: DEMO_001</div>
            <div>STUDY: CT CHEST</div>
            <div>SLICE: {currentSlice}</div>
          </div>
          
          {/* Scale Overlay */}
          <div className="absolute bottom-3 right-3 text-white text-xs font-mono bg-black/70 px-2 py-1 rounded">
            1.0x | W:400 L:40
          </div>
          
          {/* Segmentation Overlays */}
          {hasResults && results.map((result, index) => (
            <div
              key={result.name}
              className={`absolute bg-${result.color} opacity-40 border-2 border-${result.color} rounded`}
              style={getOverlayStyle(index)}
              title={`${result.name}: ${result.volume}`}
            />
          ))}
          
          {!hasResults && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
                Run segmentation to view overlays
              </div>
            </div>
          )}
        </div>
        
        {/* Slice Navigation */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlice}
              disabled={currentSlice <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 px-2">
              <Slider
                value={[currentSlice]}
                onValueChange={handleSliceChange}
                min={1}
                max={totalSlices}
                step={1}
                className="w-full"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlice}
              disabled={currentSlice >= totalSlices}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Legend */}
        {hasResults && (
          <div className="border-t border-card-border pt-4">
            <p className="text-sm font-medium text-foreground mb-2">Segmentation Legend:</p>
            <div className="grid grid-cols-1 gap-1">
              {results.map((result) => (
                <div key={result.name} className="flex items-center space-x-2 text-xs">
                  <div className={`w-3 h-3 bg-${result.color} border border-${result.color} rounded-sm`} />
                  <span className="text-foreground">{result.name}</span>
                  <span className="text-muted-foreground ml-auto">{result.volume}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};