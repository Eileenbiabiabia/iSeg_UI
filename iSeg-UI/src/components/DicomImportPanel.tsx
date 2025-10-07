import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Check, Upload } from "lucide-react";

interface DicomImportPanelProps {
  dicomFolder: string;
  onFolderSelect: (folder: string) => void;
}

export const DicomImportPanel = ({ dicomFolder, onFolderSelect }: DicomImportPanelProps) => {
  const [isImporting, setIsImporting] = useState(false);

  const handleFolderSelect = async () => {
    setIsImporting(true);
    
    // Simulate folder selection and validation
    setTimeout(() => {
      const mockPath = "/Users/physician/DICOM/Patient_12345_CT_Chest/";
      onFolderSelect(mockPath);
      setIsImporting(false);
    }, 1500);
  };

  const isComplete = Boolean(dicomFolder);

  return (
    <Card className="border-card-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <FolderOpen className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">DICOM Import</CardTitle>
        </div>
        {isComplete && (
          <div className="ml-auto flex items-center space-x-1 text-medical-success">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Imported</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!dicomFolder ? (
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Select a folder containing DICOM images
            </p>
            <Button 
              onClick={handleFolderSelect}
              disabled={isImporting}
              className="w-full"
            >
              {isImporting ? "Importing..." : "Choose DICOM Folder"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FolderOpen className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Selected Folder:</p>
                  <p className="text-sm text-muted-foreground font-mono break-all">
                    {dicomFolder}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-card border border-card-border rounded-lg p-3">
                <p className="text-2xl font-semibold text-primary">247</p>
                <p className="text-sm text-muted-foreground">DICOM Files</p>
              </div>
              <div className="bg-card border border-card-border rounded-lg p-3">
                <p className="text-2xl font-semibold text-primary">5.2 GB</p>
                <p className="text-sm text-muted-foreground">Total Size</p>
              </div>
            </div>
            
            <Button 
              onClick={handleFolderSelect}
              variant="outline"
              className="w-full"
            >
              Select Different Folder
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};