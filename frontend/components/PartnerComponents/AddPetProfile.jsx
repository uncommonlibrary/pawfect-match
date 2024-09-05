import { useState } from "react";
import { addPet } from "../../services/partnerservices";
import { useNavigate, Link } from "react-router-dom";
import { uploadFile, uploadFiles } from "../../services/partnerservices";
import PartnerNavBar from "../NavBar/PartnerNavBar";

const AddPetProfile = ({ token }) => {
  const [newPetData, setNewPetData] = useState({
    name: "",
    breed: "",
    gender: "",
    birthday: "",
    color: "",
    personality: "",
    photos: [],
    profilePhoto: "",
    adoptionStage: "",
    medicalHistory: {
      sterilized: false,
      vaccinated: false,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setNewPetData({
        ...newPetData,
        medicalHistory: {
          ...newPetData.medicalHistory,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setNewPetData({ ...newPetData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(newPetData, token);
      alert("pet successfully added");
      navigate("/partner/pets");
    } catch (error) {
      console.error("error occurred while adding pet", error);
      alert("failed to add pet");
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    try {
      alert("uploading file...");
      const uploadedImageUrl = await uploadFiles(files);
      setNewPetData({ ...newPetData, photos: uploadedImageUrl });
      console.log("uploaded image url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      alert("uploading profile photo...");
      const uploadedImageUrl = await uploadFile(file);
      setNewPetData({ ...newPetData, profilePhoto: uploadedImageUrl });
      console.log("uploaded profile photo url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

  return (
    <>
      <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.3em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <PartnerNavBar />
      <h1 className="titan-one-regular">Upload a Pet Listing</h1>
      <div className="columns is-justify-content-center">
        <div className="column is-two-thirds">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Pet Name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Pet Name"
                  name="name"
                  value={newPetData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Breed:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Breed"
                  name="breed"
                  value={newPetData.breed}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Gender:</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={newPetData.gender}
                        onChange={(event) =>
                          setNewPetData({
                            ...newPetData,
                            gender: event.target.value,
                          })
                        }
                        required
                      >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Birthday:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      name="birthday"
                      value={newPetData.birthday}
                      onChange={handleChange}
                      style={{ width: "10em" }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Color:</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={newPetData.color}
                        onChange={(event) =>
                          setNewPetData({
                            ...newPetData,
                            color: event.target.value,
                          })
                        }
                        required
                      >
                        <option value=""></option>
                        <option value="Black">Black</option>
                        <option value="Blue Merle">Blue Merle</option>
                        <option value="Brindle">Brindle</option>
                        <option value="Brown">Brown</option>
                        <option value="Cream">Cream</option>
                        <option value="Gray">Gray</option>
                        <option value="Tan">Tan</option>
                        <option value="White">White</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Personality:</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={newPetData.personality}
                        onChange={(event) =>
                          setNewPetData({
                            ...newPetData,
                            personality: event.target.value,
                          })
                        }
                        required
                      >
                        <option value=""></option>
                        <option value="Affectionate">Affectionate</option>
                        <option value="Calm">Calm</option>
                        <option value="Curious">Curious</option>
                        <option value="Energetic">Energetic</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Gentle">Gentle</option>
                        <option value="Loyal">Loyal</option>
                        <option value="Playful">Playful</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Adoption Stage:</label>
                  <div className="control">
                    <div className="select">
                      <select
                        value={newPetData.adoptionStage}
                        onChange={(event) =>
                          setNewPetData({
                            ...newPetData,
                            adoptionStage: event.target.value,
                          })
                        }
                        required
                      >
                        <option value=""></option>
                        <option value="Available">Available</option>
                        <option value="Under review">Under Review</option>
                        <option value="Adopted">Adopted</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-align-content-center">
                <label className="checkbox">
                  <b>Sterilized: </b>
                  <input
                    type="checkbox"
                    name="sterilized"
                    checked={newPetData.medicalHistory.sterilized}
                    onChange={handleChange}
                  />
                </label>

                <label className="checkbox">
                  <b>Vaccinated: </b>
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={newPetData.medicalHistory.vaccinated}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="file">
                  <label className="file-label">
                    <b style={{alignContent:"center"}}>Profile Picture:</b>
                    <input
                      className="file-input"
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                    />
                    <span className="file-cta">
                      <span className="file-label"> Choose a file… </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="column">
                <div className="file">
                  <label className="file-label">
                    <b style={{alignContent:"center"}}>Other Photos:</b>
                    <input
                      className="file-input"
                      type="file"
                      name="photos"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-label"> Choose a file… </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              style={{ margin: "0.3em", background: "#ff4e4e" }}
            >
              <p style={{ color: "#fff4f2" }}>Add Pet</p>
            </button>
            <button
              type="button"
              onClick={() => navigate("/partner/pets")}
              style={{ margin: "0.3em", background: "#ff4e4e" }}
            >
              <p style={{ color: "#fff4f2" }}>Cancel</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPetProfile;
