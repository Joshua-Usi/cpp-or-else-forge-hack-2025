import api, { route } from "@forge/api"

const CONFLUENCE_INSTANCE = "atl-forgehack2-team-11"

export async function fetchFile(payload) {
    if (!payload || !payload.title) {
        console.error("payload.title is missing or undefined", payload);
        return;
    }
    const title = payload.title
    console.log("Fetching page with title:", title);

    const response = await api.asUser().requestConfluence(route`/wiki/api/v2/pages?title=${title}`, {
        headers: { 'Accept': 'application/json' }
    });

    /* Check response status */
    if (!response.ok) {
        console.error(`Request failed with status ${response.status} (${response.statusText})`);
        console.error(`${response}`)
        return;
    }

    /* Check data status */
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
        console.error("Unexpected response format", data);
        return;
    }

    const result = await Promise.all(
        data.results.map(async (page) => {
            const pageResponse = await api.asUser().requestConfluence(route`/wiki/api/v2/pages/${page.id}?body-format=atlas_doc_format`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!pageResponse.ok) {
                console.error(`Failed to fetch page ${page.id} with status ${pageResponse.status}`);
                return null;
            }
            return pageResponse.json();
        })
    );

    return result.filter(Boolean); // Remove null values from failed fetches
}

export async function fetchRecentPages(count) {
    const cql = 'type=page ORDER BY lastmodified DESC';
    const response = await api.asUser().requestConfluence(route`/wiki/rest/api/content/search?cql=${cql}&limit=${count}`);

    if (!response.ok) {
        const error = await response.json();
        console.error('fetching recent pages:', error);
        return { success: false, error };
    }

    const data = await response.json();
    console.log(data)
    return {
        success: true,
        recentPages: data.results.map(page => ({
            id: page.id,
            title: page.title,
            url: `https://${CONFLUENCE_INSTANCE}${page._links.webui}`,
            space: page.space ? page.space.name : "Unknown Space"
        }))
    };
}

export async function summarizePullRequest(payload) {
    console.log("Payload to summarize code changes:", payload);
    try {

        const { repoUrl } = payload;

        // Example data bc I cbf to link it to an actual repo. We could do it later
        const commits = [
            { id: "f3f2d01", message: "Fix CI/CD bug." },
            { id: "f3f2d02", message: "Refactor index.js." },
            { id: "f3f2d03", message: "Fixed a security issue in manifest.yml." },
            { id: "f3f2d04", message: "2.2.0 Release." }
        ];

        const summary = `Recent code changes:
- Commits: ${commits.map((c) => c.id).join(", ")}
- Commit message: ${commits.map((c) => c.message).join(" | ")}`;

        return { success: true, summary: summary };
    } catch (error) {
        console.error("Could not summarize pull request:", error);
        return { success: false, error: error };
    }
}

export async function generateDocumentation(payload) {
    try {
        console.log("Payload for documentation generation:", payload);

        const { issueKey } = payload;

        const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueKey}`);
        let issueData = await response.json();

        const docTemplate = `
# Release Notes for ${issueData.key}
## Summary
${issueData.summary}

## Description
${issueData.description}

- Reporter: ${issueData.reporter}

## Proposed Documentation
- Affected Modules:
- Steps to Reproduce:
- Quick Fix Steps:

Fetch, please fill in the blanks and add information as necessary
`;
        return { success: true, generatedDoc: docTemplate };
    } catch (error) {
        console.error("Could not generate documentation:", error);
        return { success: false, error: error };
    }
}


/* Detect and get the top 5 documents edited longer than 30 days ago */
export async function findStaleInformation(payload) {
    console.log("Payload for stale detection:", payload);
    try {
        const { daysOld } = payload;
        const cql = `type=page and lastmodified < now("-${daysOld}d") order by lastmodified asc`;
        const response = await api.asUser().requestConfluence(route`/wiki/rest/api/content/search?cql=${cql}&limit=5`);
        if (!response.ok) {
            return { success: false, error: `Confluence search failed with status: ${response.status}` };
        }
        const data = await response.json();

        const stalePages = data.results.map((page) => ({
            id: page.id,
            title: page.title,
            lastModified: page.version.when,
            url: page._links ? page._links.self : "Unknown",
        }));

        return { success: true, stalePages: stalePages };
    } catch (error) {
        console.error("Could not detect stale information:", error);
        return { success: false, error: error };
    }
}

export async function getUserName() {
console.log("Payload for stale detection:", payload);
    try {
        const response = await api.asUser().requestConfluence(route`/rest/api/3/myself`);
        const data = await response.json();

        const displayName = data.displayName;

        // Return the display name
        return { body: `User goes by ${data.displayName}.` };
    } catch (error) {
        console.error('Error fetching user information:', error);
        return { body: 'Could not find user, greet generically.' };
    }
}