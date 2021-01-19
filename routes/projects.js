const express = require('express');
const projectsServices = require('../services/projects');
const { projectIdSchema, createProjectSchema, updateProjectSchema } = require('../utils/schemas/projects');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { SIXTY_MINUTES_IN_SECONDS, FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

const projectsApi = (app) => {
  const router = express.Router();
  app.use('/api/projects', router);

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    const { tags } = req.query;

    try {
      const projects = await projectsServices.getProjects({ tags });
      res.status(200).json({
        data: projects,
        message: 'projects listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:projectId',
    validationHandler({ projectId: projectIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

      const { projectId } = req.params;

      try {
        const projects = await projectsServices.getProject(projectId);

        res.status(200).json({
          data: projects,
          message: 'project retrieved',
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.post(
    '/',
    validationHandler(createProjectSchema),
    async (req, res, next) => {
      const { body: project } = req;

      try {
        const createdProjectId = await projectsServices.createProject(project);

        res.status(201).json({
          data: createdProjectId,
          message: 'project created',
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.put(
    '/:projectId',
    validationHandler({ projectId: projectIdSchema }, 'params'),
    validationHandler(updateProjectSchema),
    async (req, res, next) => {
      const { projectId } = req.params;
      const { body: project } = req;

      try {
        const updatedProjectId = await projectsServices.updateProject(projectId, project);

        res.status(200).json({
          data: updatedProjectId,
          message: 'project updated',
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.delete(
    '/:projectId',
    validationHandler({ projectId: projectIdSchema }, 'params'),
    async (req, res, next) => {
      const { projectId } = req.params;

      try {
        const deletedProjectId = await projectsServices.deleteProject(projectId);

        res.status(200).json({
          data: deletedProjectId,
          message: 'project deleted',
        });
      } catch (err) {
        next(err);
      }
    },
  );
};

module.exports = projectsApi;
