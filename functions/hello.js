const items = [
  {
    id: 1,
    name: 'minji',
    job: 'develper',
  },
  {
    id: 2,
    name: 'gan',
    job: 'programmer',
  },
  {
    id: 3,
    name: 'cooper',
    jog: 'dog',
  },
];

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
