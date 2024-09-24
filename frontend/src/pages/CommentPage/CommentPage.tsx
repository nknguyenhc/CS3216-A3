import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mockData, Comment } from "./mockData";
import { fetchAndMatchEssay } from "./api";

/*
const pageText = `
  The quick brown fox jumps over the lazy dog, a phrase that has long been celebrated in the realm of typography and language. This whimsical sentence serves not only as a tool for testing fonts but also encapsulates the vibrant life of nature, where agility meets lethargy in the most playful manner. It reminds us of the beauty of contrast in the animal kingdom, where each creature plays its unique role in the ecosystem.

  In a world of uncertainty, technology provides clarity, a beacon of hope amidst the chaos of modern life. As we navigate through rapid advancements and the overwhelming influx of information, technology acts as our compass. Innovations such as artificial intelligence and data analytics enable us to decipher complex patterns and make informed decisions. We can now analyze vast amounts of data with unparalleled speed, transforming uncertainty into actionable insights. This shift empowers individuals and businesses alike, fostering a landscape where knowledge is power and clarity reigns supreme.

  Humans have always sought to understand the cosmos, driven by an insatiable curiosity that defines our species. From the ancient astronomers who gazed at the stars, trying to make sense of the universe, to the modern scientists exploring the mysteries of black holes and dark matter, our quest for knowledge has no bounds. The cosmos holds countless secrets, and our desire to unlock them fuels our passion for exploration. Every advancement in space technology brings us closer to answering profound questions about our existence and the nature of reality itself.

  As we continue to explore the vastness of space, we discover not only new worlds but also new perspectives on our place in the universe. The study of celestial bodies and cosmic phenomena broadens our understanding of life on Earth, revealing the interconnectedness of all things. Each star we observe and every planet we study serves as a reminder of the infinite possibilities that lie beyond our atmosphere.

  In summary, the quick brown fox symbolizes the playful dance of nature, while technology serves as our guide through an ever-evolving landscape of uncertainty. Our innate curiosity drives us to explore the cosmos, seeking knowledge and understanding in a universe filled with mysteries. Together, these elements highlight the dynamic interplay between nature, technology, and human ambition, painting a rich tapestry of life and discovery.
`;
*/

const title = "Key Points";
const points = [
  "Identify areas that need more evidence or elaboration.",
  "At its core, Game of Thrones is about the quest for the Iron Throne, which symbolizes control over the Seven Kingdoms. Themes of loyalty, betrayal, and the corrupting nature of power dominate the narrative. The story also includes mystical elements such as dragons, the undead, and ancient prophecies.",
];

const CommentPage: React.FC = () => {
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [commentPositions, setCommentPositions] = useState<{ [key: number]: number }>({});
  const [matchedStatement, setMatchedStatement] = useState<any>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const pageText = location.state?.statement || "No statement provided.";

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id);
  };

  useEffect(() => {
    const fetchAndUpdateStatement = async () => {

      const fetchedMatchedStatement = await fetchAndMatchEssay(pageText);
      setMatchedStatement(fetchedMatchedStatement);

      const currentTextRef = textRef.current;
      if (currentTextRef) {
        const newPositions: { [key: number]: number } = {};
        mockData.forEach((comment) => {
          const element = currentTextRef.querySelector(`[data-highlight-id="${comment.id}"]`);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            newPositions[comment.id] = rect.top + scrollTop;
          }
        });
        setCommentPositions(newPositions);
      }
    };

    fetchAndUpdateStatement();
    window.addEventListener("resize", fetchAndUpdateStatement); // Update on resize

    return () => {
      window.removeEventListener("resize", fetchAndUpdateStatement); // Cleanup on unmount
    };
  }, [pageText]);

  const renderTextWithHighlights = () => {
    let result = [];
    let currentIndex = 0;

    mockData.forEach((comment) => {
      const startIndex = matchedStatement.indexOf(comment.highlight, currentIndex);
      if (startIndex !== -1) {
        if (startIndex > currentIndex) {
          result.push(<span key={`text-${currentIndex}`}>{matchedStatement.slice(currentIndex, startIndex)}</span>);
        }

        result.push(
          <span
            key={`highlight-${comment.id}`}
            data-highlight-id={comment.id}
            className={`bg-yellow-300 cursor-pointer ${activeComment === comment.id ? "bg-orange-300" : ""}`}
            onClick={() => handleHighlightClick(comment.id)}
          >
            {comment.highlight}
          </span>
        );

        currentIndex = startIndex + comment.highlight.length;
      }
    });

    if (currentIndex < matchedStatement.length) {
      result.push(<span key={`text-${currentIndex}`}>{matchedStatement.slice(currentIndex)}</span>);
    }

    return result;
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto p-4">
        <div className="w-3/4 pr-4">
          <h1 className="text-center px-16 pt-3.5 pb-3.5 max-w-full text-base font-bold text-black bg-white rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full">
            Short title
          </h1>
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto p-4">
        <div className="w-3/4 pr-4">
          <div
            ref={textRef}
            className="bg-white p-20 bg-white rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          >
            <p>{renderTextWithHighlights()}</p>
          </div>
        </div>
        <div className="w-1/4 relative">
          {mockData.map((comment) => (
            <div
              key={comment.id}
              className={`absolute left-0 right-0 bg-gray-100 p-2 rounded-lg transition-opacity duration-300 ${
                activeComment === comment.id ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                top: `${commentPositions[comment.id]}px`,
                transform: "translateY(-350%)",
              }}
            >
              <p className="text-sm">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

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
    </>
  );
};

export default CommentPage;