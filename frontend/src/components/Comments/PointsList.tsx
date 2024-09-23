import React from 'react';

interface PointsListProps {
  title: string;
  points: string[];
}

const PointsList: React.FC<PointsListProps> = ({ title, points }) => {
  return (
    <section className="mt-32 text-base font-bold text-black max-md:mt-10 max-md:max-w-full">
      <h2 className="text-2xl">{title}</h2>
      <ul>
        {points.map((point, index) => (
          <li key={index}>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PointsList;