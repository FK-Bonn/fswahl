import {ElectionProperties, StoredElectionProperties} from "~/utils/interfaces";

export const downloadText = (fsName: string, text: string) => {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURIComponent(text);
    hiddenElement.target = '_blank';
    hiddenElement.download = fsName + '.fswahl';
    hiddenElement.click();
}

export const importData = (callback: (text: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.fswahl';
    input.onchange = _ => {
        if (input.files) {
            for (let file of input.files) {
                file.text().then((text) => {
                    callback(text);
                });
            }
        }
    };
    input.click();

}

export const upgradeElectionPropertiesToLatestVersion = (parsedValue: StoredElectionProperties) => {
    if (parsedValue.stateVersion < 1) {
        const value = parsedValue as ElectionProperties;
        value.abstentions = null;
    }
}