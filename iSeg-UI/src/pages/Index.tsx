import { useState } from "react";
import { Header } from "@/components/Header";
import { PatientInfoForm } from "@/components/PatientInfoForm";
import { DicomImportPanel } from "@/components/DicomImportPanel";
import { SegmentationPanel } from "@/components/SegmentationPanel";
import { ViewerDemo } from "@/components/ViewerDemo";
import { ResultsPanel } from "@/components/ResultsPanel";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useToast } from "@/hooks/use-toast";

export interface PatientInfo {
  patientName: string;
  patientID: string;
  age: number;
  sex: string;
}

export interface SegmentationResult {
  name: string;
  volume: string;
  color: string;
}

const Index = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [dicomFolder, setDicomFolder] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SegmentationResult[]>([]);
  const [currentSlice, setCurrentSlice] = useState(1);
  const { toast } = useToast();

  const fakeSegmentation = (): Promise<{ structures: SegmentationResult[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          structures: [
            { name: "Tumor", volume: "34.2 cc", color: "tumor-overlay" },
            { name: "Heart", volume: "752.8 cc", color: "heart-overlay" },
            { name: "Left Lung", volume: "1,203.5 cc", color: "lung-overlay" },
            { name: "Right Lung", volume: "1,156.7 cc", color: "lung-overlay" },
            { name: "Spinal Cord", volume: "45.3 cc", color: "organ-overlay" },
          ],
        });
      }, 3000);
    });
  };

  const handleRunSegmentation = async () => {
    if (!patientInfo) {
      toast({
        title: "Patient Information Required",
        description: "Please complete patient information before running segmentation.",
        variant: "destructive",
      });
      return;
    }

    if (!dicomFolder) {
      toast({
        title: "DICOM Import Required",
        description: "Please import DICOM folder before running segmentation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await fakeSegmentation();
      setResults(result.structures);
      toast({
        title: "Segmentation Complete",
        description: `Successfully segmented ${result.structures.length} structures.`,
      });
    } catch (error) {
      toast({
        title: "Segmentation Failed",
        description: "An error occurred during segmentation processing.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clinical-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Patient Info & Import */}
          <div className="lg:col-span-1 space-y-6">
            <PatientInfoForm
              patientInfo={patientInfo}
              onPatientInfoChange={setPatientInfo}
            />
            
            <DicomImportPanel
              dicomFolder={dicomFolder}
              onFolderSelect={setDicomFolder}
            />
            
            <SegmentationPanel
              onRunSegmentation={handleRunSegmentation}
              isLoading={isLoading}
              canRun={Boolean(patientInfo && dicomFolder)}
            />
          </div>

          {/* Center Panel - Viewer */}
          <div className="lg:col-span-1">
            <ViewerDemo
              results={results}
              currentSlice={currentSlice}
              onSliceChange={setCurrentSlice}
              hasResults={results.length > 0}
            />
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-1">
            <ResultsPanel
              results={results}
              patientInfo={patientInfo}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {isLoading && <LoadingIndicator />}
    </div>
  );
};

export default Index;