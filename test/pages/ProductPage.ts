class ProductPage {
    get productTitle(){
        return $("div.title-group > h1 > span[itemprop='name']");
    }

    get addToCartBtn (){
        return $("a#addToBasket_vwdtnp_w");
    }

    get productPrice() {
        return $("#cena_w");
    }

    async getProductPrice():Promise<string> {
        const price:WebdriverIO.Element = await this.productPrice;
        await price.waitForDisplayed();
        await price.scrollIntoView();
        return await price.getText();
    }

    async getProductTitleValue(): Promise<string>{
        const title:WebdriverIO.Element = await this.productTitle;
        await title.waitForDisplayed();
        return await title.getText();
    }

    async clickOnAddToCartButton() {
        const btn:WebdriverIO.Element = await this.addToCartBtn;
        await btn.waitForDisplayed();
        await btn.scrollIntoView();
        await btn.click();
    }

    async addToCartButtonIsVisible () {
        const btn:WebdriverIO.Element = await this.addToCartBtn;
        await btn.waitForDisplayed;
    }

    async productTitleIsVisivle() {
        const title:WebdriverIO.Element = await this.productTitle;
        await title.waitForDisplayed;

    }
}

export default new ProductPage();