import { Router } from "express";

const router = Router();

// API GET: Lấy danh sách task
router.get("/detail", (req, res) => {
  res.json({ message: "Danh sách các task" });
});

// API POST: Tạo task mới
router.post("/tasks", (req, res) => {
  res.json({ message: "Tạo task thành công" });
});

// API PUT: Cập nhật task
router.put("/tasks/:id", (req, res) => {
  res.json({ message: `Cập nhật task ${req.params.id} thành công` });
});

// API DELETE: Xóa task
router.delete("/tasks/:id", (req, res) => {
  res.json({ message: `Xóa task ${req.params.id} thành công` });
});

export default router;