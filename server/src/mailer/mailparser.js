import simpleParser from 'mailparser';

simpleParser(source, options, (err, parsed) => {});

simpleParser(source, options)
    .then(parsed => {})
    .catch(err => {});