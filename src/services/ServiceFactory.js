import AuthService from "@services/auth/AuthService";
import ChatService from "@services/chat/ChatService";

const services = {
  auth: AuthService,
  chat: ChatService,
};
export const ServiceFactory = {
  get: (name) => services[name],
};
