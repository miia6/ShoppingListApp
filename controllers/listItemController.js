import * as listItemService from "../services/listItemService.js";

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}`, {
        status: 303,
        headers: {
        "Location": path,
        },
    });
};

const createListItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    await listItemService.createListItem(urlParts[2], name);

    return redirectTo(`/lists/${urlParts[2]}`);
};

const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listItemService.collectItem(urlParts[4]);

    return redirectTo(`/lists/${urlParts[2]}`);
};

export { createListItem, collectItem };