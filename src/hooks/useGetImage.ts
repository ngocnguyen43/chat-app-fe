export const GetImageUrl = async (id: string) => {
    const res = await fetch("http://localhost:5301/api/v1/file/img/" + id)
    return await res.json() as string
}
