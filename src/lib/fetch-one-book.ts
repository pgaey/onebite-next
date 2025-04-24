import { BookData } from "@/types";

export default async function fetchOneBook(
    id:number
):Promise<BookData | null> {
    const url = `http://localhost:12345/book/${id}`;

    try {
        const repsonse = await fetch(url);
        if(!repsonse.ok) {
            throw new Error();
        }

        return await repsonse.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}