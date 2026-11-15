import mongoose from "mongoose";

const folioStatsSchema = new mongoose.Schema(
  {
    folio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Folio", required: true },
    date: { type: String, required: true },
    views: { type: Number, default: 0 },
    uniques: { type: Number, default: 0 },
    visitors: { type: [String], default: undefined, select: false },
    pages: { type: mongoose.Schema.Types.Mixed, default: {} },
    referrers: { type: mongoose.Schema.Types.Mixed, default: {} },
    devices: { type: mongoose.Schema.Types.Mixed, default: {} },
    clicks: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { versionKey: false },
);

folioStatsSchema.index({ folio_id: 1, date: 1 }, { unique: true });

export const FolioStats = mongoose.model("FolioStats", folioStatsSchema);
