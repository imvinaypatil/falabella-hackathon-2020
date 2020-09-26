/* eslint-disable no-unused-vars */
module.exports = class BaseRepository {
  static get COLLECTION() {
    return "";
  }

  constructor(connection) {
    this.connection = connection;
  }

  async aggregate(pipeline = [], options = {}) {
    return new Promise((resolve, reject) => {
      const callback = (error, cursor) => {
        if (error) {
          return reject(error);
        }
        return resolve(cursor);
      };
      this.connection.db
        .collection(this.constructor.COLLECTION)
        .aggregate(pipeline, options, callback);
    });
  }

  async countDocuments(query, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .countDocuments(query, options);
  }

  async createIndex(fieldOrSpec, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .createIndex(fieldOrSpec, options);
  }

  async createIndexes(indexSpecs, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .createIndexes(indexSpecs, options);
  }

  async deleteMany(filter, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .deleteMany(filter, options);
  }

  async deleteOne(filter, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .deleteOne(filter, options);
  }

  async distinct(key, query, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .distinct(key, query, options);
  }

  async drop(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .drop(options);
  }

  async dropIndex(indexName, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .dropIndex(indexName, options);
  }

  async dropIndexes(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .dropIndexes(options);
  }

  async estimatedDocumentCount(query, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .estimatedDocumentCount(query, options);
  }

  async find(query, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .find(query, options);
  }

  async findOne(filter, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .findOne(filter, options);
  }

  async findOneAndDelete(filter, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .findOneAndDelete(filter, options);
  }

  async findOneAndReplace(filter, replacement, options = {}) {
    const { _id, createdAt, lastModified, ...data } = replacement;
    return this.findOneAndUpdate(filter, { $set: data }, options);
  }

  async findOneAndReplaceOne(filter, replacement, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .findOneAndReplace(filter, replacement, options);
  }

  async findOneAndUpdate(filter, update, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .findOneAndUpdate(
        filter,
        {
          $currentDate: {
            lastModified: { $type: "date" }
          },
          ...update
        },
        options
      );
  }

  async geoHaystackSearch(x, y, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .geoHaystackSearch(x, y, options);
  }

  async geoNear(x, y, options = {}) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .geoNear(x, y, options);
  }

  async indexes(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .indexes(options);
  }

  async indexExists(indexes, options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .indexExists(indexes, options);
  }

  async indexInformation(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .indexInformation(options);
  }

  async insertMany(docs, options) {
    const createdAt = new Date();
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .insertMany(
        docs.map(doc => ({ ...doc, createdAt, lastModified: createdAt })),
        options
      );
  }

  async insertOne(doc, options) {
    const createdAt = new Date();
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .insertOne({ ...doc, createdAt, lastModified: createdAt }, options);
  }

  async isCapped(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .isCapped(options);
  }

  async listIndexes(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .listIndexes(options);
  }

  async mapReduce(map, reduce, options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .mapReduce(map, reduce, options);
  }

  async options(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .options(options);
  }

  async parallelCollectionScan(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .parallelCollectionScan(options);
  }

  async reIndex(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .reIndex(options);
  }

  async replaceOne(filter, doc, options) {
    const { _id, createdAt, lastModified, ...data } = doc;
    return this.updateOne(filter, { $set: data }, options);
  }

  async stats(options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .stats(options);
  }

  async updateMany(filter, update, options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .updateMany(
        filter,
        {
          $currentDate: {
            lastModified: { $type: "date" }
          },
          ...update
        },
        options
      );
  }

  async updateOne(filter, update, options) {
    return this.connection.db.collection(this.constructor.COLLECTION).updateOne(
      filter,
      {
        $currentDate: {
          lastModified: { $type: "date" }
        },
        ...update
      },
      options
    );
  }

  async watch(pipeline, options) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .watch(pipeline, options);
  }

  async bulkWrite(bulkOps, filter) {
    return this.connection.db
      .collection(this.constructor.COLLECTION)
      .bulkWrite(bulkOps, filter);
  }
};
