import api, { route } from "@forge/api"

export async function getUserName(payload) {
    try {
        // get json response with users name
        const response = await api.asUser().requestJira(route`/rest/api/2/myself`);
        const data = await response.json();

        const displayName = await data.displayName;

        return displayName
    } catch (error) {
        console.error('Error fetching user information:', error);
        return { body: 'Could not find user, greet generically.' };
    }
}
