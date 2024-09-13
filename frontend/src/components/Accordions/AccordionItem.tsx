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
  return (
    <div className={`border-t ${!isActive && 'border-b'} border-neutral-200 dark:border-neutral-600`}>
      <h2 id={`heading${id}`} className="mb-0">
        <button
          className={`flex w-full items-center px-5 py-4 text-left text-base transition-colors duration-200 rounded-none bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white ${
            isActive ? "text-primary dark:text-primary-400 [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]" : ""
          } hover:bg-neutral-100 dark:hover:bg-neutral-700`}
          onClick={onClick}
          aria-expanded={isActive}
          aria-controls={`collapse${id}`}
        >
          {title}
          <svg
            className={`ml-auto h-5 w-5 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`collapse${id}`}
        className={`px-5 py-4 overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-screen" : "max-h-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;