import Application from "../models/applications.model.js";
import { User, InstituteAdmin } from "../models/user.model.js";

const createApplication =  async (req, res) => {
  try {
    const { name, email, phone, institute, instituteCode, address } = req.body;

    if (!name || !email || !phone || !institute|| !instituteCode || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const application = await Application.create({ name, email, phone, institute, instituteCode, address });
    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }
}

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("reviewedBy", "name email");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getApplicationById =  async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("reviewedBy", "name email");
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateApplication = async (req, res) => {
  try {
    const { status, reviewedBy } = req.body;

    if (status && !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // set reviewedBy from request user if not provided
    const reviewer = reviewedBy || req.user?._id;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy: reviewer },
      { new: true }
    ).populate("reviewedBy", "name email");

    if (!application) return res.status(404).json({ error: "Application not found" });

    // If application approved -> create InstituteAdmin user (if not exists)
    let createdInstituteAdmin = null;
    if (status === "approved") {
      try {
        // check if user already exists
        const existing = await User.findOne({ email: application.email });
        if (!existing) {
          // generate temporary password

          // create institute-admin user
          const instituteAdmin = new InstituteAdmin({
            name: application.name,
            email: application.email,
            instituteName: application.institute,
            address: application.address,
            contactNumber: application.phone,
            createdBy: reviewer || null,
          });

          const saved = await instituteAdmin.save();
          createdInstituteAdmin = { id: saved._id, email: saved.email };

          // Optionally: log or trigger email sending with tempPassword (not implemented here)
          console.info(new Date().toISOString(), "[applicationController] Created InstituteAdmin", { userId: saved._id, email: saved.email });
        } else {
          console.info(new Date().toISOString(), "[applicationController] User already exists, skipping creation", { email: existing.email, userId: existing._id });
        }
      } catch (userErr) {
        console.error("Error creating InstituteAdmin from application:", userErr);
        // do not fail the whole request — respond with application updated and info about the failure
      }
    }

    const responsePayload = { message: "Application updated", application };
    if (createdInstituteAdmin) responsePayload.createdInstituteAdmin = createdInstituteAdmin;

    res.json(responsePayload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });

    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { createApplication, getAllApplications, getApplicationById, updateApplication, deleteApplication };