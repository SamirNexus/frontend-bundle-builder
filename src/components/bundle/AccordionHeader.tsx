import "../../styles/components/AccordionHeader.css";

interface AccordionHeaderProps {
  title: string;
  selectedCount?: number;
  iconSrc?: string;
  isOpen: boolean;
  controlsId: string;
  onToggle: () => void;
}

function AccordionHeader({
  title,
  selectedCount,
  iconSrc,
  isOpen,
  controlsId,
  onToggle,
}: AccordionHeaderProps) {
  return (
    <h2 className="accordion-header">
      <button
        type="button"
        className="accordion-header__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={controlsId}
      >
        <span className="accordion-header__left">
          {iconSrc && (
            <img
              src={iconSrc}
              alt=""
              className="accordion-header__icon"
              aria-hidden="true"
            />
          )}

          <span className="accordion-header__title">
            {title}
          </span>
        </span>

        <span className="accordion-header__right">
          {selectedCount !== undefined && (
            <span className="accordion-header__selected">
              {selectedCount} selected
            </span>
          )}

          <span
            className="accordion-header__arrow"
            aria-hidden="true"
          >
            {isOpen ? "▲" : "▼"}
          </span>
        </span>
      </button>
    </h2>
  );
}

export default AccordionHeader;