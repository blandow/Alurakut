import { SiteClient } from "datocms-client";

export async function requestReciver(request, response) {

    if (request.method === 'POST') {

        const token ="258c9132bdba8b7726d4bfe9df8e85"
        const client = new SiteClient(token);

        const getData = await client.items.create({
            itemType: "975420",
            ...request.body,
        })

        response.json({
            createdData: getData,
        })
        return;
    }

    response.status(404).json({
        message:"Data not found"
    })

}