import puppeteer from 'puppeteer';

// string -> html
// given a prompt returns a response
let response = async (input) =>
{
	// launch the page
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();

	// goto a LLaMA instance
	await page.goto('https://huggingface.co/chat/');
	await page.type('textarea[placeholder="Ask anything"]', `${input}\n`);
	
	// await text generation
	await page.$eval('#svelte-announcer', (element) =>
	{
		return (async () => {
			return await new Promise((res) =>
				{
					setInterval(() => {if(element.innerHTML != "" && element.innerHTML != "Untitled 1") res(true)});
				});
		})();
	});

	// grab text
	const text = await page.$eval('.prose', (element) =>
		{
			return element.innerHTML;
		});
	browser.close();
	return text;
};
