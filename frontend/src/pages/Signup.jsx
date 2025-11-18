import React, { useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// 1. UPDATED: Import the correct hook
import { useAuth } from "../hooks/useAuth";
import {CameraIcon , PlusIcon , TrashIcon}  from '../components/ui/icons.jsx'

// --- Reusable Components ---

const FormInput = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required,
  disabled,
  autocomplete
}) => (
  <div className="flex-1 min-w-[48%]">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autocomplete}
      className={`mt-1 w-full bg-gray-100 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-indigo-500"} disabled:bg-gray-200`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const FormSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  children,
}) => (
  <div className="flex-1 min-w-[48%]">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 w-full bg-gray-100 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-indigo-500"}`}
    >
      {children}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const FormTextarea = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
}) => (
  <div className="flex-1 min-w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="3"
      className={`mt-1 w-full bg-gray-100 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-transparent focus:ring-indigo-500"}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center mb-8">
    {Array.from({ length: totalSteps }, (_, i) => (
      <React.Fragment key={i}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i + 1 <= currentStep ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"}`}
        >
          {" "}
          {i + 1}{" "}
        </div>
        {i < totalSteps - 1 && (
          <div
            className={`flex-auto border-t-2 transition-all duration-500 ${i + 1 < currentStep ? "border-indigo-600" : "border-gray-200"}`}
          ></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

// --- Form Step Components (Refactored for new Schema) ---

const Step1_BasicInfo = ({
  data,
  handleInputChange,
  handleAvatarChange,
  avatarPreview,
  errors,
}) => {
  const fileInputRef = useRef(null);
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Let's start with the basics
      </h2>
      <p className="text-center text-gray-500 mb-6">
        We'll need some basic information to create your account.
      </p>
      <div className="flex flex-col items-center mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="group relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <CameraIcon />
          )}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Upload a profile photo (optional)
        </p>
      </div>
      <div className="space-y-4">
        <FormInput
          id="name"
          name="name"
          label="Full Name"
          value={data.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          error={errors.name}
          required
        />
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={data.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          error={errors.email}
          required
        />
        <FormInput
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={handleInputChange}
          placeholder="+91 12345 67890"
          error={errors.phone}
          autoComplete="tel"
          required
        />
        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={data.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          error={errors.password}
          autoComplete="new-password"
          required
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={data.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
        />
      </div>
    </>
  );
};

const Step2_Education = ({
  education,
  handleEducationChange,
  addEducation,
  removeEducation,
  errors,
}) => (
  <>
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Education Details
    </h2>
    <p className="text-center text-gray-500 mb-8">
      Add your educational background, starting with the most recent.
    </p>
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg bg-white relative">
          <h3 className="font-semibold text-lg mb-4">
            Education Entry #{index + 1}
          </h3>
          {education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            >
              <TrashIcon />
            </button>
          )}
          <div className="flex flex-wrap gap-4">
            <FormSelect
              id={`level-${index}`}
              name="level"
              label="Level"
              value={edu.level}
              onChange={(e) => handleEducationChange(index, e)}
              error={errors[index]?.level}
              required
            >
              <option value="">Select Level</option>
              <option value="Secondary (10th)">Secondary (10th)</option>
              <option value="Senior Secondary (12th)">
                Senior Secondary (12th)
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Graduation">Graduation</option>
              <option value="Post-Graduation">Post-Graduation</option>
              <option value="PhD">PhD</option>
              <option value="Certification">Certification</option>
            </FormSelect>
            <FormInput
              id={`institution-${index}`}
              name="institution"
              label="Institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., Ramjas College"
              error={errors[index]?.institution}
              required
            />
            <FormInput
              id={`awardingBody-${index}`}
              name="awardingBody"
              label="Awarding Body"
              value={edu.awardingBody}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., University of Delhi"
            />
            <FormInput
              id={`degree-${index}`}
              name="degree"
              label="Degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., Bachelor of Commerce"
            />
            <FormInput
              id={`fieldOfStudy-${index}`}
              name="fieldOfStudy"
              label="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., Commerce"
            />
            <FormInput
              id={`startDate-${index}`}
              name="startDate"
              label="Start Year"
              type="number"
              value={edu.startDate}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., 2020"
              error={errors[index]?.startDate}
              required
            />
            <FormInput
              id={`endDate-${index}`}
              name="endDate"
              label="End Year"
              type="number"
              value={edu.endDate}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., 2024"
              disabled={edu.status === "Ongoing"}
            />
            <FormInput
              id={`score-${index}`}
              name="score"
              label="Score"
              value={edu.score}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="e.g., 8.5 CGPA or 92%"
            />
            <FormSelect
              id={`status-${index}`}
              name="status"
              label="Status"
              value={edu.status}
              onChange={(e) => handleEducationChange(index, e)}
              error={errors[index]?.status}
              required
            >
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
            </FormSelect>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50 hover:border-indigo-500"
      >
        <PlusIcon /> Add Another Education
      </button>
    </div>
  </>
);

const Step3_Experience = ({
  data,
  handleInputChange,
  experience,
  handleExperienceChange,
  addExperience,
  removeExperience,
  errors,
}) => (
  <>
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Work & Internship Experience
    </h2>
    <p className="text-center text-gray-500 mb-8">
      Share your professional experience to showcase your skills.
    </p>

    <div className="p-6 border rounded-lg bg-white mb-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">
          Do you have work or internship experience?
        </h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="hasExperience"
            checked={data.hasExperience}
            onChange={(e) =>
              handleInputChange({
                target: { name: "hasExperience", value: e.target.checked },
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
    </div>

    {data.hasExperience ? (
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white relative">
            <h3 className="font-semibold text-lg mb-4">
              Experience Entry #{index + 1}
            </h3>
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
              >
                <TrashIcon />
              </button>
            )}
            <div className="flex flex-wrap gap-4">
              <FormInput
                id={`title-${index}`}
                name="title"
                label="Title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="e.g., Software Engineer Intern"
                error={errors[index]?.title}
                required
              />
              <FormInput
                id={`company-${index}`}
                name="company"
                label="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="e.g., Google"
                error={errors[index]?.company}
                required
              />
              <FormInput
                id={`location-${index}`}
                name="location"
                label="Location"
                value={exp.location}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="e.g., Bengaluru, India"
              />
              <FormInput
                id={`from-${index}`}
                name="from"
                label="From"
                type="date"
                value={exp.from}
                onChange={(e) => handleExperienceChange(index, e)}
                error={errors[index]?.from}
                required
              />
              <FormInput
                id={`to-${index}`}
                name="to"
                label="To"
                type="date"
                value={exp.to}
                onChange={(e) => handleExperienceChange(index, e)}
                disabled={exp.isCurrent}
              />
              <div className="w-full flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`isCurrent-${index}`}
                  name="isCurrent"
                  checked={exp.isCurrent}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`isCurrent-${index}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  I currently work here
                </label>
              </div>
              <FormTextarea
                id={`description-${index}`}
                name="description"
                label="Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Describe your roles and responsibilities..."
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-dashed border-gray-400 rounded-md text-gray-700 hover:bg-gray-50 hover:border-indigo-500"
        >
          <PlusIcon /> Add Another Experience
        </button>
      </div>
    ) : (
      <div className="p-8 border rounded-lg bg-white text-center">
        <p className="font-semibold text-lg text-gray-700">
          No experience yet? That's okay!
        </p>
        <p className="text-gray-500 mt-2">
          Everyone starts somewhere. You can always add it later from your
          dashboard.
        </p>
      </div>
    )}
  </>
);

const Step4_Skills = ({ data, handleInputChange, errors }) => (
  <>
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Skills & Languages
    </h2>
    <p className="text-center text-gray-500 mb-8">
      Showcase your technical skills.
    </p>
    <div className="p-6 border rounded-lg bg-white">
      <FormInput
        id="skills"
        name="skills"
        label="Technical Skills"
        value={data.skills}
        onChange={handleInputChange}
        placeholder="e.g., JavaScript, Python, React"
        error={errors.skills}
        required
      />
      <p className="text-xs text-gray-500 mt-1">
        Add at least one skill. Separate multiple skills with a comma.
      </p>
    </div>
  </>
);

const Step5_FinalDetails = ({ data, handleInputChange, errors }) => (
  <>
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Almost Done!
    </h2>
    <p className="text-center text-gray-500 mb-8">
      Just a few more details and you'll be ready to go.
    </p>
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-white">
        <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="address"
            name="address"
            label="Permanent Address"
            value={data.address}
            onChange={handleInputChange}
            placeholder="City, State, Country"
            error={errors.address}
            required
          />
          <FormInput
            id="dob"
            name="dob"
            label="Date of Birth"
            type="date"
            value={data.dob}
            onChange={handleInputChange}
            error={errors.dob}
            required
          />
        </div>
      </div>
      <div className="p-6 border rounded-lg bg-white">
        <h3 className="font-semibold text-lg mb-4">Terms & Conditions</h3>
        <div className="flex items-start">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={data.agreeTerms}
            onChange={(e) =>
              handleInputChange({
                target: { name: "agreeTerms", value: e.target.checked },
              })
            }
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
          />
          <div className="ml-3 text-sm">
            <label
              htmlFor="agreeTerms"
              className={`font-medium ${errors.agreeTerms ? "text-red-600" : "text-gray-700"}`}
            >
              I agree to CraftFolio's{" "}
              <Link to="/terms" className="text-indigo-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
        </div>
      </div>
    </div>
  </>
);

// --- Main Multi-Step Form Component ---

const SignUpForm = () => {
  // 2. UPDATED: Get 'token' from useAuth, not 'user' or 'login'
  const { token } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    avatar: null,
    education: [
      {
        level: "",
        institution: "",
        awardingBody: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        score: "",
        status: "Completed",
      },
    ],
    hasExperience: false,
    // 3. FIXED: Initialize experience as an empty array
    experience: [],
    skills: "",
    address: "",
    dob: "",
    agreeTerms: false,
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index][name] = value;
    if (name === "status" && value === "Ongoing")
      updatedEducation[index].endDate = "";
    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          level: "",
          institution: "",
          awardingBody: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          score: "",
          status: "Completed",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperience = [...formData.experience];
    const updatedValue = type === "checkbox" ? checked : value;
    updatedExperience[index][name] = updatedValue;

    if (name === "isCurrent" && checked) {
      updatedExperience[index].to = "";
    }

    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const addExperience = () => {
    // 4. FIXED: Only add a new entry if hasExperience is true
    if (formData.hasExperience) {
      setFormData((prev) => ({
        ...prev,
        experience: [
          ...prev.experience,
          {
            title: "",
            company: "",
            location: "",
            from: "",
            to: "",
            isCurrent: false,
            description: "",
          },
        ],
      }));
    }
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Full name is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters.";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
    }
    if (step === 2) {
      const eduErrors = [];
      formData.education.forEach((edu, index) => {
        const error = {};
        if (!edu.level) error.level = "Level is required.";
        if (!edu.institution) error.institution = "Institution is required.";
        if (!edu.startDate) error.startDate = "Start year is required.";
        else if (String(edu.startDate).length !== 4)
          error.startDate = "Enter a valid 4-digit year.";
        if (edu.status === "Completed" && !edu.endDate)
          error.endDate = "End year is required for completed courses.";
        else if (edu.status === "Completed" && String(edu.endDate).length !== 4)
          error.endDate = "Enter a valid 4-digit year.";
        if (Object.keys(error).length > 0) eduErrors[index] = error;
      });
      if (eduErrors.length > 0) newErrors.education = eduErrors;
    }
    if (step === 3) {
      if (formData.hasExperience) {
        const expErrors = [];
        // Only validate if there are experience entries
        if (formData.experience.length === 0) {
            // If they toggled 'yes' but added no entries, add one
            addExperience();
        }
        formData.experience.forEach((exp, index) => {
          const error = {};
          if (!exp.title) error.title = "Title is required.";
          if (!exp.company) error.company = "Company is required.";
          if (!exp.from) error.from = "Start date is required.";
          // 5. UPDATED: Validation for 'to' date
          if (!exp.isCurrent && !exp.to) {
            error.to = "End date is required if not currently working here.";
          }
          if (Object.keys(error).length > 0) expErrors[index] = error;
        });
        if (expErrors.length > 0) newErrors.experience = expErrors;
      }
    }
    if (step === 4) {
      if (!formData.skills)
        newErrors.skills = "At least one skill is required.";
    }
    if (step === 5) {
      if (!formData.address) newErrors.address = "Address is required.";
      if (!formData.dob) newErrors.dob = "Date of birth is required.";
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to the terms.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // const handleSubmit = async () => {
  //   if (validateStep()) {
  //     const finalData = {
  //       ...formData,
  //       skills: formData.skills
  //         .split(",")
  //         .map((s) => s.trim())
  //         .filter(Boolean),
  //     };
      
  //     // 6. UPDATED: Clean up experience data before sending
  //     if (finalData.hasExperience) {
  //       finalData.experience = finalData.experience.map(exp => {
  //         if (exp.isCurrent) {
  //           return { ...exp, to: null }; // Set 'to' to null if current
  //         }
  //         return exp;
  //       });
  //     } else {
  //       finalData.experience = [];
  //     }
      
  //     delete finalData.confirmPassword;
  //     delete finalData.hasExperience;
      
  //     // We don't need to send the avatar file in the JSON
  //     // This needs to be handled with FormData, which is a bigger change.
  //     // For now, let's remove it from the JSON payload.
  //     if(!finalData.avatar)
  //     delete finalData.avatar; 
  //     console.log("Final Data Submitted:", finalData);

  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_BE_URL}/signup`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(finalData),
  //       });

  //       const result = await response.json(); // Read the response
        
  //       if (!response.ok) {
  //         throw new Error(result.message || "Something went wrong");
  //       }
        
  //       // console.log("Server Response:", result);
  //       alert("Signed up successfully! Redirecting to Login Page.");
  //       navigate("/signin");
  //     } catch (error) {
  //       console.error("Submission Failed:", error);
  //       alert(`Error: ${error.message}`);
  //     }
  //   }
  // };

const handleSubmit = async () => {
  if (validateStep()) {

    // 1. Prepare the final cleaned data (same as before)
    const finalData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (finalData.hasExperience) {
      finalData.experience = finalData.experience.map(exp =>
        exp.isCurrent ? { ...exp, to: null } : exp
      );
    } else {
      finalData.experience = [];
    }

    delete finalData.confirmPassword;
    delete finalData.hasExperience;

    // --- IMPORTANT CHANGE BELOW ---

    // 2. Create FormData (instead of JSON)
    const fd = new FormData();

    // 3. Append normal fields
    for (const key in finalData) {
      if (key === "avatar") continue; // handle separately
      if (Array.isArray(finalData[key])) {
        // Handle array correctly
        finalData[key].forEach((item, idx) => {
          if (typeof item === "object") {
            // Object inside array (education, experience)
            for (const field in item) {
              fd.append(`${key}[${idx}][${field}]`, item[field]);
            }
          } else {
            // Simple array (skills)
            fd.append(`${key}[]`, item);
          }
        });
      } else {
        fd.append(key, finalData[key]);
      }
    }

    // 4. Append the file (THIS is what Multer reads)
    if (finalData.avatar) {
      fd.append("avatar", finalData.avatar); 
    }

    console.log("Sending FormData…");
    console.log(finalData)

    // 5. Send the request (IMPORTANT: no JSON headers)
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/signup`, {
        method: "POST",
        body: fd, // ← FormData here
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      alert("Signed up successfully! Redirecting to Login Page.");
      navigate("/signin");

    } catch (error) {
      console.error("Submission Failed:", error);
      alert(`Error: ${error.message}`);
    }
  }
};


  const totalSteps = 5;

  return (
    <>
      {/* 2. UPDATED: Check for 'token' instead of 'user' */}
      {token ? (
        <Navigate to="/dashboard" />
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-3xl mx-auto">
            <div className="mb-3 text-center">
              {" "}
              {/* Changed from mb-2 to mb-8 and wrapped in div */}
              <Link to="/" className="text-3xl font-bold text-indigo-700">
                CraftFolio
              </Link>
            </div>
            <StepIndicator currentStep={step} totalSteps={totalSteps} />
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
              {step === 1 && (
                <Step1_BasicInfo
                  data={formData}
                  handleInputChange={handleInputChange}
                  handleAvatarChange={handleAvatarChange}
                  avatarPreview={avatarPreview}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <Step2_Education
                  education={formData.education}
                  handleEducationChange={handleEducationChange}
                  addEducation={addEducation}
                  removeEducation={removeEducation}
                  errors={errors.education || []}
                />
              )}
              {step === 3 && (
                <Step3_Experience
                  data={formData}
                  handleInputChange={handleInputChange}
                  experience={formData.experience}
                  handleExperienceChange={handleExperienceChange}
                  addExperience={addExperience}
                  removeExperience={removeExperience}
                  errors={errors.experience || []}
                />
              )}
              {step === 4 && (
                <Step4_Skills
                  data={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              )}
              {step === 5 && (
                <Step5_FinalDetails
                  data={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              )}

              <div
                className={`mt-8 flex ${step > 1 ? "justify-between" : "justify-end"}`}
              >
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {step < totalSteps && (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Next Step
                  </button>
                )}
                {step === totalSteps && (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;