import { useParams } from "react-router-dom";

//signing up user
export async function signUpUser(formData) {
  const url = "/api/user/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//logging in user
export async function logInUser(formData) {
  const url = "/api/user/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // console.log("json", json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//get appointments made by user
export async function getUserAppointments(token) {
  const url = "/api/appointments";
  try {
    console.log("token", token);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("appointments:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//user posts appointment
export async function createAppointment(formData, token) {
  // console.log("post function form data", formData);
  // console.log("pet id in create appt function", formData.pet);
  const url = "/api/appointments";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//user delete appointment
export async function deleteSpecificAppointment(appointmentId, token) {
  const url = `/api/appointments/${appointmentId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("deleted:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//edit appointment
export async function editSpecificAppointment(appointmentId, formData, token) {
  const url = `/api/appointments/${appointmentId}`;
  try {
    console.log("appointment id: ", appointmentId);
    console.log("token", token);
    console.log("form data received", formData);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//user search pets
export async function searchPetsByName(query, token) {
  const url = `/api/pets?name=${query}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("search result:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
