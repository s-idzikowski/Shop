import * as crypto from 'crypto';

abstract class ClientHelper {
    public static HashSensitiveData(data: any): any {
        const hash = crypto.createHash("sha1");
        hash.update("Ser$ErT" + data + "D@tE");
        return hash.digest('hex');
    }

    public static ValidateLength(password: string, length: any = 4): boolean {
        if (!password || password.length < length) {
            return false;
        }
        return true;
    }

    public static ValidateEmail(email: string): boolean {
        //TODO
        return this.ValidateLength(email);
    }
}

export default ClientHelper;