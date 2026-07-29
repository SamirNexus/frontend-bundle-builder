import "../../styles/components/StepLabel.css";
interface StepLabelProps {
  currentStep: number;
  totalSteps: number;
}

function StepLabel({
  currentStep,
  totalSteps,
}: StepLabelProps) {
  return (
    <p className="step-label">
      Step {currentStep} of {totalSteps}
    </p>
  );
}

export default StepLabel;