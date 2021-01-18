const joi = require('@hapi/joi');

const gameIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const gameTitleSchema = joi.string().max(120);
const gameGenreSchema = joi.array().items(joi.string().max(50));
const gameReleaseSchema = joi.number().min(1900);
const gameContentRatingSchema = joi.string().max(5);
const gamePlatformSchema = joi.array().items(joi.string().max(50));
const gameCoverSchema = joi.string().uri();
const gameDescriptionSchema = joi.string().max(300);
const gameVideosSchema = joi.array().items(joi.string().uri());
const gameImagesSchema = joi.array().items(joi.string().uri());
const gameCompanySchema = joi.string().max(120);
const gamePlayersSchema = joi.string().max(5);
const gameIsOnlineSchema = joi.string().max(5);

const createGameSchema = {
  title: gameTitleSchema.required(),
  genre: gameGenreSchema.required(),
  release: gameReleaseSchema.required(),
  contentRating: gameContentRatingSchema.required(),
  platform: gamePlatformSchema.required(),
  cover: gameCoverSchema.required(),
  description: gameDescriptionSchema.required(),
  videos: gameVideosSchema,
  images: gameImagesSchema,
  company: gameCompanySchema.required(),
  players: gamePlayersSchema,
  isOnline: gameIsOnlineSchema,
};

const updateGameSchema = {
  title: gameTitleSchema,
  genre: gameGenreSchema,
  release: gameReleaseSchema,
  contentRating: gameContentRatingSchema,
  platform: gamePlatformSchema,
  cover: gameCoverSchema,
  description: gameDescriptionSchema,
  videos: gameVideosSchema,
  images: gameImagesSchema,
  company: gameCompanySchema,
  players: gamePlayersSchema,
  isOnline: gameIsOnlineSchema,
};

module.exports = {
  gameIdSchema,
  createGameSchema,
  updateGameSchema,
};
