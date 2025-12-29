import notifier from 'node-notifier';

export function notifyTimerComplete(): void {
  notifier.notify({
    title: 'Pomodoro Complete!',
    message: 'Time for a break.',
    sound: 'Glass',
  });
}
