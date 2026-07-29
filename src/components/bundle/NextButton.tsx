interface NextButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function NextButton({ label = "Next", onClick, disabled = false }: NextButtonProps) {
  return (
    <button
      type="button"
      className="next-button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default NextButton;
