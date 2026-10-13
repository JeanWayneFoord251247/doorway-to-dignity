import mongoose from 'mongoose';

const volunteerRosterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, default: '' },
    selectedRole: { type: String, default: '' },
    rolesNeeded: [{ type: String }],
    volunteersCurrent: { type: Number, default: 0 },
    volunteersMax: { type: Number, required: true },
    volunteersList: [volunteerRosterSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;