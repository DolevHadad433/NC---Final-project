import {Router} from 'express';

import {TrainingRouters} from './training/training.routes.mjs';
import {CategoriesRouters} from './categories/categories.routes.mjs';

export const AppRouter = Router()

AppRouter.use('/training', TrainingRouters);
AppRouter.use('/categories', CategoriesRouters);