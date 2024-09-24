import { client, getCSRFToken } from "../../AxiosInstance/AxiosInstance";

export async function fetchAndMatchEssay(pageText: string) {
  const csrfToken = getCSRFToken();

  try {
    const response = await client.get("api/essay", {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });

    const personalStatements = response.data;

    let matchedStatement = null;

    for (const ps of personalStatements) {
      if (ps.essay === pageText) {
        matchedStatement = {
          id: ps.id,
          user: ps.user,
          title: ps.title,
          focus: ps.focus,
          field_of_study: ps.field_of_study,
          essay: ps.essay,
          reparagraphed_essay: ps.reparagraphed_essay,
          created_at: ps.created_at,
          general_comment: ps.general_comment,
          comments: ps.comments,
          number_of_comment: ps.number_of_comment,
        };
        break;
      }
    }

    if (matchedStatement) {
      console.log("Matched Statement:", matchedStatement);
    } else {
      console.log("No matching statement found.");
    }

    return matchedStatement;
  } catch (error) {
    console.error("Error fetching personal statements:", error);
    return null;
  }
}