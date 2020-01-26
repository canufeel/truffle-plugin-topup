const Web3 = require('web3');

module.exports = async ({
  network,
  networks,
}) => {
  let topupIdx;
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === 'topup') {
      topupIdx = i;
    }
  }
  if (typeof topupIdx === 'undefined') {
    throw new Error('`topup` not found in the list of cli arguments');
  }
  const hasTopupAmount = process.argv.length - 1 - topupIdx > 1;
  const topupAddressArgvIdx = hasTopupAmount ? process.argv.length - 2 : process.argv.length - 1;
  const addressArgv = process.argv[topupAddressArgvIdx];
  const topupAmountEthStr = hasTopupAmount ? process.argv[process.argv.length - 1] : '10';
  const toUseNetworkName = !!network ? network : 'development';
  const {
    host,
    port,
  } = !!networks[toUseNetworkName] ? networks[toUseNetworkName] : {
    host: '127.0.0.1',
    port: 8545,
    network_id: '*',
  };
  const web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}:${port}`));
  if (!web3.utils.isAddress(addressArgv)) {
    throw new Error(`Last cli arg: ${addressArgv} is not a valid Ethereum address`);
  }
  const [ owner ] = await web3.eth.getAccounts();
  let resultMessage;
  try {
    await web3.eth.sendTransaction({
      from: owner,
      to: addressArgv,
      value: web3.utils.toWei(new web3.utils.BN(topupAmountEthStr), 'ether')
    });
    resultMessage = `Address: ${addressArgv} topup by: ${topupAmountEthStr} Eth Success!`;
  } catch (e) {
    resultMessage = `Address: ${addressArgv} topup by: ${topupAmountEthStr} Eth fail with message: ${e.message}!`;
  }
  console.log(resultMessage);
};