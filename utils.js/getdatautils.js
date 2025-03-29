import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), 'data', 'tasks.json')

export const getTasks = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) || [];
};

export const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks));
};