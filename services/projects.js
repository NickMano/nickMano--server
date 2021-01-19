const MongoLib = require('../lib/mongo');

const collection = 'projects';
const mongoDB = new MongoLib();

const projectsService = {
  async getProjects({ tag }) {
    const query = tag && { tags: { $in: tag } };
    const projects = await mongoDB.getAll(collection, query);
    return projects || [];
  },

  async getProject(projectId) {
    const project = await mongoDB.get(collection, projectId);
    return project || {};
  },

  async createProject(project) {
    const createProjectId = await mongoDB.create(collection, project);
    return createProjectId;
  },

  async updateProject({ projectId, project }) {
    const updatedProjectId = await mongoDB.update(collection, projectId, project);
    return updatedProjectId;
  },

  async deleteProject({ projectId }) {
    const deletedProjectId = await mongoDB.delete(collection, projectId);
    return deletedProjectId;
  },
};

module.exports = projectsService;
