import prismaClient from '../prisma';
import { io } from '../app';
import axios from 'axios';

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    });

    
    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
        email: message.user.email
      }
    };
    
    io.emit('new_message', infoWS);
    
    try {
      await axios.post('http://localhost:5000/api/message', {
        "message": text,
        "username": message.user.name,
        "email": message.user.email
      });
    } catch(err) {
      console.log(err);
    }

    return message;
  }
}

export { CreateMessageService };
