import React from 'react';
import FocusSection from '../components/Essay/Upload/FocusSection';
import EssayForm from '../components/Essay/Upload/EssayForm';
import Pricing from '../components/Pricing/Pricing';

const UploadEssayPage: React.FC = () => {
  const [focus, setFocus] = React.useState<string>('Jardine scholarship');
  const [title, setTitle] = React.useState<string>('');
  const [statement, setStatement] = React.useState<string>('');

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-black mb-20 mt-10">
          Upload your personal statement
        </h1>
        <div className="max-w-[1200px] mx-auto space-y-16">
          <FocusSection focus={focus} setFocus={setFocus} />
          <EssayForm
            title={title}
            setTitle={setTitle}
            statement={statement}
            setStatement={setStatement}
          />
        </div>

      </div>
      <Pricing />
    </div>
  );
};

export default UploadEssayPage;
