// this page is complete 


export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        pagesPerPdf: 5,
        price: {
            amount: 0,
            priceIds: {
                test: '',
                production: '',
            },
        },
    },
    {
        name: 'Pro',
        slug: 'pro',
        quota: 50,
        pagesPerPdf: 25,//this can be any number...
        price: {
            amount: 14,
            priceIds: {
                test: 'price_1O2G40SJlMAmPnJQW0HiX82n',
                production: '',
            },
        },
    },
]