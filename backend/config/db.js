import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data', 'storage');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nourish360';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`[Database] Connected to MongoDB: ${conn.connection.host}`);
    return true;
  } catch (err) {
    isMongoConnected = false;
    console.warn(`[Database] MongoDB not reachable at ${uri}. Using persistent embedded JSON store fallback.`);
    return false;
  }
};

// Embedded Persistent Storage Engine
class JsonStore {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error(`Error loading store ${this.collectionName}:`, e);
    }
    return [];
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error(`Error saving store ${this.collectionName}:`, e);
    }
  }

  find(filter = {}) {
    let results = this.data.filter(item => {
      for (const key of Object.keys(filter)) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
    // Return Mongoose-like chainable object
    return {
      sort: (sortObj = {}) => {
        const [field, order] = Object.entries(sortObj)[0] || [];
        if (field) {
          results.sort((a, b) => {
            if (a[field] < b[field]) return order === -1 ? 1 : -1;
            if (a[field] > b[field]) return order === -1 ? -1 : 1;
            return 0;
          });
        }
        return results;
      },
      limit: (lim) => results.slice(0, lim),
      lean: () => results,
      then: (resolve) => resolve(results)
    };
  }

  async findOne(filter = {}) {
    return this.data.find(item => {
      for (const key of Object.keys(filter)) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    }) || null;
  }

  async findById(id) {
    return this.data.find(item => item._id === id || item.id === id) || null;
  }

  async create(doc) {
    const newDoc = {
      _id: doc._id || 'id_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    this.data.push(newDoc);
    this.save();
    return newDoc;
  }

  async insertMany(docs) {
    const inserted = docs.map(doc => ({
      _id: doc._id || 'id_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    }));
    this.data.push(...inserted);
    this.save();
    return inserted;
  }

  async findOneAndUpdate(filter, update, options = {}) {
    const index = this.data.findIndex(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    });

    if (index !== -1) {
      const updated = {
        ...this.data[index],
        ...(update.$set || update),
        updatedAt: new Date().toISOString()
      };
      this.data[index] = updated;
      this.save();
      return updated;
    } else if (options.upsert) {
      const newDoc = {
        _id: 'id_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
        ...filter,
        ...(update.$set || update),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.data.push(newDoc);
      this.save();
      return newDoc;
    }
    return null;
  }

  async deleteOne(filter) {
    const initialLen = this.data.length;
    this.data = this.data.filter(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] === filter[key]) return false;
      }
      return true;
    });
    this.save();
    return { deletedCount: initialLen - this.data.length };
  }

  async countDocuments(filter = {}) {
    if (Object.keys(filter).length === 0) return this.data.length;
    return this.data.filter(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    }).length;
  }
}

const stores = {};
export const getJsonStore = (name) => {
  if (!stores[name]) {
    stores[name] = new JsonStore(name);
  }
  return stores[name];
};
