import bcrypt from "bcryptjs"; // Importing the bcryptjs library for hashing and comparing passwords

// Function to hash a password
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10); // Generate a salt with a cost factor of 10
    return await bcrypt.hash(password, salt); // Hash the password using the generated salt
}




// Function to compare a plain text password with a hashed password
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash); // Compare the plain text password with the hashed password
}
