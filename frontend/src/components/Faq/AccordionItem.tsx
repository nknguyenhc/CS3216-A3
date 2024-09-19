import React, { useRef, useEffect, useState } from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  isActive,
  onClick,
  children,
}) => {
  const [height, setHeight] = useState<string | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isActive]);

  return (
    <div className="border-b last:border-b-0 border-neutral-200 dark:border-neutral-600">
      <h2 className="mb-0">
        <button
          onClick={onClick}
          aria-expanded={isActive}
          aria-controls={id}
          className={`flex w-full items-center px-5 py-4 text-left text-base text-neutral-800 dark:text-white transition
                      ${isActive ? 'bg-gray-100 dark:bg-neutral-700' : 'bg-white dark:bg-neutral-800'}`}
        >
          {title}
          <span
            className={`ml-auto h-5 w-5 transition-transform duration-200 ease-in-out ${isActive ? 'rotate-180' : 'rotate-0'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={id}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height,
          opacity: isActive ? '1' : '0',
        }}
        ref={contentRef}
      >
        <div className="px-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
