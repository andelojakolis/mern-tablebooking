import config from '../../config/custom-environment-variables'
import jwt from 'jsonwebtoken';

const publicKey = config.publicKey
const privateKey = config.privateKey


export function signJwt(payload: Object){
    return jwt.sign(payload, privateKey)
}

export function verifyJwt<User>(token: string): User | null {
    try {
        const decoded = jwt.verify(token, privateKey) as User;
        return decoded;
    } catch (error) {
        return null
    }
}