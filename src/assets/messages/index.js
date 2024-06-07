const messages = {
    convertorInfo: escapeSpecialChars('Помогает с конвертацией видео, музыки, текста в разные форматы.\n' +
        'youtube to mp3 template -  `ytm3: url`')
}

function escapeSpecialChars(input) {
    return input
        .replace(/\./g, '\\.')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\-/g, '\\-');
}

export default messages