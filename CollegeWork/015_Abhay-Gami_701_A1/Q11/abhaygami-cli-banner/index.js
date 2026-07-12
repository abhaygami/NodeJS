/**
 * Generates a clean CLI banner with a customizable border.
 * @param {string} title - The title of the banner
 * @param {string} message - The main body content of the banner
 * @param {string} [borderChar='*'] - The character used to draw the border
 */
export function createBanner(title, message, borderChar = '*') {
    const titleStr = title ? `  ${title.toUpperCase()}  ` : '';
    const bodyStr = `  ${message}  `;
    
    const bannerWidth = Math.max(titleStr.length, bodyStr.length) + 4;
    const horizontalBorder = borderChar.repeat(bannerWidth);
    
    const padString = (str, len) => {
        const paddingNeeded = len - str.length - 4;
        const leftPadding = Math.floor(paddingNeeded / 2);
        const rightPadding = paddingNeeded - leftPadding;
        return `${borderChar} ${' '.repeat(leftPadding)}${str}${' '.repeat(rightPadding)} ${borderChar}`;
    };

    console.log('\n' + horizontalBorder);
    if (title) {
        console.log(padString(titleStr, bannerWidth));
        console.log(`${borderChar} ${'-'.repeat(bannerWidth - 4)} ${borderChar}`);
    }
    console.log(padString(bodyStr, bannerWidth));
    console.log(horizontalBorder + '\n');
}

export default createBanner;
