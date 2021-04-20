import environment from '../environment';
import {genSalt, hash, compare} from 'bcryptjs'
import { sign, verify, decode} from 'jsonwebtoken';
const { JWT_SECRET } = environment;


class Crypto {
    async createStringHash(data = "") {
        let salt = await genSalt(10);
        return await hash(data, salt);
    }

    async verifyHash(plainText : string, hash :  string) {
        return await compare(plainText, hash);
    }

    createJwtToken(data : Record<any, any>) {
        return sign(data, JWT_SECRET, { expiresIn: '2 days' });
    }

    async verifyJwt(data : string) {
        return await verify(data, JWT_SECRET);
    }

    decodeJwt(data : string) {
        return decode(data, { complete: true });
    }


}

export default new Crypto();
