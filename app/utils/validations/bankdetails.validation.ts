import { IBankDetails } from "@/@types/interfaces/user/user.interface";

interface ValidationResult {
  success: boolean;
  message?: string;
}

export const validateBankdetails = (data: IBankDetails): ValidationResult => {
  if (data.name.trim() === "") {
    return { success: false, message: "Name is required" };
  }
  if (data.name.trim().length <= 2) {
    return { success: false, message: "Name should be longer than 2 characters" };
  }

  // Account Number validation: 12 digits required
  if (
    !data.accountNumber ||
    isNaN(data.accountNumber) ||
    String(data.accountNumber).length !== 12
  ) {
    return { success: false, message: "Account number should be a 12-digit number" };
  }

  // IFSC Code validation: 11 characters required
  if (
    !data.ifscCode ||
    isNaN(data.ifscCode) ||
    String(data.ifscCode).length !== 11
  ) {
    return { success: false, message: "IFSC code should be an 11-digits number" };
  }

  return { success: true }; // If all validations pass
};
