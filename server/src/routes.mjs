import { Router } from "express";

import { WorkoutsRouters } from "./workouts/workouts.routes.mjs";
import { CategoriesRouters } from "./categories/categories.routes.mjs";
import { SchedulesRouters } from "./scheduled/scheduled.routes.mjs";
import { UsersRouters } from "./users/users.routes.mjs";

export const AppRouter = Router();

AppRouter.use("/workouts", WorkoutsRouters);
AppRouter.use("/categories", CategoriesRouters);
AppRouter.use("/schedules", SchedulesRouters);
AppRouter.use("/users", UsersRouters);
