import { useEffect, useState } from "react";
import { getAllPets } from "../../services/partnerservices";
import PartnerNavBar from "../NavBar/PartnerNavBar";
import { useNavigate } from "react-router-dom";
import PetCard from "../PetCard/PetCard";

const AllPets = ({ token }) => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPets, setSearchedPets] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const view = "partner";

  useEffect(() => {
    if (!token) return;

    const fetchPets = async () => {
      try {
        console.log("fetching pets with token in allpets component and sortby", token, sortBy);
        const data = await getAllPets(token, sortBy, searchQuery);
        console.log("pets data", data);
        if (data && data.pets) {
          setPets(data.pets);
          setSearchedPets(data.pets);
        } else {
          console.error("no pets data found!");
        }
      } catch (error) {
        console.error("error fetching pets", error);
      }
    };

    fetchPets();
  }, [token, sortBy, searchQuery]);

  //  useEffect(() => {
  //   const results = pets.filter((pet) =>
  //     pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   )

  //   setSearchedPets(results)
  // }, [searchQuery, pets])

  const handleAddPet = () => {
    navigate("/partner/pets/add");
  };

  const handleSortBy = (order) => {
    setSortBy(order);
  };

   const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  return (
    <>
      <h1>All Pets</h1>
      <PartnerNavBar />
      <button onClick={handleAddPet}>Upload Pet</button>
      <input
        type="text"
        placeholder="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => handleSortBy("latest")}>Sort By Latest</button>
      <button onClick={() => handleSortBy("earliest")}>Sort By Earliest</button>
      {searchedPets.length === 0 ? (
        <h1>no pets found!</h1>
      ) : (
        <div>
          {searchedPets.map((pet) => (
            <PetCard key={pet._id} pet={pet} view={view} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllPets;