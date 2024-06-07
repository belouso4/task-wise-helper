// parse {price}:{quantity}|{price}:{quantity}...
export const calculateAverage = async (ctx) => {
    let values = ctx.message.text.split('|');
    let totalSpent = 0;
    let totalCoins = 0;
    let text = ''

    values.forEach((element, key) => {
        // 00.00:00.00 => [0.00, 0.00]
        let numbers = element.split(':')
        totalSpent += Number(numbers[0]) * Number(numbers[1])
        totalCoins += Number(numbers[1])

        text += `<b>X${key + 1}</b>\n`
        text += `<b>Цена: </b>${numbers[0]}$\n`
        text += `<b>Кол-во: </b>${numbers[1]}\n`
        text += `------------\n`
    });

    const arrayPrice = values.map((value) => value.split(':')[0])
    const arrayAmount = values.map((value) => value.split(':')[1])

    const average = totalSpent / totalCoins
    const price = fixLengthNumber(arrayPrice, average)
    const total = fixLengthNumber(arrayAmount, totalCoins)

    text += `\nСреднее значение: <b>${price}$</b>\n` +
        `Общее колличество: <b>${total}</b>`

    await ctx.replyWithHTML(text);
}

function fixLengthNumber(numbers, number) {
    const arrayLenghtNumbers =
        numbers.map((value) => value.toString().split('.')[1]?.length ?? 0)
    const maxLenghtNumber = Math.max(...arrayLenghtNumbers)

    return number.toFixed(maxLenghtNumber)
}