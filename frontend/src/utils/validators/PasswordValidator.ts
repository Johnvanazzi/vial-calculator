export default class PasswordValidator {
    public static validatePassword(password: string): string[] {
        if (password.length < 1) {
            return ["Provide a password"];
        }

        if (password.length < 8) {
            return ["Password should contain at least 8 characters"];
        }

        if (password.length > 64) {
            return ["Password should not contain more than 64 characters"];
        }

        return [];
    }

    public static validateConfirmPassword(password: string, passwordConfirm: string): string[] {
        if (passwordConfirm.length < 1) {
            return ["Confirm the password"];
        }

        if (passwordConfirm !== password) {
            return ["Password confirmation does not match original password"];
        }

        return [];
    }
}
