interface FeatureItemProps {
    icon: React.ReactNode;
    text: string;
  }
  
  const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
    return (
      <li className="flex items-start self-stretch mt-4 first:mt-0">
        <div className="flex gap-3.5 items-center min-w-[240px]">
          <div className="shrink-0 self-stretch my-auto w-[26px]">
            {icon}
          </div>
          <span className="self-stretch my-auto">{text}</span>
        </div>
      </li>
    );
  };
  
  export default FeatureItem;
  