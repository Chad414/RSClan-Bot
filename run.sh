mkdir -p log

date=`date +"%y-%m-%d_%H.%M.%S"`

printf 'Starting RSClan...\n'

node index.js > log/RSCLog-${date}.log