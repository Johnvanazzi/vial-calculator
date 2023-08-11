export default class EmailValidator {
    public static validateEmail(email: string): string[] {
        if (email.length < 1) {
            return ["Please provide an email"];
        }

        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            return ["Email provided is not valid"];
        }

        return [];
    }
}
