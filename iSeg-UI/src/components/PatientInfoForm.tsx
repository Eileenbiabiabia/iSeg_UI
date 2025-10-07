import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Check } from "lucide-react";
import { PatientInfo } from "@/pages/Index";

interface PatientInfoFormProps {
  patientInfo: PatientInfo | null;
  onPatientInfoChange: (info: PatientInfo | null) => void;
}

export const PatientInfoForm = ({ patientInfo, onPatientInfoChange }: PatientInfoFormProps) => {
  const [formData, setFormData] = useState({
    patientName: patientInfo?.patientName || "",
    patientID: patientInfo?.patientID || "",
    age: patientInfo?.age || "",
    sex: patientInfo?.sex || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }
    
    if (!formData.patientID.trim()) {
      newErrors.patientID = "Patient ID is required";
    }
    
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 0) {
      newErrors.age = "Valid age is required";
    }
    
    if (!formData.sex) {
      newErrors.sex = "Sex is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const info: PatientInfo = {
        patientName: formData.patientName.trim(),
        patientID: formData.patientID.trim(),
        age: Number(formData.age),
        sex: formData.sex,
      };
      onPatientInfoChange(info);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const isComplete = patientInfo !== null;

  return (
    <Card className="border-card-border">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Patient Information</CardTitle>
        </div>
        {isComplete && (
          <div className="ml-auto flex items-center space-x-1 text-medical-success">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Complete</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => handleInputChange("patientName", e.target.value)}
              placeholder="Enter patient name"
              className={errors.patientName ? "border-destructive" : ""}
            />
            {errors.patientName && (
              <p className="text-sm text-destructive">{errors.patientName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientID">Patient ID</Label>
            <Input
              id="patientID"
              value={formData.patientID}
              onChange={(e) => handleInputChange("patientID", e.target.value)}
              placeholder="Enter patient ID"
              className={errors.patientID ? "border-destructive" : ""}
            />
            {errors.patientID && (
              <p className="text-sm text-destructive">{errors.patientID}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              placeholder="Age"
              className={errors.age ? "border-destructive" : ""}
            />
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
              <SelectTrigger className={errors.sex ? "border-destructive" : ""}>
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
                <SelectItem value="O">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && (
              <p className="text-sm text-destructive">{errors.sex}</p>
            )}
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          variant={isComplete ? "secondary" : "default"}
        >
          {isComplete ? "Update Patient Info" : "Save Patient Info"}
        </Button>
      </CardContent>
    </Card>
  );
};