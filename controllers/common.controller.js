const controller = (service)=>{
    return async (req,res,_next)=>{
        try {
            const response = await service(req);
            res.status(200).json(response)
        } catch (error) {
            res.status(error.status ?? 500).send(error)
        }
    }
}
export default controller