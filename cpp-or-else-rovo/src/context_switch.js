import api, { route } from '@forge/api';

const CONFLUENCE_INSTANCE = "atl-forgehack2-team-11";

async function fetchAllFiles() {
    try {
        const [pagesResponse, blogsResponse] = await Promise.all([
            api.asUser().requestConfluence(route`/wiki/api/v2/pages?body-format=storage`),
            api.asUser().requestConfluence(route`/wiki/api/v2/blogposts?body-format=storage`)
        ]);

        const [pages, blogs] = await Promise.all([pagesResponse.json(), blogsResponse.json()]);

        return { pages, blogs };
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
}

export async function fetchContent() {
	const files = await fetchAllFiles()
	console.log(files)
	return files;
}