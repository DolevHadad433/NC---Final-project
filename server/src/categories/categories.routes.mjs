import {Router} from 'express';

import {getAllCategories} from './categories.data.mjs';

export const CategoriesRouters = Router();

CategoriesRouters.get('/', async(req,res)=>{
    res.send(await getAllCategories());
});
