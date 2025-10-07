import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Download, FileText, User } from "lucide-react";
import { SegmentationResult, PatientInfo } from "@/pages/Index";

interface ResultsPanelProps {
  results: SegmentationResult[];
  patientInfo: PatientInfo | null;
  isLoading: boolean;
}

export const ResultsPanel = ({ results, patientInfo, isLoading }: ResultsPanelProps) => {
  if (isLoading) {
    return (
      <Card className="border-card-border">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Processing Results</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">
              Calculating segmentation metrics...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="border-card-border">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Segmentation Results</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No segmentation results yet. Run segmentation to view results.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-card-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Segmentation Results</CardTitle>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {results.length} Structures
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Patient Summary */}
        {patientInfo && (
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Patient Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <span className="ml-2 font-medium">{patientInfo.patientName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">ID:</span>
                <span className="ml-2 font-medium">{patientInfo.patientID}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Age:</span>
                <span className="ml-2 font-medium">{patientInfo.age}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Sex:</span>
                <span className="ml-2 font-medium">{patientInfo.sex}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Table */}
        <div className="border border-card-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Structure</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={result.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 bg-${result.color} border border-${result.color} rounded-sm`} />
                      <span>{result.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {result.volume}
                  </TableCell>
                  <TableCell>
                    {result.name === "Tumor" && (
                      <Badge variant="outline" className="text-xs border-tumor-overlay text-tumor-overlay">
                        ROI
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Statistics Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-card-border rounded-lg p-3 text-center">
            <p className="text-2xl font-semibold text-primary">
              {results.length}
            </p>
            <p className="text-sm text-muted-foreground">Structures</p>
          </div>
          <div className="bg-card border border-card-border rounded-lg p-3 text-center">
            <p className="text-2xl font-semibold text-primary">
              100%
            </p>
            <p className="text-sm text-muted-foreground">Confidence</p>
          </div>
        </div>
        
        {/* Export Actions */}
        <div className="space-y-2 border-t border-card-border pt-4">
          <Button variant="outline" className="w-full" disabled>
            <Download className="w-4 h-4 mr-2" />
            Export DICOM RT
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};