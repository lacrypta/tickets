import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

import { IPurchase } from "../../../types/purchase";

export const addUserToNotion = async (purchase: IPurchase) => {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: process.env.NOTION_DATABASE_ID as string,
    },
    properties: {
      Nombre: {
        title: [
          {
            text: {
              content: purchase.user.fullname,
            },
          },
        ],
      },
      "E-mail": {
        email: purchase.user.email,
      },
      "Link de Entrada": {
        url: "https://entradas.lacrypta.com.ar/entrada/" + purchase.id,
      },
    },
    children: [
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Pavarotti",
              },
            },
          ],
        },
      },
    ],
  });

  return response;
};
