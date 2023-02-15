import { IPurchase } from "./../../../types/purchase";
import { Client } from "@notionhq/client";
import { IOrder } from "../../../types/order";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const addUser = async (order: IOrder) => {
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
    },
    children: [
      {
        object: "block",
        heading_1: {
          rich_text: [
            {
              text: {
                content: "Datos de Usuario",
              },
            },
          ],
        },
      },
    ],
  });

  return response;
};

export const setUserStatus = async (notion_id: string, status: string) => {
  notion.pages.update({
    page_id: notion_id,
    properties: {
      Estado: {
        status: {
          name: status,
        },
      },
    },
  });
};
export const setUserAsPaid = async (notion_id: string, purchase: IPurchase) => {
  const { id: purchaseId, payment } = purchase;
  const preferenceId = payment?.preference_id;

  setUserStatus(notion_id, "Reservado");
  return notion.blocks.children.append({
    block_id: notion_id,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "MercadoPago",
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
                content: "Preference ID: " + preferenceId,
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
                content: "Link de entrada",
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
                content:
                  "https://entradas.lacrypta.com.ar/entrada/" + purchaseId,
              },
            },
          ],
        },
      },
    ],
  });
};

export const setUserLNURL = async (notion_id: string, lnurl: string) => {
  const response = await notion.blocks.children.append({
    block_id: notion_id,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Link de Lightning Network",
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
                  url: "lightning://" + lnurl,
                },
              },
            },
          ],
        },
      },
    ],
  });
  return response;
};
