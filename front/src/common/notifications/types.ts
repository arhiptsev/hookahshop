export interface Notification {
    type: 'info' | 'success' | 'danger';
    header?: string;
    content?: string;
}