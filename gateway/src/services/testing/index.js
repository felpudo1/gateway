import { Router } from 'express';
import { handleView } from './controllers';

const router = Router()

router.get("/", async (req, res) => {

    try {

        let data = await handleView({});

        return res.status(200).json(data)

    } catch (error) {
        console.log(error.toString())
    }

});

export default router