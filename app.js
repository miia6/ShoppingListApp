import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as listItemController from "./controllers/listItemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}`, {
        status: 303,
        headers: {
        "Location": path,
        },
    });
};

const handleRequest = async (request) => { 
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
        return await listController.statistics();
    }
    else if (request.method === "GET" && url.pathname === "/lists") {
        return await listController.viewLists(request);
    } 
    else if (request.method === "POST" && url.pathname === "/lists") {
        return await listController.addList(request);
    }
    else if (request.method === "POST" && url.pathname.match("lists/[0-9]+/deactivate")) {
        return await listController.deActivateList(request);
    }
    else if (request.method === "GET" && url.pathname.match("lists/[0-9]+")) {
        return await listController.viewList(request);
    }
    else if (request.method === "POST" && url.pathname.match("lists/[0-9]+/items/[0-9]+/collect")) {
        return await listItemController.collectItem(request);
    }
    else if (request.method === "POST" && url.pathname.match("lists/[0-9]+/items")) {
        return await listItemController.createListItem(request);
    }
};

serve(handleRequest, { port: 7777 });