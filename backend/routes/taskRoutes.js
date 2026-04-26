const router = require("express").Router();
const protect = require("../middleware/authMiddleware");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask   // ✅ ADD THIS
} = require("../controllers/taskController");

router.use(protect);

router.put("/:id/toggle", toggleTask);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
