import React from 'react';
import ShortTitle from './ShortTitle';
import ContentBox from './ContentBox';
import SideBox from './SideBox';
import PointsList from './PointsList';
import UploadButton from './UploadButton';

const EssayComments: React.FC = () => {
  const contentText = `Game of Thrones is a groundbreaking fantasy television series based on George R.R. Martin's A Song of Ice and Fire novels. The show takes place in the fictional world of Westeros and Essos, where noble families vie for control of the Iron Throne and, by extension, the Seven Kingdoms. The central narrative is a sprawling tale of power, loyalty, betrayal, and survival, set against a backdrop of political intrigue, civil wars, and ancient rivalries.

One of the defining aspects of Game of Thrones is its moral complexity. Characters are rarely purely good or evil, and their motivations shift as they navigate the dangerous, cutthroat world of Westeros. Figures like Eddard Stark, Daenerys Targaryen, Tyrion Lannister, and Jon Snow undergo significant personal evolution throughout the series, making decisions that reflect both their virtues and their flaws. The show explores how power can corrupt even the most well-meaning individuals, and how alliances are constantly formed and broken in the pursuit of dominance.

In addition to its political machinations, Game of Thrones includes mystical elements, such as dragons, sorcery, and the looming threat of the White Walkers — an ancient race of undead beings that seek to wipe out humanity. These supernatural forces add a layer of myth and legend to the otherwise gritty and brutal human conflicts.

While the show was lauded for its complex storytelling, high production values, and intense drama, its final season sparked widespread controversy. Many fans and critics felt that the narrative was rushed, leaving several key character arcs unsatisfactorily resolved. Despite this, Game of Thrones remains a monumental achievement in television history. Its influence on pop culture is undeniable, and it set new standards for production scale and storytelling depth in modern TV series.
Game of Thrones is a groundbreaking fantasy television series based on George R.R. Martin's A Song of Ice and Fire novels. The show takes place in the fictional world of Westeros and Essos, where noble families vie for control of the Iron Throne and, by extension, the Seven Kingdoms. The central narrative is a sprawling tale of power, loyalty, betrayal, and survival, set against a backdrop of political intrigue, civil wars, and ancient rivalries.

One of the defining aspects of Game of Thrones is its moral complexity. Characters are rarely purely good or evil, and their motivations shift as they navigate the dangerous, cutthroat world of Westeros. Figures like Eddard Stark, Daenerys Targaryen, Tyrion Lannister, and Jon Snow undergo significant personal evolution throughout the series, making decisions that reflect both their virtues and their flaws. The show explores how power can corrupt even the most well-meaning individuals, and how alliances are constantly formed and broken in the pursuit of dominance.

In addition to its political machinations, Game of Thrones includes mystical elements, such as dragons, sorcery, and the looming threat of the White Walkers — an ancient race of undead beings that seek to wipe out humanity. These supernatural forces add a layer of myth and legend to the otherwise gritty and brutal human conflicts.

While the show was lauded for its complex storytelling, high production values, and intense drama, its final season sparked widespread controversy. Many fans and critics felt that the narrative was rushed, leaving several key character arcs unsatisfactorily resolved. Despite this, Game of Thrones remains a monumental achievement in television history. Its influence on pop culture is undeniable, and it set new standards for production scale and storytelling depth in modern TV series.`;

  const points = [
    "Identify areas that need more evidence or elaboration.",
    "At its core, Game of Thrones is about the quest for the Iron Throne, which symbolizes control over the Seven Kingdoms. Themes of loyalty, betrayal, and the corrupting nature of power dominate the narrative. The story also includes mystical elements such as dragons, the undead, and ancient prophecies."
  ];

  return (
    <main className="flex flex-col items-start py-14 pl-20 bg-white rounded-3xl border border-solid border-neutral-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pl-5">
      <ShortTitle />
      <section className="self-stretch mt-20 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ContentBox content={contentText} />
          <SideBox />
        </div>
      </section>
      <PointsList title="1. Points to Substantiate" points={points} />
      <PointsList title="2. Strong Points to Keep" points={points} />
      <UploadButton />
    </main>
  );
};

export default EssayComments;