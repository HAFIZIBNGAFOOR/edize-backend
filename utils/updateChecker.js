import { School } from "../models/school.model"


export const updateSchool = async (id, checker) => {
    try {
        const school = await School.findOne(id); // Await the asynchronous call
        if (school && school[checker] !== undefined) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error updating school:", error); // Log the error for debugging
        throw new Error("Failed to update school."); // Throw or handle the error properly
    }
};
