import { Router } from "express";
import { tokenHandler } from "./helpers/tokenHandler";
import { UserController } from "./controllers/UserController";
import { PropertyController } from "./controllers/PropertyController";
import { ProjectController } from "./controllers/ProjectController";
import { MacroActivityController } from "./controllers/MacroActivityController";
import { MicroActivityController } from "./controllers/MicroActivityController";
import { TasksController } from "./controllers/TasksController";
import { MachinesController } from "./controllers/MachinesController";
import { EmployeesController } from "./controllers/EmployeesController";

const router = Router();

const userController = new UserController();
router.post("/users/create", userController.create);
router.post("/users/login", userController.login);

router.use(tokenHandler().middleware);

const propertyController = new PropertyController();
router.get("/properties", propertyController.list);
router.post("/properties", propertyController.create);

const projectController = new ProjectController();
router.get("/projects/types", projectController.listTypes);
router.get("/:property/projects/", projectController.list);
router.get("/projects/:id", projectController.find);
router.post("/:property/projects/", projectController.create);
router.patch("/projects/:id", projectController.update);

const macroActivityController = new MacroActivityController();
router.get("/:project/macroActivity/", macroActivityController.list);
router.get("/macroActivity/:id", macroActivityController.find);
router.post("/:project/macroActivity/", macroActivityController.create);
router.patch("/macroActivity/:id", macroActivityController.update);

const microActivityController = new MicroActivityController();
router.get("/:macroActivity/microActivity/", microActivityController.list);
router.get("/microActivity/:id", microActivityController.find);
router.post("/:macroActivity/microActivity/", microActivityController.create);
router.patch("/microActivity/:id", microActivityController.update);

const tasksController = new TasksController();
router.get("/:employee/tasks/", tasksController.list);
router.get("/tasks/:id", tasksController.find);
router.post("/:employee/tasks/", tasksController.create);
router.patch("/tasks/:id", tasksController.update);

const machinesController = new MachinesController();
router.get("/machines/types", machinesController.listTypes);
router.get("/:property/machines/", machinesController.list);
//router.get("/machines/:id", machinesController.find);
router.post("/:property/machines/", machinesController.create);
router.patch("/machines/:id", machinesController.update);

const employeesController = new EmployeesController();
router.get("/employees/roles", employeesController.listRoles);
router.get("/:property/employees/", employeesController.list);
router.post("/:property/employees/", employeesController.create);
router.patch("/employees/:id", employeesController.update);

export { router };
