import { BehaviorSubject } from 'rxjs';
import { Notification } from './types';


export class NotificationsServies {
    static instance;
    public static getInstance(): NotificationsServies {
        if (!this.instance) {
            this.instance = new NotificationsServies();
        }
        return this.instance;
    }

    private _notifications = new Set<Notification>([]);

    private _notifications$ = new BehaviorSubject<Notification[]>([]);

    public get notifications$() { return this._notifications$.asObservable(); };

    public addSuccess(content?: string, header?: string): void {
        this.addNotify({
            type: 'success',
            header,
            content
        });
    }

    public addInfo(content?: string, header?: string): void {
        this.addNotify({
            type: 'info',
            header,
            content
        });
    }

    public addError(content?: string, header?: string): void {
        this.addNotify({
            type: 'danger',
            header,
            content
        });
    }

    private addNotify(notification: Notification): void {
        this._notifications.add(notification);
        setTimeout(() => this.deleteNotify(notification), 5000);
        this.sendNotifications();
    }

    private deleteNotify(notification: Notification): void {
        this._notifications.delete(notification);
        this.sendNotifications();
    }

    private sendNotifications(): void {
        this._notifications$.next(Array.from(this._notifications));
    }
}