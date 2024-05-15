const controller = (service)=>{
    return async (req,res,_next)=>{
        try {
            console.log(req.body,' boddyyyy');
            const response = await service(req);
            res.status(200).json(response)
        } catch (error) {
            console.log(error,' from common controller');
            res.status(error.status ?? 500).send(error)
        }
    }
}
export default controller