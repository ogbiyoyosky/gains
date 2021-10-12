import * as bcrypt from 'bcrypt';
import * as crypto from "crypto"

export const hashString = async (text: string, salt = 10 ): Promise<string> => {
   return  await bcrypt.hash(text, salt);
} 

export const compareStringViaHash = async (current: string, previous: string ): Promise<boolean> => {
    return await bcrypt.compare(current, previous);
} 

export const generateString = (len: number): string =>  {
    const rand = crypto.randomBytes(len);
    return rand.toString('hex')
}
