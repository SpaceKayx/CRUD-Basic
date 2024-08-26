import { selector } from "recoil";
import { selectAllStudent } from "../service/StudentService";



export const getAllStudent = selector({
    key:"getAllStudent",
    get: async () =>{
        try {
            const response = await selectAllStudent()
            return response.data
        } catch (error) {
            console.error(error);
            return null;
        }
    }
})