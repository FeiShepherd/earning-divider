pragma solidity ^0.5.2;

contract EarningsDivider{
  struct Holder{
    uint balance;
    uint distribution;
    bool exist;
  }
  mapping (address => Holder) holders;
  address[] addressList

  constructor() public {
    holders[msg.sender] = Holder({
      balance: 0,
      shares: 100
    });
    addressList.push(msg.sender);
  }

  function giveShares(address receiver, uint8 shares) external {
    require(holders[msg.sender].shares > 0);

    uint8 memory currentShares = holders[msg.sender].shares;
    require(shares < currentShares && shares > 0);

    holders[msg.sender].shares -= shares;
    if(holders[receiver].exist) {
      holders[receiver].shares += shares;
    }else{
      holders[receiver] = Holder({
        balance: 0,
        shares: shares
      });
      addressList.push(receiver);
    }
  }

  function withdraw() external {
    require(holders[msg.sender].balance > 0);
    
    address(this).send(bal);   
    holders[msg.sender].balance = 0;
  }

  function getDistribution() external view {
    return holders;
  }

  function() payable external {
    uint memory dividends = (msg.value + address(this).balance) / addressList.length;
    for(uint i = 0; i < addressList.length; i++){
      holders[addressList[i]].balance += dividends;
    }
  }
}
