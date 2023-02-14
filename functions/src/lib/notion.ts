import { Client } from "@notionhq/client";
import { IOrder } from "../../../types/order";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

import { PurchaseStatus } from "../../../types/purchase";

export const addUserToNotion = async (order: IOrder) => {
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
              content: order.user.fullname,
            },
          },
        ],
      },
      "E-mail": {
        email: order.user.email,
      },
      // "Link de Entrada": {
      //   url: "https://entradas.lacrypta.com.ar/entrada/" + purchase.id,
      // },
    },
    children: [
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Formulario llenado",
              },
            },
          ],
        },
      },
    ],
  });

  return response;
};

export const updateNotionLNURL = async (
  id: string,
  { lnurl }: { lnurl: string }
) => {
  const response = await notion.blocks.children.append({
    block_id: id,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Ready",
              },
            },
          ],
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              text: {
                content: "Link for Lightning network.",
                link: {
                  url: "https://lacrypta.com.ar/" + lnurl,
                },
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
  return response;
};

interface NotionMeta {
  lnUrl?: string;
  preference_id?: string;
}

export const updateNotionStatus = async (
  id: string,
  status: PurchaseStatus,
  meta: NotionMeta
) => {
  const response = await notion.blocks.children.append({
    block_id: id,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Status:" + status,
              },
            },
          ],
        },
      },
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Meta",
              },
            },
          ],
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(meta),
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
  return response;
};
