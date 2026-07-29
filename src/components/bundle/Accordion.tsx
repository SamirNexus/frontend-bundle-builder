import type { ReactNode } from "react";

import AccordionHeader from "./AccordionHeader";
import StepLabel from "./StepLabel";

import "../../styles/components/Accordion.css";

interface AccordionProps {
  step: number;
  totalSteps: number;
  title: string;
  selectedCount?: number;
  iconSrc?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function Accordion({
  step,
  totalSteps,
  title,
  selectedCount,
  iconSrc,
  isOpen,
  onToggle,
  children,
}: AccordionProps) {
  const contentId = `bundle-step-${step}-content`;

  return (
    <section
      className={`accordion${
        isOpen ? " accordion--open" : ""
      }`}
    >
      <StepLabel
        currentStep={step}
        totalSteps={totalSteps}
      />

      <AccordionHeader
        title={title}
        selectedCount={selectedCount}
        iconSrc={iconSrc}
        isOpen={isOpen}
        controlsId={contentId}
        onToggle={onToggle}
      />

      {isOpen && (
        <div
          id={contentId}
          className="accordion__content"
          role="region"
          aria-label={title}
        >
          {children}
        </div>
      )}
    </section>
  );
}

export default Accordion;