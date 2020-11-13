export default class TimerUtils {
    async pause(delay) {
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
    }
}