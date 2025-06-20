import tagsData from '../mockData/tags.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tags = [...tagsData];

const tagService = {
  async getAll() {
    await delay(200);
    return [...tags];
  },

  async getById(id) {
    await delay(150);
    const tag = tags.find(t => t.Id === parseInt(id, 10));
    if (!tag) {
      throw new Error('Tag not found');
    }
    return { ...tag };
  },

  async create(tagData) {
    await delay(300);
    const highestId = tags.length > 0 ? Math.max(...tags.map(t => t.Id)) : 0;
    const newTag = {
      ...tagData,
      Id: highestId + 1
    };
    tags.push(newTag);
    return { ...newTag };
  },

  async update(id, updateData) {
    await delay(250);
    const index = tags.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Tag not found');
    }
    
    const updatedTag = {
      ...tags[index],
      ...updateData,
      Id: tags[index].Id // Prevent Id modification
    };
    
    tags[index] = updatedTag;
    return { ...updatedTag };
  },

  async delete(id) {
    await delay(200);
    const index = tags.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Tag not found');
    }
    tags.splice(index, 1);
    return true;
  }
};

export default tagService;