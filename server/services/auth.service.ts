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

type ResetPasswordDto = { 
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    userId : string;
}


class AuthServices {

    async register(data: RegistrationDto) {
        let result = await db.User.create(data);
        return this.login({ email: data.email, password: data.password });

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

    async resetPassword(data : ResetPasswordDto ){
        console.log(data)
        if(data.newPassword !== data.confirmPassword) throw new Error("password does not match");
        let existingUser = await db.User.findByPk(data.userId);
        if(!existingUser)  throw new Error("user not found");
        if(existingUser){
            let validPassword = await cryptoUtil.verifyHash(data.oldPassword, existingUser.password);
            if (!validPassword)  throw new Error("password mis-match");
            
            existingUser.password  = await cryptoUtil.createStringHash(data.newPassword);
            existingUser.save();
            return true
        }

    }
}

export const authServices = new AuthServices();