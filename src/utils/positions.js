import web3 from "web3";

export const calculatePortfolioId = (tokenIds, tokenRatio) => {
    return web3.utils.soliditySha3(
        {
            type: 'uint256[]',
            value: tokenIds
        },
        {
            type: 'uint256[]',
            value: tokenRatio
        }
    )
}

export const calculateLongTokenId = (derivativeHash) => {
    return web3.utils.toBN(web3.utils.soliditySha3(derivativeHash, 'LONG'))
}

export const calculateShortTokenId = (derivativeHash) => {
    return web3.utils.toBN(web3.utils.soliditySha3(derivativeHash, 'SHORT'))
}
