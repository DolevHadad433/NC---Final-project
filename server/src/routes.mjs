import { Router } from "express";

import { TrainingRouters } from "./training/training.routes.mjs";
import { CategoriesRouters } from "./categories/categories.routes.mjs";
import { SchedulesRouters } from "./scheduled/scheduled.routes.mjs";
import { UsersRouters } from "./users/users.routes.mjs";

export const AppRouter = Router();

AppRouter.use("/training", TrainingRouters);
AppRouter.use("/categories", CategoriesRouters);
AppRouter.use("/schedules", SchedulesRouters);
AppRouter.use("/users", UsersRouters);
