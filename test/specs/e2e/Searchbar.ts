import { BrowserContext } from "../../../node_modules/puppeteer-core/lib/cjs/puppeteer/common/Browser";
import pause from "../../../node_modules/webdriverio/build/commands/browser/pause";
import { incorrectSearchPhrase, notFoundMessage, searchPhrase, searchResultTitle } from "../../config/data";
import { helionHomeUrl, notFoundUrl, searchPageUrl } from "../../config/pagesUrl";
import SearchbarPage from "../../pages/components/SearchbarPage";
import GlobalPage from "../../pages/GlobalPage";
import SearchResultPage from "../../pages/SearchResultPage";



describe("E2E - search bar", async () => {
    it("Should opern helion homepage and verify url and visible search bar", async () => {
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        await SearchbarPage.searchBarIsVisible();
    })

    it("Should click on search icon and verify url", async () => {
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    })

    it("Should type search value and verify visible of popup", async () => {
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.suggestPopupIsVisible();
    })

    it("Should click on see all book button", async () => {
        await SearchbarPage.clickOnSeeAllBooksBtn();
        
    
    })

    it("Should verify visible correctly title and number of books", async () => {
        const title:string  = await SearchResultPage.getPageTitle();
        const numberOfBooks:number = await SearchResultPage.getNumberOfBooks();
        await expect(numberOfBooks).toEqual(20);
        
    })

    it("Should clear input value",async () => {
        await SearchbarPage.clearSearchBar();
        await browser.pause(1000);
        await expect(await SearchbarPage.getInputValue()).toContain("");
    })

    it("Should type incorrect book name and verify alert",async () => {
        await SearchbarPage.typeSearchPhrase(incorrectSearchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(await SearchbarPage.getNotFoundAlertText()).toContain(notFoundMessage);

    })

    it("Should clear input value and click on the search icon",async () => {
        await SearchbarPage.clearSearchBar();
        //await browser.pause(500);
        await SearchbarPage.clickOnSearchIcon();
        //await browser.pause(1000);
        await expect(browser).toHaveUrl(notFoundUrl);
        //await browser.pause(2000);
        await expect(await SearchbarPage.getInputValue()).toContain(incorrectSearchPhrase);
    })
})


//test 