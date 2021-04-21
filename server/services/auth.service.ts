import db from '../models';
import cryptoUtil from '../lib/crypto.util';

type AuthenticateDto = {
    email: string;
    password: string;
};

type RegistrationDto = AuthenticateDto & {
    firstName: string;
    lastName: string;
};


class AuthServices {

    async register(data: RegistrationDto) {
        let result = await db.User.create(data);
        // if (result) {
            return this.login({ email: data.email, password: data.password });
        // }

    }

    async login(data: AuthenticateDto) {
        try {
            let existingUser = await db.User.findOne({ where: { email: data.email } });
            if (existingUser) {
                existingUser = existingUser.toJSON();
                let validPassword = await cryptoUtil.verifyHash(data.password, existingUser.password);
                if (!validPassword) return null;
                delete existingUser.password;
                let accessToken = await cryptoUtil.createJwtToken(existingUser);
                let result = { access_token: accessToken, authDetail: existingUser };
                return result;

            }
            return null;
        } catch (error) {
            return null;
        }

    }
}

export const authServices = new AuthServices();