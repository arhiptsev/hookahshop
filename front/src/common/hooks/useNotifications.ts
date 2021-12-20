import { NotificationsService } from '../notifications/notifications.service';

export const useNotifications = () => NotificationsService.getInstance();
