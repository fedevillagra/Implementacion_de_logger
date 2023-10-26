import ChatDAO from "../dao/chats.mongo.dao.js";
import ChatRepository from "../repositories/chat.repository.js";

export const ChatService = new ChatRepository(new ChatDAO());
