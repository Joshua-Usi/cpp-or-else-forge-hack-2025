import api, { route } from "@forge/api"

export async function getUserName(payload) {
    console.log("Payload for stale detection:", payload);
    try {
        const response = await api.asUser().requestJira(route`/rest/api/2/myself`);
        const data = await response.json();

        const displayName = await data.displayName;

        console.log("displayName:",data)
        return displayName
    } catch (error) {
        console.error('Error fetching user information:', error);
        return { body: 'Could not find user, greet generically.' };
    }
}
