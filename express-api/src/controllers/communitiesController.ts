import { Request, Response } from 'express';
import { query, execute } from "../db_server/db";

export async function queryCommunities(req: Request, res: Response) {
    console.log(req.query);
    const reqQuery = req.query
    const sql = "select * from communities where code = ? and name like ?";
    const params = []
    for (const key in reqQuery) {
        if (!Object.hasOwn(reqQuery, key)) continue;
        
        const element = reqQuery[key];
        if (element === "") continue;
        if (key === "name") {
            params.push(`%${element}%`)
        }else{
            params.push(element)
        }
    }
    console.log(params);
    
    const rows = await execute(sql, params)
    res.json({ code: 200, data: rows, total: rows.length });
}

export async function insCommunities(req: Request, res: Response) {
    const body = req.body
    const sql = `INSERT INTO communities (code, name, district, property_company, total_buildings, total_households) VALUES
    ("${body.code}", "${body.name}", "${body.district}", "${body.propertyCompany}", "${body.totalBuildings}", "${body.totalHouseholds}")`
    console.log(res);
    const row = await query(sql)
    let msg = ""
    if (row.affectedRows > 0) {
        msg = "添加成功!"
    }
    res.json({ code: 200, data: [], msg });
}