import tasksData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...tasksData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id, 10));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const highestId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      ...taskData,
      Id: highestId + 1,
      createdAt: new Date().toISOString(),
      completedAt: null,
      status: 'active',
      order: tasks.length + 1
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: tasks[index].Id // Prevent Id modification
    };
    
    // Handle completion status change
    if (updateData.status === 'completed' && tasks[index].status !== 'completed') {
      updatedTask.completedAt = new Date().toISOString();
    } else if (updateData.status === 'active' && tasks[index].status === 'completed') {
      updatedTask.completedAt = null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    tasks.splice(index, 1);
    return true;
  },

  async bulkUpdate(ids, updateData) {
    await delay(400);
    const updatedTasks = [];
    
    for (const id of ids) {
      const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
      if (index !== -1) {
        const updatedTask = {
          ...tasks[index],
          ...updateData,
          Id: tasks[index].Id
        };
        
        if (updateData.status === 'completed' && tasks[index].status !== 'completed') {
          updatedTask.completedAt = new Date().toISOString();
        } else if (updateData.status === 'active' && tasks[index].status === 'completed') {
          updatedTask.completedAt = null;
        }
        
        tasks[index] = updatedTask;
        updatedTasks.push({ ...updatedTask });
      }
    }
    
    return updatedTasks;
  },

  async bulkDelete(ids) {
    await delay(350);
    const deletedIds = [];
    
    for (const id of ids) {
      const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
      if (index !== -1) {
        tasks.splice(index, 1);
        deletedIds.push(parseInt(id, 10));
      }
    }
    
    return deletedIds;
  }
};

export default taskService;