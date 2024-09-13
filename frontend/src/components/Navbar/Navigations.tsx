const navigationItems = [
  'About Us',
  'How it works',
  'Pricing',
  'FAQ',
  'Samples'
];

const Navigations = () => {
  return (
    <nav className="flex gap-8 items-center self-stretch px-px my-auto font-medium text-gray-800 max-md:max-w-full">
      {navigationItems.map((item, index) => (
        <a key={index} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="self-stretch my-auto text-center">
          {item}
        </a>
      ))}
    </nav>
  );
};

export default Navigations;