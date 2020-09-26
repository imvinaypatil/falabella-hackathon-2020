/* eslint-disable no-unused-vars */
const { ObjectId } = require("mongodb");
const _find = require("lodash.find");
const _isEqual = require("lodash.isequal");
const _filter = require("lodash.filter");
const _findIndex = require("lodash.findindex");
const MockedCursor = require("./cursor");

module.exports = class MockedCollection {
  constructor(name) {
    try {
      this.repository = require(`${__dirname}/../data/${name}`).default();
    } catch (err) {
      this.repository = [];
    }
  }

  async aggregate(pipeline = [], options = {}, callback) {
    const query = pipeline.find(pipe => pipe["$match"]);
    const data = await this.find(query, options).toArray();
    return callback(undefined, data);
  }

  async countDocuments(query, options) {
    const data = await this.find(query, options).toArray();
    return data.length;
  }

  createIndex() {
    return;
  }

  createIndexes() {
    return;
  }

  async deleteMany(filter = {}, options = {}) {
    const data = await this.find(filter, options).toArray();
    data.forEach(d => this.findOneAndDelete(d));

    return {
      value: data,
      lastErrorObject: { n: data ? 1 : 0 },
      ok: data.length
    };
  }

  async deleteOne(filter = {}, options = {}) {
    const data = await this.findOne(filter, options);
    this.findOneAndDelete(data);

    return {
      value: data,
      lastErrorObject: { n: data ? 1 : 0 },
      ok: 1
    };
  }

  async distinct(key, query, options) {
    const data = await this.find(query, options).toArray();
    return [...new Set(data.map(d => d[key]))];
  }

  drop() {
    this.repository = [];
    return this.repository;
  }

  dropIndex() {
    return;
  }

  dropIndexes() {
    return;
  }

  async estimatedDocumentCount(query, options) {
    const data = await this.find(query, options).toArray();
    return data.length;
  }

  find(query = {}, options = {}) {
    let data = [];
    if (_isEqual(query, {})) {
      data = [...this.repository];
    } else if (query._id && query._id.$in) {
      data = _filter(this.repository, file => _find(query._id.$in, file.id));
    } else {
      data = _filter([...this.repository], query);
    }
    return new MockedCursor(data.slice(options.skip, options.limit));
  }

  async findOne(filter = {}, options = {}) {
    const data = _isEqual(options, {})
      ? [...this.repository]
      : [...this.repository].slice(options.skip, options.limit);
    return _find(data, filter);
  }

  async findOneAndDelete(filter = {}) {
    const index = _findIndex(this.repository, { _id: filter._id });
    /* if (index === -1) {
      throw new Error(`Document ${filter._id} not found.`);
    }
    return this.repository.splice(index, 1)[0]; */
    let value;
    if (index >= 0) {
      value = this.repository.splice(index, 1)[0];
    }
    return { value, lastErrorObject: { n: value ? 1 : 0 }, ok: 1 };
  }

  async findOneAndReplace(filter, replacement) {
    const index = _findIndex(this.repository, filter);
    /* if (index === -1) {
      throw new Error(`No document found for filter ${filter}`);
    }
    this.repository[index] = replacement;
    return this.repository[index]; */
    let value;
    if (index >= 0) {
      this.repository[index] = { ...replacement };
      value = this.repository[index];
    }
    return { value, lastErrorObject: { n: value ? 1 : 0 }, ok: 1 };
  }

  async findOneAndUpdate(filter, update) {
    const index = _findIndex(this.repository, filter);
    /* if (index === -1) {
      throw new Error(`No document found for filter ${filter}`);
    }
    this.repository[index] = { ...this.repository[index], ...update };
    return this.repository[index]; */
    let value;
    if (index >= 0) {
      this.repository[index] = { ...this.repository[index], ...update };
      value = this.repository[index];
    }
    return { value, lastErrorObject: { n: value ? 1 : 0 }, ok: 1 };
  }

  geoHaystackSearch() {
    return this.repository;
  }

  geoNear() {
    return this.repository;
  }

  indexes() {
    return;
  }

  indexExists() {
    return;
  }

  indexInformation() {
    return {};
  }

  async insertMany(docs) {
    const documents = docs.map(doc => ({
      ...doc,
      _id: doc.id || new ObjectId()
    }));
    this.repository = [...this.repository, ...documents];
    return { insertedIds: documents.map(doc => doc._id) };
  }

  async insertOne(docs) {
    const id = docs._id || new ObjectId();
    this.repository.push({ _id: id, ...docs });
    return { insertedId: id };
  }

  isCapped() {
    return false;
  }

  listIndexes() {
    return [];
  }

  mapReduce() {
    return {};
  }

  options() {
    return {};
  }

  parallelCollectionScan() {
    return [];
  }

  reIndex() {
    return;
  }

  async replaceOne(filter, replacement) {
    const index = _findIndex(this.repository, filter);
    /* if (index === -1) {
      throw new Error(`No document found for filter ${filter}`);
    }
    this.repository[index] = replacement;
    return this.repository[index]; */
    let value;
    if (index >= 0) {
      this.repository[index] = { ...replacement };
      value = this.repository[index];
    }
    return { value, lastErrorObject: { n: value ? 1 : 0 }, ok: 1 };
  }

  stats() {
    return {};
  }

  async updateMany(filter, update, options) {
    const data = await this.find(filter, options).toArray();
    data.forEach(d => {
      d = { ...d, update };
    });
    return {
      value: data,
      lastErrorObject: { n: data ? data.length : 0 },
      ok: data.length
    };
  }

  async updateOne(filter, update) {
    const index = _findIndex(this.repository, filter);
    /* if (index === -1) {
      throw new Error(`No document found for filter ${filter}`);
    }
    this.repository[index] = { ...this.repository[index], ...update };
    return this.repository[index]; */
    let value;
    if (index >= 0) {
      this.repository[index] = { ...this.repository[index], ...update };
      value = this.repository[index];
    }
    return { value, lastErrorObject: { n: value ? 1 : 0 }, ok: 1 };
  }

  watch() {
    return;
  }
};
