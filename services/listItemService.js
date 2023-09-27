import { sql } from "../database/database.js";

const countItems = async () => {
  const rows = await sql`SELECT COUNT(DISTINCT id) FROM shopping_list_items`;
  return rows[0].count;
};

const createListItem = async (id, itemName) => {
    await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name) VALUES (${id}, ${itemName})`;
};

const findItems = async (id) => {
    const rows = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`;
    return rows;
};

const collectItem = async (itemId) => {
  await sql`UPDATE shopping_list_items
  SET collected = true WHERE id = ${itemId} AND collected = false`;
};

export { countItems, createListItem, findItems, collectItem };
  