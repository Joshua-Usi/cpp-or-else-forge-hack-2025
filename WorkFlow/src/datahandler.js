
import api, {route} from '@forge/api';

export async function fetchAllIssues(payload) {
  console.log(payload.keyword);
  try {
    // jql we want the most recent issues
    const jql = 'ORDER BY created DESC';

    // get json response of all issues
    const issuesResponse =
        await api.asUser().requestJira(route`/rest/api/3/search?jql=${jql}`);
    const issuesJson = await issuesResponse.json();

    let filteredIssues = issuesJson.issues || [];

    // If a keyword is provided, filter the results
    if (payload.keyword) {
      const lowerKeyword = payload.keyword.toLowerCase();

      filteredIssues = filteredIssues.filter(issue => {
        const summary =
            issue.fields?.summary ? issue.fields.summary.toLowerCase() : '';
        const descriptionType = issue.fields?.description?.type ?
            issue.fields.description.type.toLowerCase() :
            '';

        const descriptionText =
            issue.fields?.description?.content?.[0]?.content?.[0]?.text ?
            issue.fields.description.content[0].content[0].text.toLowerCase() :
            '';

        return summary.includes(lowerKeyword) ||
            descriptionText.includes(lowerKeyword) ||
            descriptionType.includes(lowerKeyword);
      });
    }

    return {issue: filteredIssues};
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
}
