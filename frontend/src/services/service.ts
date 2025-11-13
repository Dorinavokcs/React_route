import app from "../lib/app"
import type { PatchUser, PostUser, publicUser } from "../types/user";

export async function fetchUsers(): Promise<publicUser[]>{
    const res = await app.get("/users");
    return res.data
}
export async function postUser(data:PostUser):Promise<publicUser> {
    const res = await app.post("/users", data);
    return res.data;
}
export async function patchUser(id:number, data:PatchUser){
    const res = await app.patch(`/users${id}`, data)
    return res.data
}
export async function delUser(id:number):Promise<publicUser>{
    const res = await app.delete(`/users/${id}`)
    return res.data
}