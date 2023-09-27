import { sql } from "../database/database.js";

const countLists = async () => {
    const rows = await sql `SELECT COUNT(DISTINCT id) FROM shopping_lists`;
    return rows[0].count;
};

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const deActivateList = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
};

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
    return rows[0];
};

export { countLists, create, findAllActiveLists, deActivateList, findById };

  
  