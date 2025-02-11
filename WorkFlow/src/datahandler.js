
import api, { route } from '@forge/api';

export async function fetchAllIssues(payload) {
  console.log(payload.keyword);
  try {
    const jql = "ORDER BY created DESC";
    const issuesResponse = await api.asUser().requestJira(route`/rest/api/3/search?jql=${jql}`);

    const issuesJson = await issuesResponse.json();

    console.log('Issues JSON Response:', issuesJson);

    let filteredIssues = issuesJson.issues || [];

    console.log('filterdIssues :' ,filteredIssues);

    if (payload.keyword) {
      const lowerKeyword = payload.keyword.toLowerCase();

      filteredIssues = filteredIssues.filter(issue => {
        const summary = issue.fields?.summary ? issue.fields.summary.toLowerCase() : '';
        const descriptionType = issue.fields?.description?.type ? issue.fields.description.type.toLowerCase() : '';

        // Ensure description content is properly accessed
        const descriptionText = issue.fields?.description?.content?.[0]?.content?.[0]?.text 
          ? issue.fields.description.content[0].content[0].text.toLowerCase() 
          : '';

        return summary.includes(lowerKeyword) || descriptionText.includes(lowerKeyword) || descriptionType.includes(lowerKeyword);
      });
    }

    console.log('Filtered Issues:', filteredIssues);

    return { issue: filteredIssues };
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
}

