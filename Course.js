const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'pdf', 'link', 'quiz'], required: true },
  url: { type: String, required: true },
  duration: { type: Number }, // بالدقائق
  description: { type: String }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  isFree: { type: Boolean, default: true },
  resources: [resourceSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Course', courseSchema);
