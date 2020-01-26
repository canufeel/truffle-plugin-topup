# Truffle plugin topup

## Install

Add to your project by executing:
```
npm install truffle-plugin-topup
```
Add the following to your truffle config (`truffle-config.js` or `truffle.js`):
```
plugins: ['truffle-plugin-topup']
```

## Run

`truffle run ADDRESS [AMOUNT]`

example:

`truffle run 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 10`
would topup account `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` by 10 Ether. `AMOUNT` is optional and defaults to 10 Ether.