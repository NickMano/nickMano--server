const express = require('express');
const gamesServices = require('../services/games');
const {
  gameIdSchema,
  createGameSchema,
  updateGameSchema,
} = require('../utils/schemas/games');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { SIXTY_MINUTES_IN_SECONDS, FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

const gamesApi = (app) => {
  const router = express.Router();
  app.use('/api/games', router);

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    const { tags } = req.query;

    try {
      const games = await gamesServices.getGames({ tags });
      res.status(200).json({
        data: games,
        message: 'games listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:gameId',
    validationHandler({ gameId: gameIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

      const { gameId } = req.params;

      try {
        const games = await gamesServices.getGame(gameId);

        res.status(200).json({
          data: games,
          message: 'game retrieved',
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.post(
    '/',
    validationHandler(createGameSchema),
    async (req, res, next) => {
      const { body: game } = req;

      try {
        const createdGameId = await gamesServices.createGame(game);

        res.status(201).json({
          data: createdGameId,
          message: 'game created',
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.put(
    '/:gameId',
    validationHandler({ gameId: gameIdSchema }, 'params'),
    validationHandler(updateGameSchema),
    async (req, res, next) => {
      const { gameId } = req.params;
      const { body: game } = req;

      try {
        const updatedGameId = await gamesServices.updateGame(gameId, game);

        res.status(200).json({
          data: updatedGameId,
          message: 'game updated',
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.delete(
    '/:gameId',
    validationHandler({ gameId: gameIdSchema }, 'params'),
    async (req, res, next) => {
      const { gameId } = req.params;

      try {
        const deletedGameId = await gamesServices.deleteGame(gameId);

        res.status(200).json({
          data: deletedGameId,
          message: 'game deleted',
        });
      } catch (err) {
        next(err);
      }
    },
  );
};

module.exports = gamesApi;
