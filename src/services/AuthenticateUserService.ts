import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
  email: string | null;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        Accept: 'application/json'
      }
    });

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    const { login, id, avatar_url, name, email } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          email,
          login,
          avatar_url,
          name,
        }
      });
    }

    const token = sign(
      {
        user: {
          email: user.email,
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
