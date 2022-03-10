import scrollIntoView from "../../../node_modules/webdriverio/build/commands/element/scrollIntoView";
import { alertMessage, deletedProductMessage, searchPhrase } from "../../config/data";
import { cartUrl, helionHomeUrl, searchProductUrl } from "../../config/pagesUrl"
import CartPage from "../../pages/CartPage";
import SearchbarPage from "../../pages/components/SearchbarPage";
import ProductPage from "../../pages/ProductPage";
import SearchResultPage from "../../pages/SearchResultPage";

describe("E2E - Products",async () => {
    let productTitle:string = "";
    let price: string = "";


    before(() =>{
        browser.url(helionHomeUrl);
    })

    it("Should type search phrase and click search icon",async () => {
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(searchProductUrl);
    })

    it("Should click on first book",async () => {
        await SearchResultPage.clickOnFirstBookItem();
        await ProductPage.productTitleIsVisivle();
        await ProductPage.addToCartButtonIsVisible();
        productTitle = await ProductPage.getProductTitleValue();
        price = await ProductPage.getProductPrice();
    })

    it("Should click on add to cart button",async () => {
        await ProductPage.clickOnAddToCartButton();
        await expect(browser).toHaveUrlContaining(cartUrl);
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        await expect(await CartPage.getTotalPriceValue()).toContain(price);
    })

    it("Should delete product from cart",async () => {
        await CartPage.clickOnCheckbox();
        await CartPage.clickOnDeleteSelectedLabel();
        //@ts-ignore
        await expect (await browser.getAlertText()).toContain(alertMessage);
        await CartPage.acceptDeleteAlert();
        await expect(await CartPage.getDeleteMessage()).toContain(deletedProductMessage);
    })
})