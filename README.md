# recovery-raphael

## Usage

Requirements: 
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- yarn (`npm install --global yarn`)

```
git clone git@github.com:zahin-mohammad/recovery-old-eth-tss.git --recurse-submodules
nvm use 
yarn

cd BitGoJS
yarn install

touch keycard.json
# Input values based off of keycard.example.json
yarn run recover
```
