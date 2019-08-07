import * as mongoose from 'mongoose';

export const versionSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  last_update: {
    type: Date,
    default: Date.now,
  },
  link: {
    rel: {
      type: String,
    },
    href: {
      type: String,
    },
  },
  map: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Map',
    },
    link: {
      rel: {
        type: String,
      },
      href: {
        type: String,
      },
    },
  },
});
