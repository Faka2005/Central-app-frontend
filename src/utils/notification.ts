import { useToast } from "primevue/usetoast";

export function useNotif() {
    const toast = useToast();

    // --- NOTIFICATIONS STANDARDS (Haut-Droite) ---
    const quick = (type: 'success' | 'info' | 'warn' | 'error', title: string, message: string) => {
        toast.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000
        });
    };

    // --- NOTIFICATIONS AVEC TEMPLATE (Bas-Centre) ---
    const action = (title: string, user: string, avatar: string) => {
        toast.add({ 
            severity: 'success', 
            summary: title, 
            group: 'action-toast', 
            data: { user, avatar } 
        } as any);
    };

    // Raccourcis pour gagner du temps
    return {
        success: (title: string, msg: string) => quick('success', title, msg),
        error: (title: string, msg: string) => quick('error', title, msg),
        info: (title: string, msg: string) => quick('info', title, msg),
        warn: (title: string, msg: string) => quick('warn', title, msg),
        action // La fameuse notif avec avatar
    };
}