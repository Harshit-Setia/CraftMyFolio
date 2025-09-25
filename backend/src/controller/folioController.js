import { Folio } from "../model/folioModel.js";

export const getFolio = async (req, res) => {
  const id = req.params.id;
  const folio = await Folio.findOne({ user_id: id });
  if (!folio) {
    return res.status(404).json({ message: "Folio not found" });
  }
  res.status(200).json(folio);
};

export const createFolio = async (req, res) => {
  const {
    user_id,
    template_id,
    // main_color,
    // secondry_color,
    // accent_color,
    // font,
  } = req.body;
  const existingFolio = await Folio.findOne({ user_id });
  if (existingFolio) {
    return res
      .status(400)
      .json({ message: "Folio already exists for this user" });
  }
  const folio = new Folio({
    user_id,
    template_id,
    // main_color,
    // secondry_color,
    // accent_color,
    // font,
  });
  await folio.save();
  res.status(201).json(folio);
};

export const updateFolio = async (req, res) => {
  const id = req.params.id;
  const { template_id, main_color, secondry_color, accent_color, font } =
    req.body;
  const folio = await Folio.findOne({ user_id: id });
  if (!folio) {
    return res.status(404).json({ message: "Folio not found" });
  }
  folio.template_id = template_id || folio.template_id;
  folio.main_color = main_color || folio.main_color;
  folio.secondry_color = secondry_color || folio.secondry_color;
  folio.accent_color = accent_color || folio.accent_color;
  folio.font = font || folio.font;
  await folio.save();
  res.status(200).json(folio);
};

export const deleteFolio = async (req, res) => {
  const id = req.params.id;
  const folio = await Folio.findOneAndDelete({ user_id: id });
  if (!folio) {
    return res.status(404).json({ message: "Folio not found" });
  }
  res.status(200).json({ message: "Folio deleted successfully" });
};
