import { toastController } from "@ionic/vue";

export async function showMessage(message: string): void {
  const toast = await toastController.create({
    message: message,
    duration: 1500,
    position: "bottom" as "top" | "middle" | "bottom",
  });

  await toast.present();
}
