const express = require("express");
const {
  getTournaments,
  getTournamentById, // додай цей імпорт
  createTournament,
  updateTournament,
  deleteTournament,
  generateFirstRound,
  generateNextRound,
  checkTournamentName
} = require("../controllers/tournamentController");

const verifyToken = require("../middleware/authMiddleware");
const isOrganizer = require("../middleware/isOrganizer");
const router = express.Router();

// Публічний маршрут
router.get("/", getTournaments);

// Створити турнір
router.post("/", verifyToken, createTournament);

// Оновити турнір
router.put("/:id", verifyToken, isOrganizer, updateTournament);

// Видалити турнір
router.delete("/:id", verifyToken, isOrganizer, deleteTournament);

// Генерувати перший раунд
router.post("/:id/generate-first-round", verifyToken, isOrganizer, generateFirstRound);

// Генерувати наступний раунд
router.post("/:id/next-round", verifyToken, isOrganizer, generateNextRound);

// ДОДАЙ ЦЕ ПЕРЕД router.get("/:id", ...)
router.get("/check-name", checkTournamentName);

router.get("/:id", getTournamentById);

module.exports = router;
