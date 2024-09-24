export type Comment = {
    id: number;
    text: string;
    highlight: string;
    comment: string;
  };
  
  export const mockData: Comment[] = [
    {
      id: 1,
      text: "The quick brown fox jumps over the lazy dog",
      highlight: "fox",
      comment: "Classic sentence for typing practice.",
    },
    {
      id: 2,
      text: "In a world of uncertainty, technology provides clarity",
      highlight: "technology",
      comment: "Note about the importance of tech.",
    },
    {
      id: 3,
      text: "Humans have always sought to understand the cosmos",
      highlight: "cosmos",
      comment: "Comment on human curiosity.",
    },
  ];