# recovery-raphael

## Usage

Requirements: 
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- yarn (`npm install --global yarn`)

```bash
git clone git@github.com:zahin-mohammad/recovery-old-eth-tss.git --recurse-submodules
nvm use 
yarn

cd BitGoJS
yarn install

touch keycard.json
# Input values based off of keycard.example.json

yarn run recoverToken <tokenAddress> # doesn't sign and send
yarn run recover # doesn't sign and send
# Verify output from above

yarn run recoverToken <tokenAddress> true # signs and sends
yarn run recover true # signs and sends
```
