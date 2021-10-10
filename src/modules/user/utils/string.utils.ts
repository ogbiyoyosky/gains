import * as bcrypt from 'bcrypt';

export const hashString = async (text: string, salt = 10 ): Promise<string> => {
   return  await bcrypt.hash(text, salt);
} 