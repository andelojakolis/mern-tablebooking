import config from '../../config/custom-environment-variables'
import jwt from 'jsonwebtoken';

const publicKey = Buffer.from(config.publicKey, "base64").toString('ascii');
const privateKey = Buffer.from(config.privateKey, "base64").toString('ascii');


export function signJwt(payload: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    })
}

export function verifyJwt<T>(token: string): T | null {
    try {
        const decoded = jwt.verify(token, publicKey) as T;
        return decoded;
    } catch (error) {
        return null
    }
}