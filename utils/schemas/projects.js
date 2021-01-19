const joi = require('@hapi/joi');

const projectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const projectTitleSchema = joi.string().max(120);
const projectDescriptionSchema = joi.string().max(300);
const projectLinkSchema = joi.string().uri();
const projectImageUrlSchema = joi.string().uri();
const projectHeroImageSchema = joi.string().uri();
const projectInitialImageSchema = joi.string().uri();
const projectImagesSchema = joi.array().items(joi.string().uri());
const projectCategorySchema = joi.string().max(30);

const createProjectSchema = {
  title: projectTitleSchema.required(),
  description: projectDescriptionSchema.required(),
  link: projectLinkSchema.required(),
  imageUrl: projectImageUrlSchema.required(),
  hero: projectHeroImageSchema.required(),
  initialImage: projectInitialImageSchema.required(),
  images: projectImagesSchema,
  category: projectCategorySchema.required(),
};

const updateProjectSchema = {
  title: projectTitleSchema,
  description: projectDescriptionSchema,
  link: projectLinkSchema,
  imageUrl: projectImageUrlSchema,
  hero: projectHeroImageSchema,
  initialImage: projectInitialImageSchema,
  images: projectImagesSchema,
  category: projectCategorySchema,
};

module.exports = {
  projectIdSchema,
  createProjectSchema,
  updateProjectSchema,
};
