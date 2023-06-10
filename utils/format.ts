export const dateDE = (inputDate: string | Date) => {
    return new Date(inputDate).toLocaleDateString('de-de', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}

export const timeDE = (inputDate: string | Date) => {
    return new Date(inputDate).toLocaleTimeString('de-de', {
        hour: "2-digit",
        minute: "2-digit"
    });
}

export const weekdayDE = (inputDate: string | Date) => {
    return new Date(inputDate).toLocaleString('de-de', {weekday: 'long'});
}

export const dateEN = (inputDate: string | Date) => {
    return new Date(inputDate).toLocaleDateString('en-ca', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}

export const timeEN = (inputDate: string | Date) => {
    return new Date(inputDate).toLocaleTimeString('de-de', {
        hour: "2-digit",
        minute: "2-digit"
    });
}

export const weekdayEN = (inputDate: string | Date) => {
    return new Date(inputDate).toLocaleString('en-ca', {weekday: 'long'});
}