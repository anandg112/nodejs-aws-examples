const AWS = require('aws-sdk');

let credentials = new AWS.SharedIniFileCredentials({profile: 'personal'});
AWS.config.credentials = credentials;


AWS.config.update({region: 'us-east-1'});

const ec2 = new AWS.EC2();

let listInstances = () => {
    return new Promise((resolve, reject) => {
        ec2.describeInstances({}, (err, data) => {
            if (err)
                reject(err);
            else {
                resolve(data.Reservations.reduce((i, r) => {
                    return i.concat(r.Instances)
                },[]));
            }
        })
    })
};

let terminateInstance = (instanceId) => {
    // TODO: Terminate an instance with a given instanceId
};

listInstances()
    .then(data => console.log(data));
// terminateInstance('i-0dadfee31ab5ec0c9')
// .then(data => console.log(data))
