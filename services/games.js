const MongoLib = require('../lib/mongo');

const collection = 'movies';
const mongoDB = new MongoLib();

const gamesService = {
  async getGames({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const games = await mongoDB.getAll(collection, query);
    return games || [];
  },

  async getGame(gameId) {
    const game = await mongoDB.get(collection, gameId);
    return game || {};
  },

  async createGame(game) {
    const createGameId = await mongoDB.create(collection, game);
    return createGameId;
  },

  async updateGame({ gameId, game }) {
    const updatedGameId = await mongoDB.update(collection, gameId, game);
    return updatedGameId;
  },

  async deleteGame({ gameId }) {
    const deletedGameId = await mongoDB.delete(collection, gameId);
    return deletedGameId;
  },
};

module.exports = gamesService;
