import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as listItemService from "../services/listItemService.js";

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
        "Location": path,
        },
    });
};


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};
  

const statistics = async () => {
    const data = {
        listCount: await listService.countLists(),
        itemCount: await listItemService.countItems(),
    };
    
    return new Response(await renderFile("main.eta", data), responseDetails);
};
  

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await listService.create(name);

    return redirectTo("/lists");
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const data = {
      list: await listService.findById(urlParts[2]),
      listItems: await listItemService.findItems(urlParts[2]),
    };
  
    return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (request) => {
    const data = {
      lists: await listService.findAllActiveLists(),
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deActivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listService.deActivateList(urlParts[2]);
  
    return redirectTo("/lists");
};


export { statistics, addList, viewList, viewLists, deActivateList };
  