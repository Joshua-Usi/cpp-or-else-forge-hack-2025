import api, { route } from '@forge/api'

export async function fetchAllIssues(payload) {
  console.log(payload.keyword);
  try {
    const jql = "ORDER BY created DESC";
    const issuesResponse = await 
    api.asUser().requestJira(route`/rest/api/3/search?jql=${jql}`);

    const issuesJson = await issuesResponse.json();

    console.log('Issues JSON Response:', issuesJson);

    // If a keyword is provided, filter the results.
    let filteredIssues = jsonIssues;

    if (payload.keyword) {
      const lowerKeyword = payload.keyword.toLowerCase();
      filteredIssues = mappedIssues.filter(
        issue =>
          issue.summary.toLowerCase().includes(lowerKeyword) ||
          issue.description.content[0].content[0].text.toLowerCase().includes(lowerKeyword) ||
          issue.description.type.toLowerCase().includes(lowerKeyword)
      );
    }

    console.log('Filtered Issues:', filteredIssues);

    return { issue: filteredIssues };
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
}
