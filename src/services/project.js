import Client from "./api"

// Function to get all projects
export const GetProjects = async () => {
  try {
    const res = await Client.get("/projects/project")
    return res.data
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

export const createProject = async (projectData) => {
  try {
    const res = await Client.post("/projects/project", projectData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
}
